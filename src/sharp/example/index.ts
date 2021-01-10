//import { base64 } from "../.";
import { resolve } from "path";
import { path as rootPath } from "app-root-path";
//import sharp, { Sharp } from "sharp";
//import { makeHtmlWithBase64, getBase64Size } from "./helper";
import SharpExampleController from "./SharpExampleController";

export const pathToImagesDir = resolve(rootPath, "src/sharp/images/");
const pathToResultDir = resolve(rootPath, "src/sharp/result/");

//const widths = [400, 800, 1200, 1600, 1900];

//image6.jpeg
//freestocks-9U.jpg

//console.log("[SHARP]", pathToImagesDir, pathToResultDir);
const sharpController = new SharpExampleController(
  `${pathToImagesDir}/image6.jpeg`,
  pathToResultDir
);

sharpController.make();

/* const main = async () => {
  sharpController.make();
}; */

//main();

//base64(imagePath1);
//base64(imagePath2);

//makeProgressiveJpeg(imagePath1, "freestocks-9U");

//makeJpgs(imagePath, "sad-girl", [400, 800, 1200, 1600, 1900]);
