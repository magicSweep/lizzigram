import multer from "multer";
import { IMulterRequest } from "../types";
import { isValidUserUid, isValidID, isValidFile } from "./validator";
import random from "lodash.random";

export const multerLimits = {
  fields: 2,
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

  console.log("MULTER body", JSON.stringify(Object.keys(req.body)));

  if (!isValidUserUid(req.body.userUid)) {
    console.error("BAD USER UID", req.body.userUid);
    cb(null, false);
  } else if (!isValidID(req.body.id)) {
    console.error("BAD PHOTO ID", req.body.id);
    cb(null, false);
  } // new Error(`Bad id - ${req.body.id}`)
  else if (!isValidFile(file)) {
    console.error("NOT VALID PHOTO FILE");
    cb(null, false);
  } // new Error(`Bad file mimetype - ${file.mimetype}`)
  else cb(null, true);
};
