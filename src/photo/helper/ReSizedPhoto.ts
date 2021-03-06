//import sharp, { Sharp, Metadata, OutputInfo } from "sharp";
import { UploadApiResponse } from "cloudinary";
//import SharpImage from "../../sharp/SharpImage";
import SharpHelper from "../../sharp/SharpHelper";

import { deleteFile, uploadFile } from "../../cloudinary";
import { getFileNameWithoutExtension } from "../../utils";
import { existsSync } from "fs";
import { deleteFile as delFileFs } from "./../../utils";
import { googleDrive } from "./../../googleDrive";
import {
  pathToTempDiffWidthsPhotos,
  //photoHeights,
  //photoWidths,
  photoSizes,
} from "./../../config";

class ReSizedPhoto {
  photoFileName: string;
  sharpHelper: SharpHelper;
  paths: Map<TWidth, TPath>;

  photoCloudinaryIds: TCloudinaryId[] = [];
  //photoTempFiles: TPath[];

  photoCloudinaryUrls: Map<TWidth, TCloudinarySecureUrl> = new Map();

  base64String: string;
  aspectRatio: number;
  imageExtention: TImgExt;

  googleDriveId: string;

  constructor(pathToPhoto: TPath, photoFileName: string) {
    this.sharpHelper = new SharpHelper(
      pathToPhoto,
      pathToTempDiffWidthsPhotos,
      photoSizes
    );
    this.photoFileName = photoFileName;
  }

  make = async () => {
    // SET PHOTOS PATHS BY WIDTHS
    this.generatePathsToDiffWidthPhotos();

    // MAKE DIFFERENT SIZES PHOTOS AND GET BASE64 AND ASPECT RATIO
    const {
      base64String,
      aspectRatio,
      imageExtention,
    } = await this.sharpHelper.make(this.paths);

    this.base64String = base64String;
    this.aspectRatio = aspectRatio;
    this.imageExtention = imageExtention as TImgExt;

    // SAVE PHOTOS TO CLOUDINARY
    const imagesInfo = await this.uploadImagesToCloudinary();

    const {
      photoCloudinaryIds,
      photoCloudinaryUrls,
    } = this.makeCloudinaryPhotosIdsAndUrls(imagesInfo);

    this.photoCloudinaryIds = photoCloudinaryIds;
    this.photoCloudinaryUrls = photoCloudinaryUrls;
  };

  saveToGoogleDrive = () => {
    return googleDrive.uploadImageToDrive(
      this.photoFileName,
      this.sharpHelper.pathToPhoto
    );
    //this.googleDriveId = "";
  };

  updateGoogleDriveFile = (googleDriveId: string) => {
    return googleDrive.updateImageFile(
      googleDriveId,
      this.sharpHelper.pathToPhoto
    );
    //this.googleDriveId = "";
  };

  cleanUpOnError = () => {
    this.removeUploadPhoto();

    this.removeOptimizedPhoto();

    if (this.paths && this.paths.size > 0) {
      this.removeTempPhotoDiffWidthsFiles();
    }

    if (this.photoCloudinaryIds && this.photoCloudinaryIds.length > 0) {
      this.removePhotoDiffWidthsCloudinaryFiles();
    }
  };

  removeOptimizedPhoto = () => {
    const pathToOptimizedPhoto = this.sharpHelper.pathToOptimizedImage;
    if (existsSync(pathToOptimizedPhoto)) {
      delFileFs(pathToOptimizedPhoto).catch((err: Error) =>
        console.error(
          `Can't delete upload photo file - ${pathToOptimizedPhoto} | ${err.message}`
        )
      );
    }
  };

  removeUploadPhoto = () => {
    const pathToUploadPhotoFile = this.sharpHelper.pathToPhoto;
    if (existsSync(pathToUploadPhotoFile)) {
      delFileFs(pathToUploadPhotoFile).catch((err: Error) =>
        console.error(
          `Can't delete upload photo file - ${pathToUploadPhotoFile} | ${err.message}`
        )
      );
    }
  };

  removeTempPhotoDiffWidthsFiles = () => {
    const photoTempFiles = [...this.paths.values()];

    const promises: Promise<any>[] = [];

    for (let file of photoTempFiles) {
      if (existsSync(file)) {
        promises.push(delFileFs(file));
      }
    }

    Promise.all(promises).catch((err: Error) =>
      console.error(`Error on delete temp photos diff widths`, err)
    );
  };

  removeCloudinaryFiles = (cloudinaryIds: string[]) => {
    const promises: Promise<any>[] = [];
    for (let photoCloudinaryId of cloudinaryIds) {
      promises.push(deleteFile(photoCloudinaryId));
    }

    return Promise.all(promises);
  };

  removePhotoDiffWidthsCloudinaryFiles = () => {
    this.removeCloudinaryFiles(this.photoCloudinaryIds).catch((err) => {
      console.error(
        `Can't delete cloudinary photo file - ${this.photoCloudinaryIds} | ${err.message}`
      );
    });
  };

