import request from "supertest";
import { multerLimits, fileFilter, fileName } from "../multer";
import { init } from "../../app";
import { readdir } from "fs";
import { promisify } from "util";

jest.mock("./../multer", () => {
  const originalModule = jest.requireActual("./../multer");

  return {
    __esModule: true,
    ...originalModule,
    multerLimits: {
      fields: 2,
      fieldSize: 10520,
      files: 1,
      fileSize: 1971520, //20971520 - 20MB
      headerPairs: 30,
    },
  };
});

let app;

const pathToLargePhoto =
  "/home/nikki/Downloads/priroda-ozero-peizazh-gornye-vershiny-gory.jpg";
const pathToPhoto = "/home/nikki/Downloads/13.jpg";
const pathToWrongMimetypeFile = "/home/nikki/Downloads/get.pip.py";

const pathToUploadsDir = "./uploads";

console.log = jest.fn();

// IF WE GET ERROR FROM MULTER(LIMITS) IT GOES TO GLOBAL ERROR HANDLER
// IF FAILED VALIDATION IN FILE FILTER - THERE IS NO ERROR - WE ONLY DO NOT GET
// FILE IN REQEST OBJECT

describe("Multer possible errors", () => {
  beforeAll(async () => {
    app = await init();
  });

  test("No fields - we get response - Failed multer validation", async () => {
    const response = await request(app).post("/add-photo");

    expect(response.text.includes("Failed multer validation")).toEqual(true);
  });

  // If we get file without id field - we do not upload file
  // cause of our fileFilter - and we got error no file
  test("Id field empty", async () => {
    const response = await request(app)
      .post("/add-photo")
      .attach("file", pathToPhoto);

    const files = await promisify(readdir)(pathToUploadsDir);
    expect(files.length).toEqual(0);
    expect(response.text.includes("We've got no photo file")).toEqual(true);
  });

  test("No file - we've got our response with error in data - We've got no photo file", async () => {
    const response = await request(app)
      .post("/add-photo")
      .field("id", "1234567890123");

    expect(response.text.includes("We've got no photo file")).toEqual(true);
  });

  describe("File failed limits validation - we get response from GLOBAL ERROR HANDLER", () => {
    test("Too large file", async () => {
      const response = await request(app)
        .post("/add-photo")
        .field("id", "1234567890123")
        .field("userUid", "user1234567890123")
        .attach("file", pathToLargePhoto);

      const files = await promisify(readdir)(pathToUploadsDir);
      expect(files.length).toEqual(0);

      expect(response.text.includes("File too large")).toEqual(true);
    });

    test("Too many files", async () => {
      const response = await request(app)
        .post("/add-photo")
        .field("id", "1234567890123")
        .field("id", "1234567890123")
        .attach("file", pathToPhoto)
        .attach("file1", pathToPhoto);

      const files = await promisify(readdir)(pathToUploadsDir);
      expect(files.length).toEqual(0);

      expect(response.text.includes("Too many files")).toEqual(true);
    });

    test("Too many fields", async () => {
      const response = await request(app)
        .post("/add-photo")
        .field("id", "1234567890123")
        .field("userUid", "user1234567890123")
        .field("bla", "virus")
        .attach("file", pathToPhoto);

      const files = await promisify(readdir)(pathToUploadsDir);
      expect(files.length).toEqual(0);

      expect(response.text.includes("Too many fields")).toEqual(true);
    });
  });

  describe("File failed our limit fail validation - we get success response with our error in data", () => {
    test("Wrong mimetype", async () => {
      const response = await request(app)
        .post("/add-photo")
        .field("id", "1234567890123")
        .attach("file", pathToWrongMimetypeFile);

      const files = await promisify(readdir)(pathToUploadsDir);
      expect(files.length).toEqual(0);

      expect(response.text.includes("We've got no photo file")).toEqual(true);
    });

    test("Wrong id", async () => {
      const response = await request(app)
        .post("/add-photo")
        .field("id", "1234567890123aaa")
        .attach("file", pathToPhoto);

      const files = await promisify(readdir)(pathToUploadsDir);
      expect(files.length).toEqual(0);

      expect(response.text.includes("We've got no photo file")).toEqual(true);
    });
  });
});
