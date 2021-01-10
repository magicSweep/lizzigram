import { deleteFile, uploadFile } from "../../cloudinary";
import ReSizedPhoto from "./ReSizedPhoto";
import { resolve } from "path";
import { path as rootPath } from "app-root-path";
import { existsSync } from "fs";
import { deleteFile as delFileFs } from "./../../utils";
import wait from "waait";
import { googleDrive } from "../../googleDrive";

/*   pathToPhoto: TPath,
    photoFileName: string,
    widths: number[],
    pathToDirWithPhotosDiffWidths: string */

jest.mock("../../googleDrive", () => {
  return {
    __esModule: true,
    googleDrive: {
      uploadImageToDrive: jest.fn(() => Promise.resolve(true)),
    },
  };
});

jest.mock("../../cloudinary", () => {
  return {
    __esModule: true,
    deleteFile: jest.fn((id) => Promise.resolve(true)),
    uploadFile: jest.fn((path) => {
      return Promise.resolve({
        public_id: `ID:${path}`,
        secure_url: `URL:${path}`,
      });
    }),
  };
});

jest.mock("./../../utils", () => {
  const originalModule = jest.requireActual("./../../utils");

  return {
    __esModule: true,
    ...originalModule,
    deleteFile: jest.fn((path) => {
      return Promise.resolve();
    }),
  };
});

import {
  pathToTempDiffWidthsPhotos,
  photoHeights,
  photoWidths,
} from "./../../config";

jest.mock("./../../config", () => {
  const pathToRootDir = "/home/nikki/Documents/Project/lizzygram/backend/src";

  return {
    __esModule: true,
    pathToTempDiffWidthsPhotos: `${pathToRootDir}/sharp/result`,
    photoHeights: [300, 600, 700],
    photoWidths: [400, 800, 1200],
  };
});

jest.mock("fs");

existsSync.mockReturnValue(true);

/* 
jest.mock("fs", () => {
  return {
    existsSync: jest.fn().mockImplementation(() => {
      return true;
    }),
  };
}); */

const pathToPhoto = resolve(rootPath, "sharp", "images", "ladki.jpg");
const photoFileName = "ladki.jpg";
//const widths = [400, 800, 1200];
//const pathToDirWithPhotosDiffWidths = resolve(rootPath, "sharp", "result");

const resize = new ReSizedPhoto(pathToPhoto, photoFileName);

const sharpImage = {
  pathToImage: pathToPhoto,
  generateBase64String: jest.fn(() => {
    return Promise.resolve("base64String");
  }),
  getMetadata: jest.fn(() => {
    return Promise.resolve({ width: "1920", height: "1080" });
  }),
  makeResizedJpg: jest.fn((width, quality, path) => {
    return Promise.resolve({ width, format: "jpeg" });
  }),
};

console.error = jest.fn();

