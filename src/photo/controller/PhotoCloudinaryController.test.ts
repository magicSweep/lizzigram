//import { sCloudinary } from "../../cloudinary";
import ReSizedPhoto from "../helper/ReSizedPhoto";
import PhotoModel from "../entity/PhotoModel";

import { db } from "./../../firestore";
import { unlink } from "fs";

import {
  addPhotoMiddleware,
  editPhotoMiddleware,
} from "./PhotoCloudinaryController";

import { updateGoogleDriveFile, saveToGoogleDrive } from "./helper";
import { photoSizes } from "../../config";

jest.mock("./helper", () => {
  return {
    __esModule: true,
    saveToGoogleDrive: jest.fn(),
    updateGoogleDriveFile: jest.fn(),
  };
});

jest.mock("fs");

jest.mock("../helper/ReSizedPhoto", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock("../entity/PhotoModel", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock("./../../firestore", () => {
  return {
    __esModule: true,
    db: "db",
  };
});

const resizedPhoto = {
  aspectRatio: "aspectRatio",
  base64String: "base64String",
  photoCloudinaryUrls: "photoCloudinaryUrls",
  photoCloudinaryIds: "photoCloudinaryIds",

  make: jest.fn(() => Promise.resolve()),
  removeTempPhotoDiffWidthsFiles: jest.fn(),
  cleanUpOnError: jest.fn(),
  saveToGoogleDrive: jest.fn(() =>
    Promise.resolve({
      data: { id: "googledriveid" },
    })
  ),
  updateGoogleDriveFile: jest.fn(() => Promise.resolve("response")),
  removeUploadPhoto: jest.fn(() => Promise.resolve()),
  removeOptimizedPhoto: jest.fn(() => Promise.resolve()),
  removeCloudinaryFiles: jest.fn(() => Promise.resolve()),
};

const photoModel = {
  prevPhoto: {
    googleDriveId: "googleDriveId",
    files: "files_photoCloudinaryIds",
  },

  validateEditFirestoreRecord: jest.fn(() => Promise.resolve()),
  validateAddFirestoreRecord: jest.fn(() => Promise.resolve()),
  update: jest.fn(() => Promise.resolve()),
  updateGoogleId: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve()),

  setAspectRatio: jest.fn(),
  setBase64String: jest.fn(),
  setImageSrcAttrs: jest.fn(),
  setFiles: jest.fn(),
};

(PhotoModel as any).mockReturnValue(photoModel);
(ReSizedPhoto as any).mockReturnValue(resizedPhoto);

console.error = jest.fn();
console.log = jest.fn();

let req: any = {
  file: { path: "path", filename: "filename" },
  body: { id: "id", userUid: "userUid" },
};
let res: any = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  end: jest.fn(),
};
let next: jest.Mock = jest.fn();

