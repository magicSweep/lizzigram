import { Metadata, OutputInfo } from "sharp";
//import { pathToTempDiffWidthsPhotos } from "../config";
//import { pathToTempDir, photoSizes } from "../config";
import {
  getMetadata,
  getAspectRatio,
  isVerticalInverted,
  generateBase64String,
  makeOptimizedWebp,
  resize,
} from "./SharpImage";

class SharpHelper {
  pathToPhoto: TPath;
  pathToOptimizedImage: TPath;
  pathToTempDir: TPath;
  photoSizes: { width: number; height: number }[];

  constructor(
    pathToPhoto: TPath,
    pathToTempDir: TPath,
    photoSizes: { width: number; height: number }[]
  ) {
    this.pathToPhoto = pathToPhoto;
    this.pathToTempDir = pathToTempDir;
    this.photoSizes = photoSizes;
    this.pathToOptimizedImage = `${pathToTempDir}/opt_${
      Math.random() * 10
    }.webp`;
  }

  getOptimizedImageMetadata = () => {
    //if (this.metadata) return Promise.resolve(this.metadata);

    return getMetadata(this.pathToOptimizedImage);
  };

  changeImage = (pathToPhoto: TPath) => {
    this.pathToPhoto = pathToPhoto;
  };

  make = async (pathsByWidths: Map<number, string>) => {
    // MAKE OPTIMIZED WEBP IMAGE
    await makeOptimizedWebp(this.pathToPhoto, this.pathToOptimizedImage);

    const metadata = await this.getOptimizedImageMetadata();

    // MAKE DIFFERENT SIZES PHOTOS AND GET BASE64 AND ASPECT RATIO
    const [base64AndAspectRation, photoInfo] = await Promise.all([
      this.getBase64AndAspectRatio(metadata),
      this.makePhotosWithDiffWidths(pathsByWidths, metadata),
    ]);

    return {
      base64String: base64AndAspectRation[0],
      aspectRatio: base64AndAspectRation[1],
      photosInfo: photoInfo,
      imageExtention: metadata.format,
    };
  };

  getBase64AndAspectRatio = (metadata: Metadata) => {
    //const [base64String, aspectRatio] =
    const isVertical = isVerticalInverted(metadata);

    return Promise.all([
      generateBase64String(this.pathToOptimizedImage, isVertical),
      getAspectRatio(metadata, isVertical),
    ]);
  };

  makePhotosWithDiffWidths = async (
    pathsFS: Map<number, string>,
    metadata: Metadata
  ) => {
    //const pathToResult = resolve(__dirname);
    //let quality = 50;

    //const paths = new Map<number, string>();

    const promises: Promise<OutputInfo>[] = [];

    const isInverted = isVerticalInverted(metadata);

    //const metadata = await this.sharpImage.getMetadata();

    //for await (let width of widths) {
    for (let sizes of this.photoSizes) {
      let resizeOptions =
        isInverted || metadata.height >= metadata.width
          ? { height: sizes.height, width: null }
          : { width: sizes.width, height: null };

      //console.log(`RESIZED OPTIONS - ${JSON.stringify(resizeOptions)}`);

      promises.push(
        resize(
          this.pathToOptimizedImage,
          resizeOptions,
          pathsFS.get(sizes.width)
        )
      );
    }

    return Promise.all(promises);
  };
}

export default SharpHelper;

/* import sharp, { Sharp, Metadata, OutputInfo } from "sharp";
import { pathToTempDiffWidthsPhotos, photoSizes } from "../config";
import SharpImage from "./SharpImage";
//import { TPath } from "../types";

class SharpHelper {
  sharpImage: SharpImage;

  constructor(pathToPhoto: TPath) {
    const pathToOptimizedImage = `${pathToTempDiffWidthsPhotos}/opt_${
      Math.random() * 10
    }.webp`;
    this.sharpImage = new SharpImage(pathToOptimizedImage, pathToPhoto);
  }

  getPathToImage = () => this.sharpImage.pathToImage;

  getPathToOptimizedImage = () => this.sharpImage.pathToOptimizedImage;

  changeImage = (pathToPhoto: TPath) => {
    this.sharpImage.changeImage(pathToPhoto);
  };

  make = async (pathsByWidths: Map<number, string>) => {
    // MAKE OPTIMIZED WEBP IMAGE
    await this.sharpImage.makeOptimizedWebp();

    // MAKE DIFFERENT SIZES PHOTOS AND GET BASE64 AND ASPECT RATIO
    const [base64AndAspectRation, photoInfo] = await Promise.all([
      this.getBase64AndAspectRatio(),
      this.makePhotosWithDiffWidths(pathsByWidths),
    ]);

    return {
      base64String: base64AndAspectRation[0],
      aspectRatio: base64AndAspectRation[1],
    };
  };

  getBase64AndAspectRatio = () => {
    //const [base64String, aspectRatio] =
    return Promise.all([
      this.sharpImage.generateBase64String(),
      this.sharpImage.getAspectRatio(),
    ]);

    
  };

  makePhotosWithDiffWidths = async (pathsFS: Map<number, string>) => {
    //const pathToResult = resolve(__dirname);
    //let quality = 50;

    //const paths = new Map<number, string>();

    const promises: Promise<OutputInfo>[] = [];


    const isInverted = await this.sharpImage.isVerticalInverted();

    const metadata = await this.sharpImage.getMetadata();

    //for await (let width of widths) {
    for (let sizes of photoSizes) {
      let resizeOptions =
        isInverted || metadata.height >= metadata.width
          ? { height: sizes.height, width: null }
          : { width: sizes.width, height: null };

      //console.log(`RESIZED OPTIONS - ${JSON.stringify(resizeOptions)}`);

      promises.push(
        this.sharpImage.resize(resizeOptions, pathsFS.get(sizes.width))
      );
    }

    return Promise.all(promises);
  };

  /* getBase64AndAspectRatio = async () => {
    //const base64String = await this.generateBase64String();

    //const metadata = await this.getMetadata();

    const [base64String, metadata] = await Promise.all([
      this.sharpImage.generateBase64String(),
      this.sharpImage.getMetadata(),
    ]);

    return {
      base64String,
      aspectRatio: Math.round((metadata.width / metadata.height) * 100) / 100,
    };
  }; /
}

export default SharpHelper;
 */
