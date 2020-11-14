//import fs from "fs";
//import { path as rootPath } from "app-root-path";
//import { resolve as pathResolve } from "path";
import { makeJpgsByWidths } from "../../sharp";
/* import {
  pathToUploadPhotoFileDir,
  pathToFsResultPhotoDir,
  pathToWebResultPhotoDir,
} from "./config"; */

/* export const makeDifferentSizesOfPhotoCloudinary = async (
  filename: string,
  pathToUploadPhotoFile: string,
  pathToFsResultDir: string,
  pathToWebResultDir?: string
) => {
  try {
    const widths = [400, 800, 1200, 1600];

    const name = filename.substring(0, filename.indexOf("."));

    const [pathsFS, pathsWeb] = getMapsOfPathsToPhotos(
      widths,
      name,
      pathToFsResultDir,
      pathToWebResultDir
    );

    //console.log("BEFORE MAKE JPGS BY WIDTHS");
    await makeJpgsByWidths(pathToUploadPhotoFile, pathsFS);
    //console.log("AFTER MAKE JPGS BY WIDTHS");

    return [pathsFS, pathsWeb];
  } catch (err) {
    //console.log("[MAKE DIFFERENT SIZES OF PHOTO] ERR");
    throw err;
  }
};
 */
export const makeDifferentSizesOfPhoto = async (
  //filename: string,
  pathToUploadPhotoFile: string,
  pathsFS: Map<number, string>
  //pathsWeb
  //pathToFsResultDir: string,
  //pathToWebResultDir?: string
) => {
  try {
    /* const widths = [400, 800, 1200, 1600];

    const name = filename.substring(0, filename.indexOf("."));

    const [pathsFS, pathsWeb] = getMapsOfPathsToPhotos(
      widths,
      name,
      pathToFsResultDir,
      pathToWebResultDir
    ); */

    //console.log("BEFORE MAKE JPGS BY WIDTHS");
    return makeJpgsByWidths(pathToUploadPhotoFile, pathsFS);
    //console.log("AFTER MAKE JPGS BY WIDTHS");
  } catch (err) {
    //console.log("[MAKE DIFFERENT SIZES OF PHOTO] ERR");
    throw err;
  }
};
