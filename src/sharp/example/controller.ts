import { base64, makeJpgsByWidths } from "../.";
import { resolve } from "path";
import { path as rootPath } from "app-root-path";
import sharp, { Sharp } from "sharp";
import {
  makeHtmlWithBase64,
  getBase64Size,
  makeHtmlWithResizedPhotos,
} from "./helper";
import { stat } from "fs";
import { promisify } from "util";

export const makeBase64ExampleHtml = async (pathToPhoto: string) => {
  const image = sharp(pathToPhoto);

  const base64String = await base64(image);

  const size = await getBase64Size(base64String);

  makeHtmlWithBase64(base64String, size);
};

export const makeResizePhotosExampleHtml = async (
  pathToOriginalPhoto: string,
  pathToResultDir: string
) => {
  const pathsByWidths = new Map([
    [400, `${pathToResultDir}/photo_400.jpg`],
    [800, `${pathToResultDir}/photo_800.jpg`],
    [1200, `${pathToResultDir}/photo_1200.jpg`],
    [1600, `${pathToResultDir}/photo_1600.jpg`],
    [1900, `${pathToResultDir}/photo_1900.jpg`],
  ]);

  await makeJpgsByWidths(pathToOriginalPhoto, pathsByWidths);

  const photoSizes = new Map<number, number>();

  const image = sharp(pathToOriginalPhoto);

  const metadata = await image.metadata();

  const originPhotoStat = await promisify(stat)(pathToOriginalPhoto);

  //console.log("METADATA", originPhotoStat.size);

  pathsByWidths.forEach(async (pathToPhoto, width) => {
    const img = sharp(pathToPhoto);

    let photoStat = await promisify(stat)(pathToPhoto);

    let meta = await img.metadata();

    //console.log("METADATA by photo", photoStat.size);
    photoSizes.set(width, photoStat.size);
  });

  makeHtmlWithResizedPhotos(pathsByWidths, photoSizes, {
    size: originPhotoStat.size,
    resolution: [metadata.width, metadata.height],
  });
};
