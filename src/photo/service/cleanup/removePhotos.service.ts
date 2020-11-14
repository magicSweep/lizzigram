import { existsSync, unlink } from "fs";
import { promisify } from "util";
import { TCloudinaryId, TPath } from "../../../types";
import { deleteImage } from "../../../cloudinary";

export const removeUploadPhoto = async (pathToUploadPhotoFile: TPath) => {
  if (existsSync(pathToUploadPhotoFile)) {
    return promisify(unlink)(pathToUploadPhotoFile);
  }
};

export const removeTempPhotoDiffWidthsFiles = async (files: TPath[]) => {
  const promises: Promise<any>[] = [];
  for (let file of files) {
    if (existsSync(file)) {
      promises.push(promisify(unlink)(file));
      /* fs.unlink(file, (err) => {
            if (err)
              console.log(
                `Can't delete photo file - ${file} | ${err.message}`
              );
          }); */
    }
  }

  return Promise.all(promises);
};

export const removePhotoDiffWidthsCloudinaryFiles = async (
  photoCloudinaryIds: TCloudinaryId[]
) => {
  const promises: Promise<any>[] = [];
  for (let photoCloudinaryId of photoCloudinaryIds) {
    promises.push(deleteImage(photoCloudinaryId));
  }

  return Promise.all(promises);
};
