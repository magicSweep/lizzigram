//export { default as GoogleDriveController } from "./googleDrive.controller";
import { pathToGoogleDriveCredentials, googleDriveParentId } from "../config";

import GoogleDrive from "./GoogleDrive";

export const googleDrive = new GoogleDrive(
  pathToGoogleDriveCredentials,
  googleDriveParentId
);

googleDrive.init();
