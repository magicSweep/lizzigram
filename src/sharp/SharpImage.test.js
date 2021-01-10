//import { makeJpgsByWidths, base64, getBase64AndAspectRatio } from ".";
import { resolve } from "path";
import { promisify } from "util";
import fs, { existsSync, unlink } from "fs";
import {
  getMetadata,
  getAspectRatio,
  isVerticalInverted,
  generateBase64String,
  makeOptimizedWebp,
  resize,
} from "./SharpImage";

//"ladki.jpg"
const pathToPhoto = resolve(__dirname, "images", "ladki.jpg");
const pathToPhoto1 = resolve(__dirname, "images", "girl_600.jpeg");
const pathToInvertedPhoto = resolve(__dirname, "images", "image6.jpeg");
const pathToResizedPhoto = resolve(
  __dirname,
  "result",
  "test",
  "resized_400.webp"
);
const pathToOptimizedPhoto = resolve(__dirname, "result", "test", "opt.webp");
const pathToOptimizedPhoto1 = resolve(__dirname, "result", "test", "opt1.webp");

describe("SharpImage", () => {
  afterEach(async () => {
    if (existsSync(pathToResizedPhoto))
      await promisify(unlink)(pathToResizedPhoto);
    if (existsSync(pathToOptimizedPhoto))
      await promisify(unlink)(pathToOptimizedPhoto);
    if (existsSync(pathToOptimizedPhoto1))
      await promisify(unlink)(pathToOptimizedPhoto1);
  });

  describe("getMetadata", () => {
    test("", async () => {
      //const image = sharp(pathToPhoto);
      const metadata = await getMetadata(pathToPhoto);

      expect(metadata.width).toEqual(1920);
      expect(metadata.width / metadata.height).toEqual(1.6);
    });
  });

  describe("generateBase64String", () => {
    test("", async () => {
      //const image = sharp(pathToPhoto);

      await makeOptimizedWebp(pathToPhoto, pathToOptimizedPhoto);

      const result = await generateBase64String(pathToOptimizedPhoto, false);

      expect(result).toEqual(
        "UklGRlIAAABXRUJQVlA4IEYAAADQAQCdASoPAAkAAUAmJaQAAtzOOzZ5kAD+1z//5db31L/qXkm88XJBn2BOPzoP3Np/xy+oHaL+7RxUXUoG9XNc0hKPQAAA"
      );
    });
  });

  describe("isVerticalInverted", () => {
    test("", async () => {
      //const image = sharp(pathToPhoto);
      const metadata1 = await getMetadata(pathToPhoto);

      let isInverted = isVerticalInverted(metadata1);

      expect(isInverted).toEqual(false);

      const metadata2 = await getMetadata(pathToInvertedPhoto);

      isInverted = isVerticalInverted(metadata2);

      expect(isInverted).toEqual(true);
    });
  });

  describe("getAspectRatio", () => {
    test("", async () => {
      //const image = sharp(pathToPhoto);
      const metadata1 = await getMetadata(pathToPhoto);

      let aspectRatio = getAspectRatio(
        metadata1,
        isVerticalInverted(metadata1)
      );

      expect(aspectRatio).toEqual(1.6);

      const metadata2 = await getMetadata(pathToInvertedPhoto);

      aspectRatio = getAspectRatio(metadata2, isVerticalInverted(metadata2));

      expect(aspectRatio).toEqual(0.75);
    });
  });

  describe("makeOptimizedWebp", () => {
    test("", async () => {
      const result = await makeOptimizedWebp(pathToPhoto, pathToOptimizedPhoto);

      expect(existsSync(pathToOptimizedPhoto)).toEqual(true);

      const metadata1 = await getMetadata(pathToPhoto);
      const metadata2 = await getMetadata(pathToOptimizedPhoto);

      expect(result.format).toEqual("webp");
      expect(metadata1.height).toEqual(metadata2.height);
      expect(metadata1.width).toEqual(metadata2.width);
    });
  });

  describe("resize", () => {
    test("", async () => {
      expect(existsSync(pathToPhoto1)).toEqual(true);
      expect(existsSync(pathToResizedPhoto)).toEqual(false);
      expect(existsSync(pathToOptimizedPhoto1)).toEqual(false);

      await makeOptimizedWebp(pathToPhoto1, pathToOptimizedPhoto1);

      const result = await resize(
        pathToOptimizedPhoto1,
        { width: 300 },
        pathToResizedPhoto
      );

      expect(result.format).toEqual("webp");
      expect(result.height).toEqual(300);
      expect(result.width).toEqual(300);
      expect(existsSync(pathToResizedPhoto)).toEqual(true);
    });
  });
});
