import { Request, Response, NextFunction } from "express";
import { isValidPhotoId } from "../utils";
import { googleDrive } from "./../googleDrive";

export const downloadOriginalPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const photoId = req.params.photoId;

  if (photoId.length > 62 || !isValidPhotoId(photoId)) res.end("Bad blood");

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