  uploadImagesToCloudinary = async () => {
    //const cloudinaryPhotosInfoDiffWidths = new Map<number, UploadApiResponse>();
    const imagesPromises: Promise<UploadApiResponse>[] = [];

    //@ts-ignore
    for (let width of this.paths.keys()) {
      let image = uploadFile(this.paths.get(width));

      imagesPromises.push(image);
    }

    return Promise.all(imagesPromises);

    //const imagesInfo = await Promise.all(imagesPromises);

    //console.log("[photoResizer.make] imagesInfo", JSON.stringify(imagesInfo));

    //console.log();

    /*  let i = 0;
    //@ts-ignore
    for (let width of this.paths.keys()) {
      cloudinaryPhotosInfoDiffWidths.set(width, imagesInfo[i]);
      i++;
    }

    return cloudinaryPhotosInfoDiffWidths; */
  };

  makeCloudinaryPhotosIdsAndUrls = (imagesInfo: UploadApiResponse[]) => {
    const cloudinaryPhotosInfoDiffWidths = new Map<number, UploadApiResponse>();

    let i = 0;
    //@ts-ignore
    for (let width of this.paths.keys()) {
      cloudinaryPhotosInfoDiffWidths.set(width, imagesInfo[i]);
      i++;
    }

    const photoCloudinaryIds: TCloudinaryId[] = [];
    const photoCloudinaryUrls = new Map<TWidth, TCloudinarySecureUrl>();

    for (let [width, photoInfo] of cloudinaryPhotosInfoDiffWidths) {
      photoCloudinaryIds.push(photoInfo.public_id);
      photoCloudinaryUrls.set(width, photoInfo.secure_url);
    }

    return { photoCloudinaryIds, photoCloudinaryUrls };
  };

  makePhotoName = (width: number, name: string) => {
    return `${name}-${width}.jpg`;
  };

  generatePathsToDiffWidthPhotos = () => {
    //we make pathsFileSystem: Map<width, path>

    const photoname = getFileNameWithoutExtension(this.photoFileName);

    const paths: Map<TWidth, TPath> = new Map();

    for (let sizes of photoSizes) {
      paths.set(
        sizes.width,
        `${pathToTempDiffWidthsPhotos}/${this.makePhotoName(
          sizes.width,
          photoname
        )}`
      );
    }

    this.paths = paths;
  };

  /* parseCloudinaryPhotosDiffWidthsInfo = (
    cloudinaryInfoPhotosDiffWidths: Map<number, UploadApiResponse>
  ) => {
    this.photoCloudinaryIds = [];
    this.photoCloudinaryUrls = new Map<TWidth, TCloudinarySecureUrl>();

    for (let [width, photoInfo] of cloudinaryInfoPhotosDiffWidths) {
      this.photoCloudinaryIds.push(photoInfo.public_id);
      this.photoCloudinaryUrls.set(width, photoInfo.secure_url);
    }
  }; */
}

export default ReSizedPhoto;

