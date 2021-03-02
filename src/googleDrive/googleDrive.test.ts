import { readFile, writeFile, existsSync } from "fs";
import { promisify } from "util";
import { join } from "path";
import GoogleDrive from "./GoogleDrive";
import { path as rootPath } from "app-root-path";
import wait from "waait";

let googleDrive: GoogleDrive;

const pathToPhoto = join(rootPath, "src", "__test__", "image", "ladki.jpg");

describe("Google drive", () => {
  describe("Helper methods", () => {
    beforeAll(async () => {
      googleDrive = new GoogleDrive();
      await googleDrive.init();
    });

    test("Photo exists", () => {
      expect(existsSync(pathToPhoto)).toEqual(true);
    });

    test("getAllFilest", async () => {
      const googlePhotos = await googleDrive.getAllFiles();

      expect(googlePhotos.length === 0).toEqual(false);

      //file.name, file.id, file.mimeType
      //expect(files[1]).toEqual("hello");

      const googleIds = [];
      googlePhotos.forEach((data) => {
        googleIds.push(data.id);
      });

      //expect(true).toEqual(true);
      expect(googleIds).toEqual("hello");

      //1_T1jHZDnj_Wo-bsFWMc_5FI0d7gqW-HD
    });

    /*  test("deleteAllFiles", async () => {
      await googleDrive.deleteAllFiles();

      const files = await googleDrive.getAllFiles();

      expect(files.length === 1).toEqual(true);
    });
 */
    /*  test("uploadImageToDrive", async () => {
      // THIS TEST DO NOT CORRECTLY UPLOAD FILE TO DRIVE
      const photoName = `ladki_hello.jpg`;
      const file = await googleDrive.uploadImageToDrive(photoName, pathToPhoto);

      expect(file.data.id).toEqual(`${photoName}`);
    }); */

    /*  test("searchFileByName", async () => {
      const file = await googleDrive.searchFileByName("ladki1605742906525.jpg");

      //file.name, file.id, file.mimeType
      expect(file.name).toEqual("ladki1605742906525.jpg");
    }); */

    test("updateImageFile", async () => {
      // THIS METHOD WE MUST TEST IN EXAMPLE

      expect(true).toEqual(true);
    });

    test("downloadImageFromDrive", async () => {
      // THIS METHOD WE MUST TEST IN EXAMPLE

      expect(true).toEqual(true);
    });
  });
});
