import { Request, Response, NextFunction } from "express";
import { isValidPhotoId } from "./helper";
import { googleDrive } from "./../googleDrive";
//import { resolve } from "path";
//import { createReadStream } from "fs";
import { getPhotoIdAndExtension } from "./helper";

/* export const downloadOriginalPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const photoId = req.params.photoId;

  //if (photoId.length > 62 || !isValidPhotoId(photoId)) res.end("Bad blood");

  //const data = await googleDrive.downloadImageStream(photoId);

  const path = resolve(
    process.cwd(),
    "src",
    "sharp",
    "images",
    "girl_600.jpeg"
  );

  console.log("IMAGE PATH", path);

  const data = createReadStream(path);

  res.type("application/octet-stream");
  res.setHeader("Transfer-Encoding", "chunked");

  data
    .on("data", (data) => {
      res.write(data);
    })
    .on("error", (err) => {
      //console.error("Error downloading file from Google drive.");
      res.end();
    })
    .on("end", () => {
      //console.log("Done downloading file from Google drive.");
      res.end();
    });
}; */

export const downloadOriginalPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const photoName = req.params.photoId;

  if (!isValidPhotoId(photoName)) res.end("Bad blood");

  const { photoId, ext } = getPhotoIdAndExtension(photoName);

  const data = await googleDrive.downloadImageStream(photoId);

  res.type("application/octet-stream");
  res.setHeader("Transfer-Encoding", "chunked");

  data
    .on("data", (data) => {
      res.write(data);
    })
    .on("error", (err) => {
      //console.error("Error downloading file from Google drive.");
      res.end();
    })
    .on("end", () => {
      //console.log("Done downloading file from Google drive.");
      res.end();
    });
};
