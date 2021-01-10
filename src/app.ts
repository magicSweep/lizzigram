import express, {
  Request,
  Response,
  //urlencoded,
  json,
  NextFunction,
} from "express";
//import path from "path";
import dotenv from "dotenv";
import { resolve } from "path";
import { path as rootPath } from "app-root-path";
//import cookieParser from "cookie-parser";
//import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { readFile } from "fs";
import { promisify } from "util";
import {
  fileFilter,
  fileName,
  multerLimits,
  addPhotoMiddleware,
  editPhotoMiddleware,
} from "./photo";
import { IErrorResponse } from "./types";
import { pathToUploadFilesDir } from "./config";

const dev = process.env.NODE_ENV !== "production";

console.log("IS DEV", dev);

export const init = async () => {
  dotenv.config({ path: resolve(rootPath, ".env") });

  const formHtml = await promisify(readFile)(
    resolve(rootPath, "src/example/uploadForm.html")
  );

  // MULTER
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, pathToUploadFilesDir);
    },
    filename: fileName,
  });

  const upload = multer({
    storage,
    limits: multerLimits,
    fileFilter,
  });

  // CLOUDINARY CONFIG
  /* cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    }); */

  // FIRESTORE CONFIG

  // GOOGLE DRIVE CONFIG

  const app = express();

  app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", "*");
    //res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    //res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  // TEST MIDDLEWARE
  app.post("/is-photo", upload.single("file"), (req, res) => {
    res.status(200).json({
      status: "ok",
      data: {
        file: req.file ? req.file.filename : "No file",
        id: req.body ? req.body.id : "NO id",
        uid: req.body ? req.body.uid : "NO uid",
      },
    });
  });

  // MAIN MIDDLEWARE
  app.post("/add-photo", upload.single("file"), addPhotoMiddleware);

  app.post("/edit-photo", upload.single("file"), editPhotoMiddleware);

  // FOR TEST
  app.get("/", (req, res) => {
    return res.status(200).end(formHtml);
  });

  // GLOBAL_ERROR_HANDLER
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    let message = "";

    if (dev) {
      if (err.message) {
        message = `
          MESSAGE - ${err.message} 
          NAME - ${err.name}
          FILENAME - ${(err as any).filename}
          LINENUMBER - ${(err as any).lineNumber}
          STACK - ${err.stack}
        `;
      } else {
        message = JSON.stringify(err);
      }

      message = `
        REQUEST_PATH - ${req.path}
        REQUEST_BODY - ${req.body ? JSON.stringify(req.body) : "NO BODY"}
        ${message}
      `;
    } else {
      message = "Server error";
    }

    console.log(`[GLOBAL_ERROR_HANDLER] ${message}`);

    const json: IErrorResponse = {
      status: "error",
      data: {
        error: message,
      },
    };

    res.status(200).json(json).end();
  });

  return app;
};
