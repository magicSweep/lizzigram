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

const pathToPhoto = resolve(__dirname, "image", "ladki.jpg");

//console.log = jest.fn();

jest.setTimeout(20000);

describe("Add photo middleware", () => {
  beforeAll(async () => {
    app = await init();
    firestoreHelper = new AppTestHelper(db);
    //await firestoreHelper.setExistedPhoto("1593982800000");
    await firestoreHelper.createPhotoRecord();
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
      .post("/add-photo")
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

const r = {
  config: {
    url:
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    method: "POST",
    userAgentDirectives: [
      {
        product: "google-api-nodejs-client",
        version: "4.4.3",
        comment: "gzip",
      },
    ],
    data: {
      _readableState: {
        objectMode: false,
        highWaterMark: 16384,
        buffer: { head: null, tail: null, length: 0 },
        length: 0,
        pipes: null,
        pipesCount: 0,
        flowing: false,
        ended: true,
        endEmitted: true,
        reading: false,
        sync: false,
        needReadable: false,
        emittedReadable: false,
        readableListening: false,
        resumeScheduled: false,
        emitClose: true,
        autoDestroy: false,
        destroyed: false,
        defaultEncoding: "utf8",
        awaitDrainWriters: null,
        multiAwaitDrain: false,
        readingMore: false,
        decoder: null,
        encoding: null,
      },
      readable: false,
      _events: {},
      _eventsCount: 2,
      _writableState: {
        objectMode: false,
        highWaterMark: 16384,
        finalCalled: false,
        needDrain: false,
        ending: true,
        ended: true,
        finished: true,
        destroyed: false,
        decodeStrings: true,
        defaultEncoding: "utf8",
        length: 0,
        writing: false,
        corked: 0,
        sync: false,
        bufferProcessing: false,
        writecb: null,
        writelen: 0,
        afterWriteTickInfo: null,
        bufferedRequest: null,
        lastBufferedRequest: null,
        pendingcb: 0,
        prefinished: true,
        errorEmitted: false,
        emitClose: true,
        autoDestroy: false,
        bufferedRequestCount: 0,
        corkedRequestsFree: { next: null, entry: null },
      },
      writable: false,
      allowHalfOpen: true,
      _transformState: {
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: "buffer",
      },
    },
    headers: {
      "x-goog-api-client": "gdcl/4.4.3 gl-node/12.19.1 auth/6.1.3",
      "content-type":
        "multipart/related; boundary=a58653bf-a39d-4612-8046-7a6ffe684c4b",
      "Accept-Encoding": "gzip",
      "User-Agent": "google-api-nodejs-client/4.4.3 (gzip)",
      Authorization:
        "Bearer ya29.c.KpwB5gerfIxLne_gsZJNzAqrb0VZS3BwCEjk2bgHBEsFSajmfuph19qLAC49ZH1rqcpqScmeHxn_tBVqGJ5ZPufBZgYVbR2Mdgt8MN0Vr0iM_gpmNJPQX39MMen0926La39_B9352usPGoPWl0AcwxtWXHMkbik0r92TsKO_eoGC68oXTxfr97mMuxxqLf3PNKpe8CBg8IwGCBPJ0tw7",
      Accept: "application/json",
    },
    params: { uploadType: "multipart" },
    retry: true,
    body: {
      _readableState: {
        objectMode: false,
        highWaterMark: 16384,
        buffer: { head: null, tail: null, length: 0 },
        length: 0,
        pipes: null,
        pipesCount: 0,
        flowing: false,
        ended: true,
        endEmitted: true,
        reading: false,
        sync: false,
        needReadable: false,
        emittedReadable: false,
        readableListening: false,
        resumeScheduled: false,
        emitClose: true,
        autoDestroy: false,
        destroyed: false,
        defaultEncoding: "utf8",
        awaitDrainWriters: null,
        multiAwaitDrain: false,
        readingMore: false,
        decoder: null,
        encoding: null,
      },
      readable: false,
      _events: {},
      _eventsCount: 2,
      _writableState: {
        objectMode: false,
        highWaterMark: 16384,
        finalCalled: false,
        needDrain: false,
        ending: true,
        ended: true,
        finished: true,
        destroyed: false,
        decodeStrings: true,
        defaultEncoding: "utf8",
        length: 0,
        writing: false,
        corked: 0,
        sync: false,
        bufferProcessing: false,
        writecb: null,
        writelen: 0,
        afterWriteTickInfo: null,
        bufferedRequest: null,
        lastBufferedRequest: null,
        pendingcb: 0,
        prefinished: true,
        errorEmitted: false,
        emitClose: true,
        autoDestroy: false,
        bufferedRequestCount: 0,
        corkedRequestsFree: { next: null, entry: null },
      },
      writable: false,
      allowHalfOpen: true,
      _transformState: {
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: "buffer",
      },
    },
    responseType: "json",
  },
  data: {
    kind: "drive#file",
    id: "1_T1jHZDnj_Wo-bsFWMc_5FI0d7gqW-HD",
    name: "photo_1605919697231.jpg",
    mimeType: "image/jpeg",
  },
  headers: {
    "alt-svc":
      'h3-29=":443"; ma=2592000,h3-T051=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"',
    "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
    connection: "close",
    "content-length": "133",
    "content-type": "application/json; charset=UTF-8",
    date: "Sat, 21 Nov 2020 00:48:19 GMT",
    expires: "Mon, 01 Jan 1990 00:00:00 GMT",
    pragma: "no-cache",
    server: "UploadServer",
    vary: "Origin, X-Origin",
    "x-guploader-uploadid":
      "ABg5-Ux5iSAOMM27ztcxGm0rEXBLI2bf7vYzZkC7EeP108UrxMJFGj_y30Kbi-91kQSuICltvXvbcXRgojSK9o0jM8fXjjH-kQ",
  },
  status: 200,
  statusText: "OK",
  request: {
    responseURL:
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
  },
};
