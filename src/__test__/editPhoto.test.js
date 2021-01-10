/**
 * @jest-environment node
 */

import request from "supertest";
import {
  pathToTempDiffWidthsPhotos,
  pathToUploadFilesDir,
  pathToFirestoreCredentials,
  pathToGoogleDriveCredentials,
  photoWidths,
  PHOTOS_FIRESTORE_COLLECTION_NAME,
} from "./../config";
import { init } from "./../app";
import { readdir, unlink, existsSync } from "fs";
import { promisify } from "util";
import AppTestHelper from "./../firestore/AppTestHelper";
import { db } from "./../firestore";
import { resolve } from "path";
import { googleDrive } from "./../googleDrive";
import { getAllFiles } from "../cloudinary";
import wait from "waait";

jest.mock("./../config", () => {
  const pathToRootDir = "/home/nikki/Documents/Project/lizzygram/backend";
  return {
    __esModule: true,
    pathToTempDiffWidthsPhotos: `${pathToRootDir}/src/__test__/temp`,
    pathToUploadFilesDir: `${pathToRootDir}/src/__test__/uploads`,

    pathToFirestoreCredentials: `${pathToRootDir}/credentials/lizzigram-1600291187801-firebase-adminsdk-uef40-d840b18e39.json`,
    pathToGoogleDriveCredentials: `${pathToRootDir}/credentials/lizzigram-google-drive-1600291187801-3964f05f8a31.json`,

    photoWidths: [400, 800, 1200],

    PHOTOS_FIRESTORE_COLLECTION_NAME: "phototest",
  };
});

let app;
let firestoreHelper;

const pathToPhoto = resolve(__dirname, "image", "freestocks-9U.jpg");

//console.log = jest.fn();

jest.setTimeout(20000);

describe("Edit photo middleware", () => {
  beforeAll(async () => {
    app = await init();
    firestoreHelper = new AppTestHelper(db);
    await firestoreHelper.setExistedPhoto("1593982800385");
    //await firestoreHelper.createPhotoRecord();
  });

  /* afterAll(async () => {
    await firestoreHelper.removePhotoRecord();
  }); */

  test("Success file upload", async () => {
    expect(existsSync(pathToPhoto)).toEqual(true);
    expect(existsSync(pathToFirestoreCredentials)).toEqual(true);
    //pathToGoogleDriveCredentials
    expect(existsSync(pathToGoogleDriveCredentials)).toEqual(true);

    expect(firestoreHelper.photo.addedByUserUID).toEqual("superuser12334");

    expect(existsSync(pathToPhoto)).toEqual(true);

    const response = await request(app)
      .post("/edit-photo")
      .field("id", firestoreHelper.photoId)
      .field("userUid", firestoreHelper.photo.addedByUserUID)
      .attach("file", pathToPhoto);

    await wait(15000);

    // NO TEMP PHOTOS
    let files = await promisify(readdir)(pathToTempDiffWidthsPhotos);
    expect(files.length).toEqual(0);

    // NO UPLOAD PHOTO
    files = await promisify(readdir)(pathToUploadFilesDir);
    expect(files.length).toEqual(0);

    // GET PHOTO RECORD FROM FIRESTORE
    const photoDoc = await firestoreHelper.getPhotoRecordFromFirestore();

    expect(photoDoc.exists).toEqual(true);

    const photo = photoDoc.data();

    // CHECK PHOTO ON GOOGLE DRIVE
    expect(photo.googleDriveId).toBeDefined();
    await checkIfExistsPhotoOnGoogleDrive(photo.googleDriveId);

    // CHECK PHOTOS ON CLOUDINARY
    await checkIfExistsPhotosOnCloudinary(photo.files);

    // CHECK PREV PHOTOS ON CLOUDINARY
    await checkNotExistsPrevPhotosOnCloudinary(firestoreHelper.photo.files);

    expect(response.text.includes("success")).toEqual(true);
  });
});

const checkIfExistsPhotoOnGoogleDrive = async (id) => {
  const googlePhotos = await googleDrive.getAllFiles();

  const googleIds = [];
  googlePhotos.forEach((data) => {
    googleIds.push(data.id);
  });

  expect(googleIds.includes(id)).toEqual(true);
};

const checkIfExistsPhotosOnCloudinary = async (photoFiles) => {
  const res = await getAllFiles();
  const publicIds = [];
  res.resources.forEach((data) => {
    publicIds.push(data.public_id);
  });

  photoFiles.forEach((publicId) => {
    expect(publicIds.includes(publicId)).toEqual(true);
  });
};

const checkNotExistsPrevPhotosOnCloudinary = async (photoFiles) => {
  const res = await getAllFiles();
  const publicIds = [];
  res.resources.forEach((data) => {
    publicIds.push(data.public_id);
  });

  photoFiles.forEach((publicId) => {
    expect(publicIds.includes(publicId)).toEqual(false);
  });
};
