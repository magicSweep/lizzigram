import ReSizedPhoto from "../helper/ReSizedPhoto";
import PhotoModel from "../entity/PhotoModel";

import { saveToGoogleDrive, updateGoogleDriveFile } from "./helper";

import { NextFunction, Request, Response } from "express";
//import { IErrorResponse, ISuccessResponse } from "../../types";
import { db } from "./../../firestore";
import { unlink } from "fs";

export const addPhotoMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let json: IErrorResponse | ISuccessResponse = undefined;
  let photoResizer: ReSizedPhoto;
  let photoModel: PhotoModel;

  const file = req.file;

  console.log(
    "ADD PHOTO BODY",
    JSON.stringify(req.body ? req.body : "No body")
  );
  console.log(
    "ADD PHOTO FILE",
    JSON.stringify(
      req.file && req.file.originalname
        ? req.file.originalname
        : "No file original name"
    )
  );

  try {
    if (!req.body) throw new Error("Failed multer validation");

    const id = req.body.id;
    const userUid = req.body.userUid;

    if (!file) throw new Error(`We've got no photo file`);

    photoModel = new PhotoModel(db, id, userUid);

    // CHECK IF EXISTS VALID FIRESTORE RECORD
    await photoModel.validateAddFirestoreRecord();

    photoResizer = new ReSizedPhoto(file.path, file.filename);

    // MAKE PHOTO COPIES WITH DIFFERENT WIDTHS
    await photoResizer.make();

    // SET ATTRIBUTES TO PHOTO MODEL
    photoModel.setAspectRatio(photoResizer.aspectRatio);
    photoModel.setImageExtention(photoResizer.imageExtention);
    //console.log("[SET ATTRIBUTES TO PHOTO MODEL]", photoResizer.base64String);
    photoModel.setBase64String(photoResizer.base64String);
    photoModel.setImageSrcAttrs(photoResizer.photoCloudinaryUrls);
    photoModel.setFiles(photoResizer.photoCloudinaryIds);

    // SAVE TO FIRESTORE
    await photoModel.update();

    photoResizer.removeTempPhotoDiffWidthsFiles();

    // SEND UPLOADED PHOTO TO GOOGLE DRIVE
    saveToGoogleDrive(photoResizer, photoModel);
    /* photoResizer
      .saveToGoogleDrive()
      .then((res) => {
        // ADD GOOGLE DRIVE ID TO FIRESTORE
        photoModel
          .updateGoogleId(res.data.id)
          .catch((err) => console.log("ERROR SET GOOGLE DRIVE PHOTO ID ", err));

        // REMOVE UPLOAD PHOTO
        photoResizer.removeUploadPhoto();

        // REMOVE OPTIMIZED PHOTO
        photoResizer.removeOptimizedPhoto();
      })
      .catch((err: Error) =>
        console.error(`Error on save photo to google drive`, err)
      ); */

    // MAKE SUCCESS RESPONSE
    json = {
      status: "success",
      data: {},
    };
  } catch (err) {
    // TODO: if(file) removeFile(file.path);
    if (photoResizer) {
      photoResizer.cleanUpOnError();
    } else if (file) {
      unlink(file.path, (err) => {
        if (err)
          console.error(
            `Can not delete upload photo - ${file.filename} - on path -  ${file.path}`
          );
      });
    }

    // DELETE FIRESTORE RECORD
    if (photoModel)
      photoModel.delete().catch((err) => {
        console.error(
          `Can not delete firestore photo record with id - ${
            photoModel.photoId
          } - error -  ${JSON.stringify(err)}`
        );
      });

    console.error("[ERROR ON ADD PHOTO]", JSON.stringify(err));

    next(err);
  }

  return res.status(200).json(json).end();
};

export const editPhotoMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let json: IErrorResponse | ISuccessResponse = undefined;
  let photoResizer: ReSizedPhoto;

  const file = req.file;

  console.log(
    "EDIT PHOTO BODY",
    JSON.stringify(req.body ? req.body : "No body")
  );
  console.log(
    "EDIT PHOTO FILE",
    req.file && req.file.originalname
      ? req.file.originalname
      : "No file original name"
  );

  try {
    if (!req.body) throw new Error("Failed multer validation");

    const id = req.body.id;
    const userUid = req.body.userUid;

    if (!file) throw new Error(`We've got no photo file`);

    const photoModel = new PhotoModel(db, id, userUid);

    // CHECK IF EXISTS VALID FIRESTORE RECORD
    await photoModel.validateEditFirestoreRecord();

    photoResizer = new ReSizedPhoto(file.path, file.filename);

    // MAKE PHOTO COPIES WITH DIFFERENT WIDTHS
    await photoResizer.make();

    // SET ATTRIBUTES TO PHOTO MODEL
    photoModel.setAspectRatio(photoResizer.aspectRatio);

    //console.log("[SET ATTRIBUTES TO PHOTO MODEL]", photoResizer.base64String);

    photoModel.setBase64String(photoResizer.base64String);
    photoModel.setImageSrcAttrs(photoResizer.photoCloudinaryUrls);
    photoModel.setFiles(photoResizer.photoCloudinaryIds);

    // SAVE TO FIRESTORE
    await photoModel.update();

    photoResizer.removeTempPhotoDiffWidthsFiles();

    // TODO remove prev photos from cloudinary
    photoResizer
      .removeCloudinaryFiles(photoModel.prevPhoto.files)
      .catch((err: Error) =>
        console.error(`Error on remove prev photos from cloudinary`, err)
      );

    // SEND UPLOADED PHOTO TO GOOGLE DRIVE
    console.log("updateGoogleDriveFile", photoModel.prevPhoto.googleDriveId);
    if (photoModel.prevPhoto.googleDriveId) {
      //console.log("updateGoogleDriveFile start");
      updateGoogleDriveFile(photoResizer, photoModel.prevPhoto.googleDriveId);
      /* photoResizer
        .updateGoogleDriveFile(photoModel.prevPhoto.googleDriveId)
        .then((res) => {
          // REMOVE UPLOAD PHOTO
          photoResizer.removeUploadPhoto();

          // REMOVE OPTIMIZED PHOTO
          photoResizer.removeOptimizedPhoto();
        })
        .catch((err: Error) =>
          console.error(`Error on save photo to google drive`, err)
        ); */
    } else {
      saveToGoogleDrive(photoResizer, photoModel);
      /*  photoResizer
        .saveToGoogleDrive()
        .then((res) => {
          // ADD GOOGLE DRIVE ID TO FIRESTORE
          photoModel
            .updateGoogleId(res.data.id)
            .catch((err) =>
              console.log("ERROR SET GOOGLE DRIVE PHOTO ID ", err)
            );

          // REMOVE UPLOAD PHOTO
          photoResizer.removeUploadPhoto();

          // REMOVE OPTIMIZED PHOTO
          photoResizer.removeOptimizedPhoto();
        })
        .catch((err: Error) =>
          console.error(`Error on save photo to google drive`, err)
        ); */
    }

    // MAKE SUCCESS RESPONSE
    json = {
      status: "success",
      data: {},
    };
  } catch (err) {
    // TODO: if(file) removeFile(file.path);
    if (photoResizer) {
      photoResizer.cleanUpOnError();
    } else if (file) {
      unlink(file.path, (err) => {
        if (err)
          console.error(
            `Can not delete upload photo - ${file.filename} - on path -  ${file.path}`
          );
      });
    }

    console.error("[ERROR ON EDIT PHOTO]", JSON.stringify(err));

    next(err);
  }

  return res.status(200).json(json).end();
};
