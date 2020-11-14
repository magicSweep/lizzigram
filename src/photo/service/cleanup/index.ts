export {
  removeTempPhotoDiffWidthsFiles,
  removeUploadPhoto,
} from "./removePhotos.service";

import { TCloudinaryId, TPath } from "../../../types";
import {
  removePhotoDiffWidthsCloudinaryFiles,
  removeTempPhotoDiffWidthsFiles,
  removeUploadPhoto,
} from "./removePhotos.service";

export const cleanUpOnError = (
  uploadPhotoPath: TPath,
  photoCloudinaryFiles: TCloudinaryId[],
  photoTempFiles: TPath[]
) => {
  removeUploadPhoto(uploadPhotoPath).catch((err) => {
    console.error(
      `Can't delete upload photo file - ${uploadPhotoPath} | ${err.message}`
    );
  });

  if (photoTempFiles) {
    removeTempPhotoDiffWidthsFiles(photoTempFiles).catch((err: Error) =>
      console.error(`Error on delete temp photos diff widths`, err)
    );
  }

  if (photoCloudinaryFiles) {
    removePhotoDiffWidthsCloudinaryFiles(photoCloudinaryFiles).catch((err) => {
      console.error(
        `Can't delete cloudinary photo file - ${photoCloudinaryFiles} | ${err.message}`
      );
    });
  }
};
