import { IPhoto, IFirebasePhoto, TWidth, TPath } from "../../types";
import { makeJpgsByWidths, getBase64AndAspectRatio } from "../../sharp";
import { uploadImagesByDifferentWidths } from "../../cloudinary";
import { IPhotoController } from "./types";
import { getFileNameWithoutExtension } from "../../utils";
import { getPathsToDiffWidthPhotos } from "../service/paths.service";
import { getCloudinaryPhotosDiffWidthsInfo } from "../service/cloudinary.service";
import { makeImageSrcSetAttr } from "../service/htmlImgAttrs.service";
import {
  updatePhotoFirestore,
  updateGoogleIdFirestore,
} from "../service/firestore.service";
import { savePhoto } from "../../googleDrive/service";
import {
  removeTempPhotoDiffWidthsFiles,
  removeUploadPhoto,
  cleanUpOnError,
} from "../service/cleanup/";

export class PhotoCloudinaryController
  implements IPhotoController<IFirebasePhoto, Express.Multer.File> {
  file: Express.Multer.File;
  widths: number[];
  photoId: string;
  paths: Map<TWidth, TPath>;

  //prevPhoto: IPhoto | undefined = undefined;

  photo: IFirebasePhoto = {
    base64: "",
    files: [],
    aspectRatio: 0, //1.6
    srcSet: "",
    iconSrc: "",
    src: "",
    googleDriveId: "",
    isActive: false,
  };

  pathToUploadPhotoFileDir: string;
  pathToDirWithPhotosDiffWidths: string;
  //pathToWebResultDir: string;

  //pathToUploadPhotoFile: string;

  constructor(
    photoId: string,
    file: Express.Multer.File,
    widths: number[],
    pathToUploadPhotoFileDir: string,
    pathToDirWithPhotosDiffWidths: string
  ) {
    this.file = file;
    this.photoId = photoId;
    this.widths = widths;
    this.pathToUploadPhotoFileDir = pathToUploadPhotoFileDir;
    this.pathToDirWithPhotosDiffWidths = pathToDirWithPhotosDiffWidths;
    //this.pathToWebResultDir = pathToWebResultDir;
  }

  add = async () => {
    try {
      const photoname = getFileNameWithoutExtension(this.file.filename);

      // MAKE PHOTOS PATHS BY WIDTHS
      this.paths = getPathsToDiffWidthPhotos(
        this.widths,
        photoname,
        this.pathToDirWithPhotosDiffWidths
      );

      // MAKE DIFFERENT SIZES PHOTOS AND GET BASE64 AND ASPECT RATIO
      const [outputInfo, { base64String, aspectRatio }] = await Promise.all([
        makeJpgsByWidths(this.file.path, this.paths),
        getBase64AndAspectRatio(this.file.path),
      ]);

      // SAVE PHOTOS TO CLOUDINARY
      const cloudinaryInfoPhotosDiffWidths = await uploadImagesByDifferentWidths(
        this.paths
      );

      // MAKE PHOTO INFO
      const {
        cloudinaryIdsPhotosDiffWidths,
        cloudinaryUrlsPhotosDiffWidths,
      } = getCloudinaryPhotosDiffWidthsInfo(cloudinaryInfoPhotosDiffWidths);

      this.photo.base64 = base64String;
      this.photo.aspectRatio = aspectRatio;
      this.photo.files = [...cloudinaryIdsPhotosDiffWidths.values()];

      this.photo.srcSet = makeImageSrcSetAttr(cloudinaryUrlsPhotosDiffWidths);

      this.photo.src = cloudinaryUrlsPhotosDiffWidths.get(800);
      this.photo.iconSrc = cloudinaryUrlsPhotosDiffWidths.get(400);

      // COMMIT PHOTO TO FIRESTORE
      await updatePhotoFirestore(this.photoId, this.photo);

      // REMOVE TEMP DIFF WIDTHS PHOTOS
      removeTempPhotoDiffWidthsFiles([
        ...this.paths.values(),
      ]).catch((err: Error) =>
        console.error(`Error on delete temp photos diff widths`, err)
      );

      // SEND UPLOADED PHOTO TO GOOGLE DRIVE
      // DELETE UPLOADED PHOTO ON SUCCESSS
      savePhoto(this.photoId, this.file.filename, this.file.path)
        .then((res) => {
          // ADD GOOGLE DRIVE ID TO FIRESTORE
          updateGoogleIdFirestore(this.photoId, res.data.id).catch((err) =>
            console.log("ERROR SET GOOGLE DRIVE PHOTO ID ", err)
          );

          // REMOVE UPLOAD PHOTO
          removeUploadPhoto(this.file.path).catch((err) => {
            console.error(
              `Can't delete upload photo file - ${this.file.path} | ${err.message}`
            );
          });
        })
        .catch((err: Error) =>
          console.error(`Error on save photo to google drive`, err)
        );

      return this.photo;
    } catch (err) {
      //console.log("[WORK WITH PHOTO] ERR", err.message || err.toString());

      // clean up on error:
      // - remove upload photo, remove temp files,
      cleanUpOnError(this.file.path, this.photo.files, [
        ...this.paths.values(),
      ]);

      throw err;
    }
  };

  edit = async () => {
    return this.photo;
  };
}
