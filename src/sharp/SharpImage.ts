import sharp, { Sharp, Metadata, OutputInfo } from "sharp";
import { resolve } from "path";
import { promisify } from "util";
import fs, { existsSync } from "fs";
//import { TPath } from "../types";

//type SHARP_WIDTH = 400 | 800 | 1600 | 2000;

export const getMetadata = (pathToImage: TPath) => {
  //if (this.metadata) return Promise.resolve(this.metadata);

  return sharp(pathToImage).metadata();
};

export const isVerticalInverted = (metadata: sharp.Metadata) => {
  const exifHeader = metadata.orientation;

  if (!exifHeader) return false;

  return [6, 8, 5, 7].includes(exifHeader);
};

export const getAspectRatio = (
  metadata: sharp.Metadata,
  isVerticalInverted: boolean
) => {
  if (isVerticalInverted)
    return Math.round((metadata.height / metadata.width) * 100) / 100;
  else return Math.round((metadata.width / metadata.height) * 100) / 100;
};

export const makeOptimizedWebp = (
  pathToImage: TPath,
  pathToResultImage: TPath
) => {
  return sharp(pathToImage).webp().rotate().toFile(pathToResultImage);
};

export const resize = (
  pathToImage: TPath,
  resizedOptions: {
    width?: number;
    height?: number;
  },
  //quality: number,
  pathToResizedFile: TPath
) => {
  /* console.log(
    `makeResizedJpg - ${JSON.stringify(
      resizedOptions
    )} | ${pathToImage} | ${pathToResizedFile}`
  ); */
  return (
    sharp(pathToImage)
      //.withMetadata()
      .resize(resizedOptions)
      //.jpeg({ quality: quality })
      .rotate()
      .toFile(pathToResizedFile)
  );
};

export const generateBase64String = async (
  pathToImage: TPath,
  isVerticalInverted: boolean
) => {
  const resizedOptions: {
    width?: number;
    height?: number;
  } = {};

  if (isVerticalInverted) {
    resizedOptions.height = 15;
    resizedOptions.width = null;
  } else {
    resizedOptions.width = 15;
    resizedOptions.height = null;
  }

  const encode = await sharp(pathToImage)
    //.withMetadata()
    //.jpeg({ quality: 40 })
    .blur()
    .resize(resizedOptions)
    .rotate()
    .toBuffer();
  return encode.toString("base64");
};

export const makeProgressiveJpeg = (name: string, pathToImage: TPath) => {
  const pathToResult = resolve(__dirname);
  sharp(pathToImage)
    .jpeg({ quality: 50, progressive: true })
    .toFile(`${pathToResult}/${name}-progressive.jpg`);
};

/* import sharp, { Sharp, Metadata, OutputInfo } from "sharp";
import { resolve } from "path";
import { promisify } from "util";
import fs, { existsSync } from "fs";
//import { TPath } from "../types";

//type SHARP_WIDTH = 400 | 800 | 1600 | 2000;

class SharpImage {
  pathToImage: TPath = "";
  //pathToOptimizedImage: TPath = "";
  //image: Sharp = undefined;
  metadata: Metadata = undefined;

  constructor(pathToImage: TPath = "") {
    if (!pathToImage) return;

    if (!existsSync(pathToImage))
      throw new Error(`[SHARP IMAGE]Image not exists - ${pathToImage}`);

    this.pathToImage = pathToImage;

    //this.pathToOptimizedImage = pathToOptimizedImage;

    //this.image = sharp(this.pathToImage);
  }

  changeImage = (pathToImage: TPath) => {
    this.pathToImage = pathToImage;
    //this.image = sharp(this.pathToImage);
    this.metadata = undefined;
  };

  getMetadata = () => {
    if (this.metadata) return Promise.resolve(this.metadata);

    return sharp(this.pathToImage).metadata();
  };

  isVerticalInverted = async () => {
    const metadata = await this.getMetadata();
    const exifHeader = metadata.orientation;

    if (!exifHeader) return false;

    return [6, 8, 5, 7].includes(exifHeader);
  };

  getAspectRatio = async () => {
    const metadata = await this.getMetadata();

    if (await this.isVerticalInverted())
      return Math.round((metadata.height / metadata.width) * 100) / 100;
    else return Math.round((metadata.width / metadata.height) * 100) / 100;
  };

  makeOptimizedWebp = (pathToOptimizedImage: TPath) => {
    return sharp(this.pathToImage)
      .webp()
      .rotate()
      .toFile(pathToOptimizedImage);
  };

  resize = (
    pathToImage: TPath,
    resizedOptions: {
      width?: number;
      height?: number;
    },
    //quality: number,
    pathToResizedFile: TPath
  ) => {
    //console.log(`makeResizedJpg - ${JSON.stringify(resizedOptions)}`);
    return (
      sharp(pathToImage)
        //.withMetadata()
        .resize(resizedOptions)
        //.jpeg({ quality: quality })
        .rotate()
        .toFile(pathToResizedFile)
    );
  };

  generateBase64String = async () => {
    const isInverted = await this.isVerticalInverted();

    const resizedOptions: {
      width?: number;
      height?: number;
    } = {};

    if (isInverted) {
      resizedOptions.height = 15;
      resizedOptions.width = null;
    } else {
      resizedOptions.width = 15;
      resizedOptions.height = null;
    }

    const encode = await sharp(this.pathToOptimizedImage)
      //.withMetadata()
      //.jpeg({ quality: 40 })
      .blur()
      .resize(resizedOptions)
      .rotate()
      .toBuffer();
    return encode.toString("base64");
  };

  makeProgressiveJpeg = async (name: string) => {
    const pathToResult = resolve(__dirname);
    sharp(this.pathToImage)
      .jpeg({ quality: 50, progressive: true })
      .toFile(`${pathToResult}/${name}-progressive.jpg`);
  };
}

export default SharpImage;

 */
