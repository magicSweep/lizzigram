/* import {
  IPhoto,
  IFirebasePhoto,
  TWidth,
  TCloudinaryId,
  TCloudinarySecureUrl,
} from "../../types"; */
import { UploadApiResponse } from "cloudinary";
import { PHOTOS_FIRESTORE_COLLECTION_NAME, photoSizes } from "../../config";

class PhotoModel {
  //cloudinaryInfoPhotosDiffWidths: Map<number, UploadApiResponse> = undefined;

  photoId: string;
  userUid: string;

  db: FirebaseFirestore.Firestore;

  prevPhoto: IFirebasePhoto;

  photo: IFirebasePhoto = {
    base64: "",
    files: [],
    aspectRatio: 0, //1.6
    srcSet: "",
    iconSrc: "",
    src: "",
    googleDriveId: "",
    imageExtention: "jpeg",
    isActive: false,
  };

  constructor(
    db: FirebaseFirestore.Firestore,
    photoId: string,
    userUid: string
  ) {
    this.db = db;
    this.photoId = photoId;
    this.userUid = userUid;
  }

  validateFirestoreRecord = async () => {
    // request to firestore by this.photoId
    const photoDoc = await this.db
      .collection(PHOTOS_FIRESTORE_COLLECTION_NAME)
      .doc(this.photoId)
      .get();
    if (!photoDoc.exists)
      throw new Error(`No photo record in Firestore with id - ${this.photoId}`);

    if (photoDoc.data().addedByUserUID !== this.userUid)
      throw new Error(
        `Users uid does not match - ${this.userUid} | ${JSON.stringify(
          this.prevPhoto
        )}`
      );

    this.prevPhoto = photoDoc.data() as any;

    // compare photoId and userUid
  };

  validateAddFirestoreRecord = async () => {
    await this.validateFirestoreRecord();

    this.validateOnAdd();
  };

  validateEditFirestoreRecord = async () => {
    await this.validateFirestoreRecord();

    this.validateOnEdit();

    return true;
  };

  validateOnAdd = () => {
    if (this.prevPhoto.isActive === true)
      throw new Error(
        `Photo to add is activated - ${JSON.stringify(this.prevPhoto)}`
      );
  };

  validateOnEdit = () => {
    if (this.prevPhoto.isActive === false)
      throw new Error(
        `Photo to edit is not activated - ${JSON.stringify(this.prevPhoto)}`
      );
  };

  update = async () => {
    // check this.photo

    const updateProps = this.makeUpdatedProperties();

    return this.db
      .collection(PHOTOS_FIRESTORE_COLLECTION_NAME)
      .doc(this.photoId)
      .update(updateProps);
  };

  delete = async () => {
    return this.db
      .collection(PHOTOS_FIRESTORE_COLLECTION_NAME)
      .doc(this.photoId)
      .delete();
  };

  updateGoogleId = (googleDriveId: string) => {
    return this.db
      .collection(PHOTOS_FIRESTORE_COLLECTION_NAME)
      .doc(this.photoId)
      .update({
        googleDriveId,
      });
  };

  makeUpdatedProperties = () => {
    if (!this.photo.base64) throw new Error("No base64 string on photo");

    if (!this.photo.files || this.photo.files.length === 0)
      throw new Error("No files on photo");

    if (this.photo.aspectRatio === 0)
      throw new Error("No aspectRatio on photo");

    if (!this.photo.srcSet) throw new Error("No srcSet on photo");

    if (!this.photo.iconSrc) throw new Error("No iconSrc on photo");

    if (!this.photo.src) throw new Error("No src on photo");

    //console.log("[MAKED_UPDATED_PROPERTIES]", this.photo.base64);

    return {
      base64: this.photo.base64,
      files: this.photo.files,
      aspectRatio: this.photo.aspectRatio, //1.6
      srcSet: this.photo.srcSet,
      iconSrc: this.photo.iconSrc,
      src: this.photo.src,
      isActive: true,
    };
  };

  setFiles = (photoCloudinaryIds: string[]) => {
    this.photo.files = photoCloudinaryIds;
  };

  /*  setCloudinaryInfoPhotosDiffWidths = (
    cloudinaryInfoPhotosDiffWidths: Map<number, UploadApiResponse>
  ) => {
    this.cloudinaryInfoPhotosDiffWidths = cloudinaryInfoPhotosDiffWidths;
  }; */

  setBase64String = (base64String: string) => {
    this.photo.base64 = base64String;
  };

  setAspectRatio = (aspectRatio: number) => {
    this.photo.aspectRatio = aspectRatio;
  };

  setImageExtention = (imageExtention: TImgExt) => {
    this.photo.imageExtention = imageExtention;
  };

  setImageSrcAttrs = (
    photoCloudinaryUrlsByWidths: Map<number, TCloudinarySecureUrl>
  ) => {
    let result = "";

    //"/images/girl_300.jpeg 300w, /images/girl_600.jpeg 600w"

    //@ts-ignore
    for (let urlByWidth of photoCloudinaryUrlsByWidths) {
      switch (urlByWidth[0]) {
        case 320:
          //result += `${urlByWidth[1]} 400w, `;
          break;
        case 800:
          result += `${urlByWidth[1]} 600w, `;
          break;
        case 1280:
          result += `${urlByWidth[1]} 1000w, `;
          break;
        case 1920:
          result += `${urlByWidth[1]} 1500w, `;
          break;
        case 3840:
          result += `${urlByWidth[1]} 2300w`;
          break;

        default:
          throw new Error(
            `No implementation for width = ${urlByWidth[0]} in setImageSrcAttrs`
          );
      }
    }

    //this.photo.srcSet = result.slice(0, -2);
    this.photo.srcSet = result;

    this.photo.src = photoCloudinaryUrlsByWidths.get(photoSizes[1].width);
    this.photo.iconSrc = photoCloudinaryUrlsByWidths.get(photoSizes[0].width);
  };

  makeImageSizesAttr = (aspectRatio: number) => {
    //""

    let ratio = Math.round(aspectRatio * 100);

    return `(max-aspect-ratio: ${ratio}/100) 99vw, ${ratio}vh`;
  };

  /* getCloudinaryPhotosDiffWidthsInfo = (
    cloudinaryInfoPhotosDiffWidths: Map<number, UploadApiResponse>
  ) => {
    const cloudinaryIdsPhotosDiffWidths = new Map<TWidth, TCloudinaryId>();
    const cloudinaryUrlsPhotosDiffWidths = new Map<
      TWidth,
      TCloudinarySecureUrl
    >();

    for (let [width, photoInfo] of cloudinaryInfoPhotosDiffWidths) {
      cloudinaryIdsPhotosDiffWidths.set(width, photoInfo.public_id);
      cloudinaryUrlsPhotosDiffWidths.set(width, photoInfo.secure_url);
    }

    return { cloudinaryIdsPhotosDiffWidths, cloudinaryUrlsPhotosDiffWidths };
  }; */
}

export default PhotoModel;
