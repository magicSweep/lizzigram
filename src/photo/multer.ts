import multer from "multer";
import { IMulterRequest } from "../types";
import { isValidID, isValidFile } from "./validator";
import random from "lodash.random";

export const multerLimits = {
  fields: 1,
  fieldSize: 10520,
  files: 1,
  fileSize: 20971520, //20971520 - 20MB
  headerPairs: 20,
};

export const fileName = (
  req: IMulterRequest,
  file: Express.Multer.File,
  cb: (error: Error, filename?: string) => void
) => {
  let extension = file.mimetype.split("/")[1];

  extension = extension === "jpeg" ? "jpg" : extension;

  const fileName = `photo_${Date.now() + random(1000)}.${extension}`;

  cb(null, fileName);
};

export const fileFilter = (
  req: IMulterRequest,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  /*  console.log(
    "FILE_FILTER",
    JSON.stringify(req.body),
    "-------------",
    JSON.stringify(file)
  ); */

  //if (!file) cb(null, false); // new Error(`No file to upload`)

  if (!isValidID(req.body.id)) {
    cb(null, false);
  } // new Error(`Bad id - ${req.body.id}`)
  else if (!isValidFile(file)) {
    cb(null, false);
  } // new Error(`Bad file mimetype - ${file.mimetype}`)
  else cb(null, true);
};
