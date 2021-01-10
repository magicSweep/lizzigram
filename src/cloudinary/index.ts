//const cloudinary = require("cloudinary").v2;
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { join } from "path";
import dotenv from "dotenv";
import { path as rootPath } from "app-root-path";

dotenv.config({ path: join(rootPath, ".env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteFile = (publicId: string) => {
  return cloudinary.uploader.destroy(publicId);
};

export const uploadFile = (
  pathToUploadFile: string,
  tags: string = "lizzygram"
) => {
  return cloudinary.uploader.upload(pathToUploadFile, {
    tags,
  });
};

export const getAllFiles = () => {
  return cloudinary.api.resources({
    type: "upload",
    max_results: 10,
  });
};
