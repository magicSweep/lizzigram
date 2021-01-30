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