describe("ReSizedPhoto", () => {
  describe("Helper methods mocked", () => {
    beforeAll(() => {
      resize.sharpImage = sharpImage;
    });

    beforeEach(() => {
      delFileFs.mockClear();
      existsSync.mockClear();
      deleteFile.mockClear();
    });

    test("parseCloudinaryPhotosDiffWidthsInfo - we set cloudinaryIds and cloudinary secureUrls to properties", () => {
      const cloudinaryInfoPhotosDiffWidths = new Map([
        [
          400,
          {
            public_id: `ID:400`,
            secure_url: `URL:400`,
          },
        ],
        [
          800,
          {
            public_id: `ID:800`,
            secure_url: `URL:800`,
          },
        ],
      ]);

      resize.parseCloudinaryPhotosDiffWidthsInfo(
        cloudinaryInfoPhotosDiffWidths
      );

      expect(resize.photoCloudinaryIds).toEqual(["ID:400", "ID:800"]);
      expect(resize.photoCloudinaryUrls.get(400)).toEqual("URL:400");
      expect(resize.photoCloudinaryUrls.get(800)).toEqual("URL:800");
    });

    test("generatePathsToDiffWidthPhotos - we make Map object of paths to each width of future photo", () => {
      resize.generatePathsToDiffWidthPhotos();

      expect(resize.paths.get(400)).toEqual(
        "/home/nikki/Documents/Project/lizzygram/backend/sharp/result/ladki-400.jpg"
      );
      expect(resize.paths.get(1200)).toEqual(
        "/home/nikki/Documents/Project/lizzygram/backend/sharp/result/ladki-1200.jpg"
      );
    });

    test("uploadImagesToCloudinary ", async () => {
      resize.generatePathsToDiffWidthPhotos();

      const result = await resize.uploadImagesToCloudinary();

      expect(uploadFile).toHaveBeenCalledTimes(3);

      expect(result.size).toEqual(3);

      expect(result.get(800).public_id).toEqual(
        "ID:/home/nikki/Documents/Project/lizzygram/backend/sharp/result/ladki-800.jpg"
      );

      expect(result.get(800).secure_url).toEqual(
        "URL:/home/nikki/Documents/Project/lizzygram/backend/sharp/result/ladki-800.jpg"
      );
    });

    test("setBase64AndAspectRatio", async () => {
      //const image = sharp(pathToPhoto);
      await resize.setBase64AndAspectRatio();

      expect(resize.sharpImage.generateBase64String).toHaveBeenCalledTimes(1);
      expect(resize.aspectRatio).toEqual(1.78);

      expect(resize.sharpImage.getMetadata).toHaveBeenCalledTimes(1);
      expect(resize.base64String).toEqual("base64String");
    });

    //makeJpgsByWidths
    test("makeJpgsByWidths", async () => {
      resize.generatePathsToDiffWidthPhotos();

      const result = await resize.makeJpgsByWidths();

      expect(resize.sharpImage.makeResizedJpg).toHaveBeenCalledTimes(3);

      expect(result.length).toEqual(3);

      expect(result[0].width).toEqual(400);
      expect(result[2].width).toEqual(1200);
    });

    test("removeUploadPhoto", async () => {
      resize.removeUploadPhoto();

      expect(existsSync).toHaveBeenCalledTimes(1);
      expect(delFileFs).toHaveBeenCalledTimes(1);

      delFileFs.mockReturnValue(Promise.reject({ message: "Big error" }));

      resize.removeUploadPhoto();

      await wait(100);

      expect(existsSync).toHaveBeenCalledTimes(2);
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        "Can't delete upload photo file - /home/nikki/Documents/Project/lizzygram/backend/sharp/images/ladki.jpg | Big error"
      );

      expect(delFileFs).toHaveBeenCalledTimes(2);

      //expect(existsSync("hello")).toEqual(true);
    });

    test("removeTempPhotoDiffWidthsFiles", async () => {
      resize.removeTempPhotoDiffWidthsFiles();

      await wait(100);

      expect(existsSync).toHaveBeenCalledTimes(3);
      expect(delFileFs).toHaveBeenCalledTimes(3);
    });

    test("removePhotoDiffWidthsCloudinaryFiles", async () => {
      resize.removePhotoDiffWidthsCloudinaryFiles();

      await wait(100);

      expect(deleteFile).toHaveBeenCalledTimes(2);
    });
  });

  describe("Public methods", () => {
    beforeAll(() => {
      // MOCK
      resize.generatePathsToDiffWidthPhotos = jest.fn();
      resize.makeJpgsByWidths = jest.fn(() => Promise.resolve());
      resize.setBase64AndAspectRatio = jest.fn(() => Promise.resolve());
      resize.uploadImagesToCloudinary = jest.fn(() =>
        Promise.resolve("Blalla")
      );

      resize.parseCloudinaryPhotosDiffWidthsInfo = jest.fn();
      // AND ALL REMOVE METHODS

      resize.removePhotoDiffWidthsCloudinaryFiles = jest.fn();
      resize.removeUploadPhoto = jest.fn();
      resize.removeTempPhotoDiffWidthsFiles = jest.fn();
    });

    test("cleanUpOnError", () => {
      resize.cleanUpOnError();

      expect(resize.removePhotoDiffWidthsCloudinaryFiles).toHaveBeenCalledTimes(
        1
      );
      expect(resize.removeTempPhotoDiffWidthsFiles).toHaveBeenCalledTimes(1);
      expect(resize.removeUploadPhoto).toHaveBeenCalledTimes(1);
    });

    test("make", async () => {
      await resize.make();

      expect(resize.generatePathsToDiffWidthPhotos).toHaveBeenCalledTimes(1);
      expect(resize.makeJpgsByWidths).toHaveBeenCalledTimes(1);
      expect(resize.setBase64AndAspectRatio).toHaveBeenCalledTimes(1);

      expect(resize.uploadImagesToCloudinary).toHaveBeenCalledTimes(1);

      expect(resize.parseCloudinaryPhotosDiffWidthsInfo).toHaveBeenCalledTimes(
        1
      );
      expect(resize.parseCloudinaryPhotosDiffWidthsInfo).toHaveBeenCalledWith(
        "Blalla"
      );
    });

    test("saveToGoogleDrive", () => {});
  });
});
