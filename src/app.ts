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
//import { readFile } from "fs";
//import { promisify } from "util";
import {
  fileFilter,
  fileName,
  multerLimits,
  addPhotoMiddleware,
  editPhotoMiddleware,
} from "./photo";
//import { IErrorResponse } from "./types";
import {
  pathToUploadFilesDir,
  pathToTempDiffWidthsPhotos,
  addPhotoUrl,
  editPhotoUrl,
  herokuPingUrl,
  downloadPhotoUrl,
} from "./config";
import { mainLog } from "./middleware/logger";
import { downloadOriginalPhoto } from "./middleware/downloadOriginalPhoto";
import { existsSync, mkdirSync } from "fs";

// PROTECT
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const dev = process.env.NODE_ENV !== "production";

export const init = async () => {
  // MAKE UPLOADS AND TEMP DIRS
  if (!existsSync(pathToUploadFilesDir)) {
    mkdirSync(pathToUploadFilesDir);
  }

  if (!existsSync(pathToTempDiffWidthsPhotos)) {
    mkdirSync(pathToTempDiffWidthsPhotos);
  }

  console.group("INIT");
  console.log("is dev", dev);
  console.log("rootPath", rootPath);
  console.log("pathToUploadFilesDir", pathToUploadFilesDir);
  console.log(
    "is exists pathToUploadFilesDir",
    existsSync(pathToUploadFilesDir)
  );
  console.groupEnd();

  // SET ENV VARIABLES
  if (process.env.IENV === "local")
    dotenv.config({ path: resolve(rootPath, ".env") });

  /* const formHtml = await promisify(readFile)(
    resolve(rootPath, "src/example/uploadForm.html")
  ); */

  // MULTER
  const storage = multer.diskStorage({
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

  // SECURITY TODO:
  // https://www.npmjs.com/package/helmet
  // https://www.npmjs.com/package/csurf
  // https://www.npmjs.com/package/express-rate-limit
  // https://github.com/expressjs/cors

  // LOGGER
  app.use(mainLog);

  // PROTECT

  // HELMET
  app.use(helmet());

  // CORS
  app.use(
    cors({
      origin: [
        "http://192.168.1.82:8080",
        "http://127.0.0.1:8080",
        "http://localhost:8080",
        "https://lizzygram.netlify.app",
      ],
      methods: "POST,OPTIONS",
    })
  );

  // RATE LIMIT
  const apiLimiter = rateLimit({
    windowMs: 1000 * 60 * 5, // 5 minutes
    max: 10,
    message: "Some error, please try again later.",
  });
  /* app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 30 // limit each IP to 100 requests per windowMs
  })); */

  /* app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", "*");
    //res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    //res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
  }); */

  // TEST MIDDLEWARE
  /* app.post("/is-photo", upload.single("file"), (req, res) => {
    res.status(200).json({
      status: "ok",
      data: {
        file: req.file ? req.file.filename : "No file",
        id: req.body ? req.body.id : "NO id",
        uid: req.body ? req.body.uid : "NO uid",
      },
    });
  }); */

  //TEST DOWNLOAD PHOTO
  /* app.get("/get-photo", (req, res, next) => {
    res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hello friends</title>
      </head>
      <body>
        <div>
          <img width="600" src="/freestocks-9U.jpg" alt="" />
        </div>
        <!--a href="/download/freestocks-9U.jpg">Download image</a-->
        <a href="/download/1J4yFOQMprUYK_lMmbz5NO_eSAGGmrcou" download="lizzy-photo.jpeg">Download image</a>
      </body>
    </html>
    
    `);
  }); */

  // DOWNLOAD ORIGINAL PHOTO
  app.get(downloadPhotoUrl, downloadOriginalPhoto);

  //PING TO HEROKU - DON'T SLEEP
  app.get(herokuPingUrl, (req, res, next) => {
    const date = new Date();
    console.log(`PING AT - ${date.toUTCString()}`);
    res.status(200).send("Not Authorized...");
  });

  // MAIN MIDDLEWARE
  app.post(addPhotoUrl, apiLimiter, upload.single("file"), addPhotoMiddleware);

  app.post(
    editPhotoUrl,
    apiLimiter,
    upload.single("file"),
    editPhotoMiddleware
  );

  // FOR TEST
  /* app.get("/", (req, res) => {
    return res.status(200).end(formHtml);
  }); */

  // GLOBAL_ERROR_HANDLER
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    let message = "";

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
