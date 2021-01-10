import SharpHelper from "../SharpHelper";
//import { resolve } from "path";
//import { path as rootPath } from "app-root-path";
import { OutputInfo } from "sharp";
import {
  makeHtmlWithBase64,
  getBase64Size,
  makeHtmlWithResizedPhotos,
} from "./helper";
import {
  getMetadata,
  getAspectRatio,
  isVerticalInverted,
  generateBase64String,
  makeOptimizedWebp,
  resize,
} from "../SharpImage";

export const iPhotoSizes = [
  { width: 320, height: 180 },
  { width: 800, height: 640 },
  { width: 1280, height: 720 },
  { width: 1920, height: 1080 },
  { width: 3840, height: 2160 },
];

//import { stat } from "fs";
//import { promisify } from "util";

class SharpExampleController {
  sharpHelper: SharpHelper;

  constructor(pathToPhoto: TPath, pathToTempDir: TPath) {
    this.sharpHelper = new SharpHelper(pathToPhoto, pathToTempDir, iPhotoSizes);
  }

  make = async () => {
    const pathToResultDir = this.sharpHelper.pathToTempDir;

    const pathsByWidths = new Map([
      [320, `${pathToResultDir}/photo_320.webp`],
      [800, `${pathToResultDir}/photo_800.webp`],
      [1280, `${pathToResultDir}/photo_1280.webp`],
      [1920, `${pathToResultDir}/photo_1920.webp`],
      [3840, `${pathToResultDir}/photo_3840.webp`],
    ]);

    const {
      base64String,
      aspectRatio,
      photosInfo,
    } = await this.sharpHelper.make(pathsByWidths);

    this.makeBase64ExampleHtml(base64String);

    this.makeResizePhotosExampleHtml(photosInfo, pathsByWidths, aspectRatio);
  };

  makeBase64ExampleHtml = async (base64String: string) => {
    //const image = sharp(pathToPhoto);

    //const base64String = await this.sharpHelper.sharpImage.generateBase64String();
    //const base64String = await this.sharpHelper.generateBase64String();

    //console.log("makeBase64ExampleHtml", base64String);

    const size = await getBase64Size(base64String);

    makeHtmlWithBase64(base64String, size);
  };

  makeResizePhotosExampleHtml = async (
    photosInfo: OutputInfo[],
    pathsByWidths: Map<number, string>,
    aspectRatio: number
  ) => {
    /* const pathsByWidths = new Map([
      [400, `${pathToResultDir}/photo_400.jpg`],
      [800, `${pathToResultDir}/photo_800.jpg`],
      [1280, `${pathToResultDir}/photo_1280.jpg`],
      [1920, `${pathToResultDir}/photo_1920.jpg`],
      [3840, `${pathToResultDir}/photo_3840.jpg`],
    ]);

    const photosInfo = await this.sharpHelper.makePhotosWithDiffWidths(
      pathsByWidths
    ); */

    const photoSizes = new Map<number, number>();

    //const originalPhotoMetadata = await getMetadata(this.sharpHelper.pathToPhoto);
    const originalPhotoMetadata = await this.sharpHelper.getOptimizedImageMetadata();

    photosInfo.forEach((info, index) => {
      photoSizes.set(iPhotoSizes[index].width, info.size);
    });

    const isInverted = isVerticalInverted(originalPhotoMetadata);

    makeHtmlWithResizedPhotos(
      pathsByWidths,
      photoSizes,
      {
        size: originalPhotoMetadata.size,
        isInverted,
        resolution: isInverted
          ? [originalPhotoMetadata.height, originalPhotoMetadata.width]
          : [originalPhotoMetadata.width, originalPhotoMetadata.height],
      },
      aspectRatio
    );
  };
}

export default SharpExampleController;
