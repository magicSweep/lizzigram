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
import { fileFilter, fileName, multerLimits, addPhoto } from "./photo";
import { IErrorResponse } from "./types";

const dev = process.env.NODE_ENV !== "production";

const uploadPhotosDir = resolve(rootPath, "uploads");

export const init = async () => {
  dotenv.config({ path: resolve(rootPath, ".env") });

  const formHtml = await promisify(readFile)(
    resolve(rootPath, "src/test/uploadForm.html")
  );

  // MULTER
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPhotosDir);
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

  // MAIN MIDDLEWARE
  app.post("/add-photo", upload.single("file"), addPhoto);

  // FOR TEST
  app.get("/", (req, res) => {
    return res.status(200).end(formHtml);
  });

  // GLOBAL_ERROR_HANDLER
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`[GLOBAL_ERROR_HANDLER] ${err.message}`);

    const message = dev ? err.message || JSON.stringify(err) : "Server error";

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