describe("PhotoCloudinaryController", () => {
  afterEach(() => {
    next.mockClear();

    (unlink as any).mockClear();

    (console.error as any).mockClear();

    (PhotoModel as any).mockClear();

    (ReSizedPhoto as any).mockClear();

    photoModel.delete.mockClear();
    photoModel.validateAddFirestoreRecord.mockClear();
    photoModel.validateEditFirestoreRecord.mockClear();

    photoModel.setAspectRatio.mockClear();
    photoModel.setBase64String.mockClear();
    photoModel.setImageSrcAttrs.mockClear();
    photoModel.setFiles.mockClear();
    photoModel.update.mockClear();

    resizedPhoto.cleanUpOnError.mockClear();
    resizedPhoto.removeUploadPhoto.mockClear();
    resizedPhoto.removeOptimizedPhoto.mockClear();
    resizedPhoto.make.mockClear();
    resizedPhoto.removeTempPhotoDiffWidthsFiles.mockClear();

    res.status.mockClear();
    res.json.mockClear();
    res.end.mockClear();
  });
  describe("addPhotoMiddleware", () => {
    describe("Request must have valid file field, and body field with id and userUid", () => {
      test("If no req.body - it means failed multer validateion", async () => {
        req = { file: { path: "path" } };

        await addPhotoMiddleware(req, res, next);

        // IT MUST NOT CREATE PhotoModel
        expect(PhotoModel).toHaveBeenCalledTimes(0);
        expect(ReSizedPhoto).toHaveBeenCalledTimes(0);

        // IT MUST DELETE FILE IF IT EXISTS ON REQUEST
        expect(unlink).toHaveBeenCalledTimes(1);
        //expect(unlink).toHaveBeenNthCalledWith(1, "path", "helo");

        // IT MUST LOG ERROR
        expect(console.error).toHaveBeenCalledTimes(1);

        expect(console.error).toHaveBeenNthCalledWith(
          1,
          "[ERROR ON ADD PHOTO]",
          "{}"
        );

        // IT MUST CALL NEXT
        expect(next).toHaveBeenCalledTimes(1);
      });

      test("If no req.file - we got no photo error", async () => {
        req = { body: { id: "id", userUid: "userUid" } };

        await addPhotoMiddleware(req, res, next);

        // IT MUST NOT CREATE PhotoModel
        expect(PhotoModel).toHaveBeenCalledTimes(0);
        expect(ReSizedPhoto).toHaveBeenCalledTimes(0);

        // IT MUST NOT CALL UNLINK CAUSE WE GOT NO FILE
        expect(unlink).toHaveBeenCalledTimes(0);
        //expect(unlink).toHaveBeenNthCalledWith(1, "path", "helo");

        // IT MUST LOG ERROR
        expect(console.error).toHaveBeenCalledTimes(1);

        expect(console.error).toHaveBeenNthCalledWith(
          1,
          "[ERROR ON ADD PHOTO]",
          "{}"
        );

        // IT MUST CALL NEXT
        expect(next).toHaveBeenCalledTimes(1);
      });

      test("We check if in firestore exists photo with req.body.id and its addedByUser equal req.body.userUid", async () => {
        req = {
          file: { path: "path", filename: "filename" },
          body: { id: "id", userUid: "userUid" },
        };

        photoModel.validateAddFirestoreRecord.mockImplementationOnce(() => {
          return new Promise((resolve, rej) => {
            throw new Error("What the...");
          });
        });

        /* resizedPhoto.make.mockImplementationOnce(() => {
          return new Promise((resolve, rej) => {
            throw new Error("What the...");
          });
        }); */

        await addPhotoMiddleware(req, res, next);

        expect(PhotoModel).toHaveBeenNthCalledWith(1, "db", "id", "userUid");

        expect(photoModel.validateAddFirestoreRecord).toHaveBeenCalledTimes(1);

        // WE DO NOT CREATE RESIZER
        expect(ReSizedPhoto).toHaveBeenCalledTimes(0);
        //expect(ReSizedPhoto).toHaveBeenNthCalledWith(1, "path", "filename");

        // WE DELETE FIRESTORE PHOTO RECORD
        expect(photoModel.delete).toHaveBeenCalledTimes(1);

        // WE CREATE RESIZER THAT'S WHY WE CALL resizedPhoto.cleanUpOnError
        //expect(resizedPhoto.cleanUpOnError).toHaveBeenCalledTimes(1);

        //  UNLINK UPLOAD PHOTO
        expect(unlink).toHaveBeenCalledTimes(1);

        // IT MUST LOG ERROR
        expect(console.error).toHaveBeenCalledTimes(1);

        expect(console.error).toHaveBeenNthCalledWith(
          1,
          "[ERROR ON ADD PHOTO]",
          "{}"
        );

        // IT MUST CALL NEXT
        expect(next).toHaveBeenCalledTimes(1);
      });
    });

    describe("Possible errors", () => {
      test("If error in photoResizer.make", async () => {
        req = {
          file: { path: "path", filename: "filename" },
          body: { id: "id", userUid: "userUid" },
        };

        resizedPhoto.make.mockImplementationOnce(() => {
          return new Promise((resolve, rej) => {
            throw new Error("What the...");
          });
        });

        await addPhotoMiddleware(req, res, next);

        expect(PhotoModel).toHaveBeenCalledTimes(1);
        expect(PhotoModel).toHaveBeenNthCalledWith(1, "db", "id", "userUid");

        expect(photoModel.validateAddFirestoreRecord).toHaveBeenCalledTimes(1);

        // WE CREATE RESIZER
        expect(ReSizedPhoto).toHaveBeenCalledTimes(1);
        expect(ReSizedPhoto).toHaveBeenNthCalledWith(1, "path", "filename");

        // WE CREATE RESIZER THAT'S WHY WE CALL resizedPhoto.cleanUpOnError
        expect(resizedPhoto.cleanUpOnError).toHaveBeenCalledTimes(1);

        // WE DO NOT CALL UNLINK CAUSE WE CALL CLEAN_UP_ON_ERROR
        expect(unlink).toHaveBeenCalledTimes(0);

        // WE DELETE FIRESTORE PHOTO RECORD
        expect(photoModel.delete).toHaveBeenCalledTimes(1);

        // IT MUST LOG ERROR
        expect(console.error).toHaveBeenCalledTimes(1);

        expect(console.error).toHaveBeenNthCalledWith(
          1,
          "[ERROR ON ADD PHOTO]",
          "{}"
        );

        // IT MUST CALL NEXT
        expect(next).toHaveBeenCalledTimes(1);
      });
      test("If error in photoModel.update", async () => {});
      test("If error in photoResizer.removeTempPhotoDiffWidthsFiles", async () => {});
    });

    describe("Success add photo", () => {
      test("", async () => {
        req = {
          file: { path: "path", filename: "filename" },
          body: { id: "id", userUid: "userUid" },
        };

        await addPhotoMiddleware(req, res, next);

        // CREATE PHOTO MODEL
        expect(PhotoModel).toHaveBeenCalledTimes(1);
        expect(PhotoModel).toHaveBeenNthCalledWith(1, "db", "id", "userUid");

        // VALIDATE PHOTO ID AND USER UID
        expect(photoModel.validateAddFirestoreRecord).toHaveBeenCalledTimes(1);

        // CREATE PHOTO RESIZER
        expect(ReSizedPhoto).toHaveBeenCalledTimes(1);
        expect(ReSizedPhoto).toHaveBeenNthCalledWith(1, "path", "filename");

        // CREATE RESIZED COPIES OF PHOTO
        expect(resizedPhoto.make).toHaveBeenCalledTimes(1);

        // SET ATTRIBUTES TO PHOTO MODEL
        expect(photoModel.setAspectRatio).toHaveBeenCalledTimes(1);
        expect(photoModel.setAspectRatio).toHaveBeenNthCalledWith(
          1,
          "aspectRatio"
        );

        expect(photoModel.setBase64String).toHaveBeenCalledTimes(1);
        expect(photoModel.setBase64String).toHaveBeenNthCalledWith(
          1,
          "base64String"
        );

        expect(photoModel.setImageSrcAttrs).toHaveBeenCalledTimes(1);
        expect(photoModel.setImageSrcAttrs).toHaveBeenNthCalledWith(
          1,
          "photoCloudinaryUrls"
        );

        expect(photoModel.setFiles).toHaveBeenCalledTimes(1);
        expect(photoModel.setFiles).toHaveBeenNthCalledWith(
          1,
          "photoCloudinaryIds"
        );

        // SAVE TO FIRESTORE
        expect(photoModel.update).toHaveBeenCalledTimes(1);

        // REMOVE PHOTO RESIZED COPIES
        expect(
          resizedPhoto.removeTempPhotoDiffWidthsFiles
        ).toHaveBeenCalledTimes(1);

        // SEND UPLOADED PHOTO TO GOOGLE DRIVE AND ADD GOOGLE DRIVE ID TO FIRESTORE
        // REMOVE UPLOAD PHOTO AND OPTIMIZED PHOTO
        expect(saveToGoogleDrive).toHaveBeenCalledTimes(1);
        expect(saveToGoogleDrive).toHaveBeenNthCalledWith(
          1,
          resizedPhoto,
          photoModel
        );

        // WE DO NOT CALL NEXT
        expect(next).toHaveBeenCalledTimes(0);

        // SEND SUCCESS RESPONSE
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenNthCalledWith(1, 200);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenNthCalledWith(1, {
          data: {},
          status: "success",
        });

        expect(res.end).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("editPhotoMiddleware", () => {
    describe("Request must have valid file field, and body field with id and userUid", () => {
      test("If no req.body - it means failed multer validateion", async () => {
        req = { file: { path: "path" } };

        await editPhotoMiddleware(req, res, next);

        // IT MUST NOT CREATE PhotoModel
        expect(PhotoModel).toHaveBeenCalledTimes(0);
        expect(ReSizedPhoto).toHaveBeenCalledTimes(0);

        // IT MUST DELETE FILE IF IT EXISTS ON REQUEST
        expect(unlink).toHaveBeenCalledTimes(1);
        //expect(unlink).toHaveBeenNthCalledWith(1, "path", "helo");

        // IT MUST LOG ERROR
        expect(console.error).toHaveBeenCalledTimes(1);

        expect(console.error).toHaveBeenNthCalledWith(
          1,
          "[ERROR ON EDIT PHOTO]",
          "{}"
        );

        // IT MUST CALL NEXT
        expect(next).toHaveBeenCalledTimes(1);
      });

      test("If no req.file - we got no photo error", async () => {
        req = { body: { id: "id", userUid: "userUid" } };

        await editPhotoMiddleware(req, res, next);

        // IT MUST NOT CREATE PhotoModel
        expect(PhotoModel).toHaveBeenCalledTimes(0);
        expect(ReSizedPhoto).toHaveBeenCalledTimes(0);

        // IT MUST NOT CALL UNLINK CAUSE WE GOT NO FILE
        expect(unlink).toHaveBeenCalledTimes(0);
        //expect(unlink).toHaveBeenNthCalledWith(1, "path", "helo");

        // IT MUST LOG ERROR
        expect(console.error).toHaveBeenCalledTimes(1);

        expect(console.error).toHaveBeenNthCalledWith(
          1,
          "[ERROR ON EDIT PHOTO]",
          "{}"
        );

        // IT MUST CALL NEXT
        expect(next).toHaveBeenCalledTimes(1);
      });

      test("We check if in firestore exists photo with req.body.id and its addedByUser equal req.body.userUid", async () => {
        req = {
          file: { path: "path", filename: "filename" },
          body: { id: "id", userUid: "userUid" },
        };

        photoModel.validateEditFirestoreRecord.mockImplementationOnce(() => {
          return new Promise((resolve, rej) => {
            throw new Error("What the...");
          });
        });

        await editPhotoMiddleware(req, res, next);

        expect(PhotoModel).toHaveBeenNthCalledWith(1, "db", "id", "userUid");

        expect(photoModel.validateEditFirestoreRecord).toHaveBeenCalledTimes(1);
        expect(photoModel.validateAddFirestoreRecord).toHaveBeenCalledTimes(0);

        // WE DO NOT CREATE RESIZER
        expect(ReSizedPhoto).toHaveBeenCalledTimes(0);

        // WE DO NOT DELETE FIRESTORE PHOTO RECORD

        //  UNLINK UPLOAD PHOTO
        expect(unlink).toHaveBeenCalledTimes(1);

        // IT MUST LOG ERROR
        expect(console.error).toHaveBeenCalledTimes(1);

        expect(console.error).toHaveBeenNthCalledWith(
          1,
          "[ERROR ON EDIT PHOTO]",
          "{}"
        );

        // IT MUST CALL NEXT
        expect(next).toHaveBeenCalledTimes(1);
      });
    });

    describe("Possible errors", () => {
      test("If error in photoResizer.make", async () => {
        req = {
          file: { path: "path", filename: "filename" },
          body: { id: "id", userUid: "userUid" },
        };

        resizedPhoto.make.mockImplementationOnce(() => {
          return new Promise((resolve, rej) => {
            throw new Error("What the...");
          });
        });

        await editPhotoMiddleware(req, res, next);

        expect(PhotoModel).toHaveBeenCalledTimes(1);
        expect(PhotoModel).toHaveBeenNthCalledWith(1, "db", "id", "userUid");

        expect(photoModel.validateEditFirestoreRecord).toHaveBeenCalledTimes(1);

        // WE CREATE RESIZER
        expect(ReSizedPhoto).toHaveBeenCalledTimes(1);
        expect(ReSizedPhoto).toHaveBeenNthCalledWith(1, "path", "filename");

        // WE CREATE RESIZER THAT'S WHY WE CALL resizedPhoto.cleanUpOnError
        expect(resizedPhoto.cleanUpOnError).toHaveBeenCalledTimes(1);

        // WE DO NOT CALL UNLINK CAUSE WE CALL CLEAN_UP_ON_ERROR
        expect(unlink).toHaveBeenCalledTimes(0);

        // WE DO NOT DELETE FIRESTORE PHOTO RECORD

        // IT MUST LOG ERROR
        expect(console.error).toHaveBeenCalledTimes(1);

        expect(console.error).toHaveBeenNthCalledWith(
          1,
          "[ERROR ON EDIT PHOTO]",
          "{}"
        );

        // IT MUST CALL NEXT
        expect(next).toHaveBeenCalledTimes(1);
      });
      test("If error in photoModel.update", async () => {});
      test("If error in photoResizer.removeTempPhotoDiffWidthsFiles", async () => {});
    });

    describe("Success edit photo", () => {
      test("", async () => {
        req = {
          file: { path: "path", filename: "filename" },
          body: { id: "id", userUid: "userUid" },
        };

        await editPhotoMiddleware(req, res, next);

        // CREATE PHOTO MODEL
        expect(PhotoModel).toHaveBeenCalledTimes(1);
        expect(PhotoModel).toHaveBeenNthCalledWith(1, "db", "id", "userUid");

        // VALIDATE PHOTO ID AND USER UID
        expect(photoModel.validateEditFirestoreRecord).toHaveBeenCalledTimes(1);

        // CREATE PHOTO RESIZER
        expect(ReSizedPhoto).toHaveBeenCalledTimes(1);
        expect(ReSizedPhoto).toHaveBeenNthCalledWith(1, "path", "filename");

        // CREATE RESIZED COPIES OF PHOTO
        expect(resizedPhoto.make).toHaveBeenCalledTimes(1);

        // SET ATTRIBUTES TO PHOTO MODEL
        expect(photoModel.setAspectRatio).toHaveBeenCalledTimes(1);
        expect(photoModel.setAspectRatio).toHaveBeenNthCalledWith(
          1,
          "aspectRatio"
        );

        expect(photoModel.setBase64String).toHaveBeenCalledTimes(1);
        expect(photoModel.setBase64String).toHaveBeenNthCalledWith(
          1,
          "base64String"
        );

        expect(photoModel.setImageSrcAttrs).toHaveBeenCalledTimes(1);
        expect(photoModel.setImageSrcAttrs).toHaveBeenNthCalledWith(
          1,
          "photoCloudinaryUrls"
        );

        expect(photoModel.setFiles).toHaveBeenCalledTimes(1);
        expect(photoModel.setFiles).toHaveBeenNthCalledWith(
          1,
          "photoCloudinaryIds"
        );

        // SAVE TO FIRESTORE
        expect(photoModel.update).toHaveBeenCalledTimes(1);

        // REMOVE PHOTO RESIZED COPIES
        expect(
          resizedPhoto.removeTempPhotoDiffWidthsFiles
        ).toHaveBeenCalledTimes(1);

        // REMOVE PREVIOUS PHOTOS FROM CLOUDINARY
        //(photoModel.prevPhoto.files)
        //photoCloudinaryIds
        expect(resizedPhoto.removeCloudinaryFiles).toHaveBeenCalledTimes(1);
        expect(resizedPhoto.removeCloudinaryFiles).toHaveBeenNthCalledWith(
          1,
          "files_photoCloudinaryIds"
        );

        // UPDATE PHOTO ON GOOGLE DRIVE AND REMOVE UPLOAD PHOTO AND OPTIMIZED PHOTO
        expect(updateGoogleDriveFile).toHaveBeenCalledTimes(1);
        expect(updateGoogleDriveFile).toHaveBeenNthCalledWith(
          1,
          resizedPhoto,
          "googleDriveId"
        );

        // WE DO NOT CALL NEXT
        expect(next).toHaveBeenCalledTimes(0);

        // SEND SUCCESS RESPONSE
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenNthCalledWith(1, 200);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenNthCalledWith(1, {
          data: {},
          status: "success",
        });

        expect(res.end).toHaveBeenCalledTimes(1);
      });
    });
  });
});
