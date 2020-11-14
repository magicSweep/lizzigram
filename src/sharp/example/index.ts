//import { base64 } from "../.";
import { resolve } from "path";
import { path as rootPath } from "app-root-path";
//import sharp, { Sharp } from "sharp";
//import { makeHtmlWithBase64, getBase64Size } from "./helper";
import {
  makeBase64ExampleHtml,
  makeResizePhotosExampleHtml,
} from "./controller";

export const pathToImagesDir = resolve(rootPath, "src/sharp/images/");
const pathToResultDir = resolve(rootPath, "src/sharp/result/");

//console.log("[SHARP]", pathToImagesDir, pathToResultDir);

const main = () => {
  makeBase64ExampleHtml(`${pathToImagesDir}/Liza_firstWeek.png`);

  makeResizePhotosExampleHtml(
    `${pathToImagesDir}/Liza_firstWeek.png`,
    pathToResultDir
  );
};

main();

//base64(imagePath1);
//base64(imagePath2);

//makeProgressiveJpeg(imagePath1, "freestocks-9U");

//makeJpgs(imagePath, "sad-girl", [400, 800, 1200, 1600, 1900]);
