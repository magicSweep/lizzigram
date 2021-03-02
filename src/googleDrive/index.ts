//export { default as GoogleDriveController } from "./googleDrive.controller";
//import { pathToGoogleDriveCredentials } from "../config";

import GoogleDrive from "./GoogleDrive";

export const googleDrive = new GoogleDrive();
//pathToGoogleDriveCredentials,

googleDrive.init();