/* import sharp, { Sharp, Metadata, OutputInfo } from "sharp";
import { UploadApiResponse } from "cloudinary";
import SharpImage from "../../sharp/SharpImage";

import { deleteFile, uploadFile } from "../../cloudinary";
import { getFileNameWithoutExtension } from "../../utils";
import { existsSync } from "fs";
import { deleteFile as delFileFs } from "./../../utils";
import { googleDrive } from "./../../googleDrive";
import {
  pathToTempDiffWidthsPhotos,
  //photoHeights,
  //photoWidths,
  photoSizes,
} from "./../../config";

class ReSizedPhoto {
  photoFileName: string;
  sharpImage: SharpImage;
  paths: Map<TWidth, TPath>;

  photoCloudinaryIds: TCloudinaryId[];
  //photoTempFiles: TPath[];

  photoCloudinaryUrls: Map<TWidth, TCloudinarySecureUrl>;

  base64String: string;
  aspectRatio: number;

  googleDriveId: string;

  constructor(pathToPhoto: TPath, photoFileName: string) {
    this.sharpImage = new SharpImage(pathToPhoto);
    this.photoFileName = photoFileName;
  }

  make = async () => {
    // SET PHOTOS PATHS BY WIDTHS
    this.generatePathsToDiffWidthPhotos();

    // MAKE DIFFERENT SIZES PHOTOS AND GET BASE64 AND ASPECT RATIO
    await Promise.all([
      this.setBase64AndAspectRatio(),
      this.makeJpgsByWidths(),
    ]);

    // SAVE PHOTOS TO CLOUDINARY
    const cloudinaryInfoPhotosDiffWidths = await this.uploadImagesToCloudinary();

    this.parseCloudinaryPhotosDiffWidthsInfo(cloudinaryInfoPhotosDiffWidths);
  };

  saveToGoogleDrive = () => {
    return googleDrive.uploadImageToDrive(
      this.photoFileName,
      this.sharpImage.pathToImage
    );
    //this.googleDriveId = "";
  };

  updateGoogleDriveFile = (googleDriveId: string) => {
    return googleDrive.updateImageFile(
      googleDriveId,
      this.sharpImage.pathToImage
    );
    //this.googleDriveId = "";
  };

  cleanUpOnError = () => {
    this.removeUploadPhoto();

    if (this.paths && this.paths.size > 0) {
      this.removeTempPhotoDiffWidthsFiles();
    }

    if (this.photoCloudinaryIds && this.photoCloudinaryIds.length > 0) {
      this.removePhotoDiffWidthsCloudinaryFiles();
    }
  };

  removeUploadPhoto = () => {
    const pathToUploadPhotoFile = this.sharpImage.pathToImage;
    if (existsSync(pathToUploadPhotoFile)) {
      delFileFs(pathToUploadPhotoFile).catch((err: Error) =>
        console.error(
          `Can't delete upload photo file - ${pathToUploadPhotoFile} | ${err.message}`
        )
      );
    }
  };

  removeTempPhotoDiffWidthsFiles = () => {
    const photoTempFiles = [...this.paths.values()];

    const promises: Promise<any>[] = [];

    for (let file of photoTempFiles) {
      if (existsSync(file)) {
        promises.push(delFileFs(file));
      }
    }

    Promise.all(promises).catch((err: Error) =>
      console.error(`Error on delete temp photos diff widths`, err)
    );
  };

  removeCloudinaryFiles = (cloudinaryIds: string[]) => {
    const promises: Promise<any>[] = [];
    for (let photoCloudinaryId of cloudinaryIds) {
      promises.push(deleteFile(photoCloudinaryId));
    }

    return Promise.all(promises);
  };

  removePhotoDiffWidthsCloudinaryFiles = () => {
    this.removeCloudinaryFiles(this.photoCloudinaryIds).catch((err) => {
      console.error(
        `Can't delete cloudinary photo file - ${this.photoCloudinaryIds} | ${err.message}`
      );
    });
  };

  makeJpgsByWidths = async () => {
    //const pathToResult = resolve(__dirname);
    let quality = 50;

    //const paths = new Map<number, string>();
    const isInverted = await this.sharpImage.isVerticalInverted();

    const metadata = await this.sharpImage.getMetadata();

    const promises: Promise<OutputInfo>[] = [];

    //for await (let width of widths) {
    for (let sizes of photoSizes) {
      switch (sizes.width) {
        case 400:
          quality = 50;
          break;
        case 800:
          quality = 50;
          break;
        case 1200:
          quality = 50;
          break;
        case 1900:
          quality = 75;
          break;
        case 3840:
          quality = 70;
          break;
      }

      let resizeOptions =
        isInverted || metadata.height >= metadata.width
          ? { height: sizes.height, width: null }
          : { width: sizes.width, height: null };

      //console.log("makeJpgsByWidths", JSON.stringify(resizeOptions));

      promises.push(
        this.sharpImage.makeResizedJpg(
          resizeOptions,
          quality,
          this.paths.get(sizes.width)
        )
      );
    }

    return Promise.all(promises);
  };

  setBase64AndAspectRatio = async () => {
    const [base64String, aspectRatio] = await Promise.all([
      this.sharpImage.generateBase64String(),
      this.sharpImage.getAspectRatio(),
    ]);

    //console.log("[SET_BASE_64_STRING]", JSON.stringify(base64String));
    this.base64String = base64String;
    this.aspectRatio = aspectRatio;
  };

  uploadImagesToCloudinary = async () => {
    const cloudinaryPhotosInfoDiffWidths = new Map<number, UploadApiResponse>();
    const imagesPromises = [];

    //@ts-ignore
    for (let width of this.paths.keys()) {
      let image = uploadFile(this.paths.get(width));

      imagesPromises.push(image);
    }

    const imagesInfo = await Promise.all(imagesPromises);

    //console.log("[photoResizer.make] imagesInfo", JSON.stringify(imagesInfo));

    //console.log();

    let i = 0;
    //@ts-ignore
    for (let width of this.paths.keys()) {
      cloudinaryPhotosInfoDiffWidths.set(width, imagesInfo[i]);
      i++;
    }

    return cloudinaryPhotosInfoDiffWidths;
  };

  makePhotoName = (width: number, name: string) => {
    return `${name}-${width}.jpg`;
  };

  generatePathsToDiffWidthPhotos = () => {
    //we make pathsFileSystem: Map<width, path>

    const photoname = getFileNameWithoutExtension(this.photoFileName);

    const paths: Map<TWidth, TPath> = new Map();

    for (let sizes of photoSizes) {
      paths.set(
        sizes.width,
        `${pathToTempDiffWidthsPhotos}/${this.makePhotoName(
          sizes.width,
          photoname
        )}`
      );
    }

    this.paths = paths;
  };

  parseCloudinaryPhotosDiffWidthsInfo = (
    cloudinaryInfoPhotosDiffWidths: Map<number, UploadApiResponse>
  ) => {
    this.photoCloudinaryIds = [];
    this.photoCloudinaryUrls = new Map<TWidth, TCloudinarySecureUrl>();

    for (let [width, photoInfo] of cloudinaryInfoPhotosDiffWidths) {
      this.photoCloudinaryIds.push(photoInfo.public_id);
      this.photoCloudinaryUrls.set(width, photoInfo.secure_url);
    }
  };
}

export default ReSizedPhoto;
 */
