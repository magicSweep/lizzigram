import { drive_v3 } from "googleapis";
//import PhotoModel from "../../api/entity/Photo/Photo.model";
import {
  getDrive,
  uploadImageToDrive,
  updateImageFile,
  parentId,
} from "./utils";

const parents: string[] = [parentId];
let drive: drive_v3.Drive = undefined;

export const init = async () => {
  try {
    drive = await getDrive();
  } catch (err) {
    new Error(`We can't create google drive ${JSON.stringify(err)}`);
  }
};

export const savePhoto = (
  photoFileName: string,
  photoFilePath: string,
  photoMimeType: string = "image/jpeg"
) => {
  if (drive === undefined)
    throw new Error("No drive. Are you forget call init?");

  return uploadImageToDrive(
    drive,
    photoFileName,
    photoFilePath,
    photoMimeType,
    parents
  );
};

export const editPhoto = async (
  photoId: string,
  photoFilePath: string,
  photoMimeType: string = "image/jpeg"
) => {
  if (drive === undefined)
    throw new Error("No drive. Are you forget call init?");

  await updateImageFile(drive, photoId, photoFilePath, photoMimeType);
};
