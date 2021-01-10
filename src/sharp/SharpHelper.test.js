//import { makeJpgsByWidths, base64, getBase64AndAspectRatio } from ".";
import { resolve } from "path";
import { promisify } from "util";
import fs, { existsSync, unlink } from "fs";
import sharp from "sharp";
import SharpHelper from "./SharpHelper";
import { photoSizes } from "../config";
import {
  getMetadata,
  getAspectRatio,
  isVerticalInverted,
  generateBase64String,
  makeOptimizedWebp,
  resize,
} from "./SharpImage";

jest.mock("./SharpImage", () => {
  return {
    __esModule: true,
    isVerticalInverted: jest.fn().mockReturnValue(false),
    getMetadata: jest.fn().mockResolvedValue({ width: 1920, height: 1080 }),
    resize: jest.fn().mockResolvedValue(true),

    generateBase64String: jest.fn().mockResolvedValue("base64"),
    getAspectRatio: jest.fn().mockReturnValue(1.78),

    makeOptimizedWebp: jest.fn().mockResolvedValue(true),
  };
});

//"ladki.jpg"
//const pathToResizedPhoto = resolve(__dirname, "result", "ladki_U_400.jpg");

/* let pathToPhoto = resolve(__dirname, "images", "girl_600.jpeg");
let pathToInvertedPhoto = resolve(__dirname, "images", "image6.jpeg");
let pathToResultDir = resolve(__dirname, "result"); */

const sharpHelper = new SharpHelper(
  "/pathToPhoto",
  "/pathToTempDir",
  photoSizes
);

describe("SharpHelper", () => {
  describe("Constructor", () => {
    test("Must create sharp image instance", () => {
      expect(sharpHelper.pathToPhoto).toEqual("/pathToPhoto");
      expect(sharpHelper.pathToTempDir).toEqual("/pathToTempDir");
      expect(sharpHelper.photoSizes).toEqual(photoSizes);
      //expect(sharpHelper.pathToOptimizedImage).toEqual("/hello");
    });
  });

  describe("makePhotosWithDiffWidths", () => {
    test("", async () => {
      const pathsByWidths = new Map([
        [400, `/photo_400.jpg`],
        [800, `/photo_800.jpg`],
        [1280, `/photo_1280.jpg`],
        [1920, `/photo_1920.jpg`],
        [3840, `/photo_3840.jpg`],
      ]);

      const photosInfo = await sharpHelper.makePhotosWithDiffWidths(
        pathsByWidths,
        { width: 1920, height: 1080 }
      );

      expect(photosInfo).toHaveLength(5);

      expect(isVerticalInverted).toHaveBeenCalledTimes(1);
      //expect(sharpHelper.sharpImage.getMetadata).toHaveBeenCalledTimes(1);
      expect(resize).toHaveBeenCalledTimes(5);

      expect(resize).toHaveBeenNthCalledWith(
        1,
        sharpHelper.pathToOptimizedImage,
        { height: null, width: 400 },
        "/photo_400.jpg"
      );
    });
  });

  describe("getBase64AndAspectRatio", () => {
    test("", async () => {
      //const image = sharp(pathToPhoto);
      const [
        base64String,
        aspectRatio,
      ] = await sharpHelper.getBase64AndAspectRatio({
        width: 1920,
        height: 1080,
      });

      expect(aspectRatio).toEqual(1.78);

      expect(base64String).toEqual("base64");

      expect(getAspectRatio).toHaveBeenCalledTimes(1);
      expect(generateBase64String).toHaveBeenCalledTimes(1);
    });
  });

  describe("make", () => {
    test("", async () => {
      //const image = sharp(pathToPhoto);

      sharpHelper.getBase64AndAspectRatio = jest
        .fn()
        .mockResolvedValue(["base64str", 1.6]);
      sharpHelper.makePhotosWithDiffWidths = jest
        .fn()
        .mockResolvedValue([true, true]);

      sharpHelper.getOptimizedImageMetadata = jest
        .fn()
        .mockReturnValue("metadata");

      const pathsByWidths = new Map([
        [400, `/photo_400.jpg`],
        [800, `/photo_800.jpg`],
      ]);

      const { base64String, aspectRatio } = await sharpHelper.make(
        pathsByWidths
      );

      expect(aspectRatio).toEqual(1.6);

      expect(base64String).toEqual("base64str");

      expect(makeOptimizedWebp).toHaveBeenCalledTimes(1);
      expect(sharpHelper.getOptimizedImageMetadata).toHaveBeenCalledTimes(1);
      expect(sharpHelper.getBase64AndAspectRatio).toHaveBeenCalledTimes(1);
      expect(sharpHelper.makePhotosWithDiffWidths).toHaveBeenCalledTimes(1);
    });
  });
});
