//import { makeJpgsByWidths, base64, getBase64AndAspectRatio } from ".";
import { resolve } from "path";
import { promisify } from "util";
import { existsSync, unlink } from "fs";
import { googleDrive } from "./../../googleDrive";

import { deleteFile, uploadFile } from "../../cloudinary";

import ReSizedPhoto from "./ReSizedPhoto";

import { deleteFile as delFileFs } from "./../../utils";
import wait from "waait";

jest.mock("./../../utils", () => {
  return {
    __esModule: true,
    deleteFile: jest.fn().mockResolvedValue(),
  };
});

jest.mock("../../cloudinary", () => {
  return {
    __esModule: true,
    deleteFile: jest.fn().mockResolvedValue(),
    uploadFile: jest.fn().mockResolvedValue(),
  };
});

jest.mock("./../../googleDrive", () => {
  return {
    __esModule: true,
    googleDrive: {},
  };
});

jest.mock("fs");

existsSync.mockReturnValue(true);

const resize = new ReSizedPhoto("/pathToPhoto", "image6");

describe("ReSizedPhoto", () => {
  afterEach(() => {
    existsSync.mockClear();
    delFileFs.mockClear();
  });

  test("removeOptimizedPhoto", async () => {
    resize.removeOptimizedPhoto();

    await wait(500);

    expect(existsSync).toHaveBeenCalledTimes(1);
    expect(delFileFs).toHaveBeenCalledTimes(1);

    expect(existsSync).toHaveBeenCalledWith(
      resize.sharpHelper.pathToOptimizedImage
    );
    expect(delFileFs).toHaveBeenCalledWith(
      resize.sharpHelper.pathToOptimizedImage
    );
  });

  test("removeUploadPhoto", async () => {
    resize.removeUploadPhoto();

    await wait(500);

    expect(existsSync).toHaveBeenCalledTimes(1);
    expect(delFileFs).toHaveBeenCalledTimes(1);

    expect(existsSync).toHaveBeenCalledWith(resize.sharpHelper.pathToPhoto);
    expect(delFileFs).toHaveBeenCalledWith(resize.sharpHelper.pathToPhoto);
  });

  test("removeTempPhotoDiffWidthsFiles - remove photos in resize.sharpHelper.paths", async () => {
    const paths = new Map([
      [400, `/photo_400.webp`],
      [800, `/photo_800.webp`],
      [1280, `/photo_1280.webp`],
      [1920, `/photo_1920.webp`],
      [3840, `/photo_3840.webp`],
    ]);

    resize.paths = paths;

    resize.removeTempPhotoDiffWidthsFiles();

    await wait(500);

    expect(existsSync).toHaveBeenCalledTimes(5);
    expect(delFileFs).toHaveBeenCalledTimes(5);

    expect(existsSync).toHaveBeenNthCalledWith(1, `/photo_400.webp`);
    expect(delFileFs).toHaveBeenNthCalledWith(2, `/photo_800.webp`);
  });

  test("removeCloudinaryFiles", async () => {
    await resize.removeCloudinaryFiles(["one", "two", "three"]);

    expect(deleteFile).toHaveBeenCalledTimes(3);

    expect(deleteFile).toHaveBeenNthCalledWith(2, "two");
  });
});

/* //import { makeJpgsByWidths, base64, getBase64AndAspectRatio } from ".";
import { resolve } from "path";
import { promisify } from "util";
import fs, { existsSync, unlink } from "fs";
//import sharp from "sharp";
//import SharpImage from "./SharpImage";
import ReSizedPhoto from "./ReSizedPhoto";
import random from "lodash.random";
import {
  pathToTempDiffWidthsPhotos,
  //photoHeights,
  //photoWidths,
  photoSizes,
} from "./../../config";

jest.mock("./../../config", () => {
  const originalModule = jest.requireActual("./../../config");

  const rootPath = "/home/nikki/Documents/Project/lizzygram/backend/src";

  return {
    __esModule: true,
    ...originalModule,
    pathToTempDiffWidthsPhotos: `${rootPath}/sharp/result`,
  };
});

//"ladki.jpg"

let pathToPhoto = resolve(
  __dirname,
  "..",
  "..",
  "sharp",
  "images",
  "image6.jpeg"
);
let pathToInvertedPhoto = resolve(
  __dirname,
  "..",
  "..",
  "sharp",
  "images",
  "image6.jpeg"
);
let pathToResultDir = resolve(__dirname, "..", "..", "sharp", "result");

//const pathToResizedPhoto = resolve(__dirname, "result", "ladki_U_400.jpg");

//const sharpImage = new SharpImage(pathToPhoto);

const resize = new ReSizedPhoto(pathToPhoto, "image6");

describe("ReSizedPhoto", () => {
   test("ReSizedPhoto", async () => {
    const resize = new ReSizedPhoto(pathToPhoto);

    await resize.setBase64AndAspectRatio();

    expect(resize.base64String).toEqual(
      "/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAfADIDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAABQYAAwcCBP/EAC0QAAEDAgQDBwUBAAAAAAAAAAEAAgMEEQUSITEGFJEVIjJBQlNhE1JUgZKC/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AHhs0R2lYf8AQXedn3N6rGxV1INxPJ/SsGIVlrczJ1Qa+ZYxvI0ftcGrpwdZo/6WTTz1bS3NUvdmF9HK2mpqqpjfL9VwYze7jqgbeL3NquVEb2yR5u8AbojgtXQ0eHtiNQxtjsTskQPnfFkiORvydVTJh8viMjdflBp/a1B+VH1UWV8k/wB1vVRA4RcEU3rmcV6W8FUAGrnFH43iytDkC/JwbQvAs5wI2QnGMMGD0zmUxMl+8+/kE7km2m6XpRzEldT1IvKGE3G1kCJK/S40vsvbhrKScOZUylj/AEoXUPOfJ5NJAVbnEkfCA72XB7wUQgTPt4iog//Z"
    );
    expect(resize.aspectRatio).toEqual(1.6);
  }); 

  describe("makeJpgsByWidths", () => {
    test("", async () => {
      expect(existsSync(pathToPhoto)).toEqual(true);

      const pathsByWidths = new Map([
        [400, `${pathToResultDir}/photo_400.jpg`],
        [800, `${pathToResultDir}/photo_800.jpg`],
        [1200, `${pathToResultDir}/photo_1200.jpg`],
        [1900, `${pathToResultDir}/photo_1900.jpg`],
        [3840, `${pathToResultDir}/photo_3840.jpg`],
      ]);

      resize.generatePathsToDiffWidthPhotos();

      const photosInfo = await resize.makeJpgsByWidths();

      expect(photosInfo).toHaveLength(5);
    });
  });

    test("Use Promise.all in Promise.all", async () => {
    const prom = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const rand = random(555);
          resolve(rand);
        }, 500);
      });
    };

    const prom1 = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const rand = random(555);
          resolve(rand);
        }, 3000);
      });
    };

    const getPromises = () => {
      const promises = [];
      [1, 2, 3].forEach(() => {
        promises.push(prom());
      });

      return Promise.all(promises);
    };

    const res = await Promise.all([getPromises(), getPromises()]);

    expect(res).toEqual([
      [69, 111, 414],
      [113, 454, 177],
    ]);
  }); 
});
 */
