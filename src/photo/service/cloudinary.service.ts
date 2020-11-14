import { UploadApiResponse } from "cloudinary";
import { TWidth, TCloudinaryId, TCloudinarySecureUrl } from "../../types";

export const getCloudinaryPhotosDiffWidthsInfo = (
  cloudinaryInfoPhotosDiffWidths: Map<number, UploadApiResponse>
) => {
  const cloudinaryIdsPhotosDiffWidths = new Map<TWidth, TCloudinaryId>();
  const cloudinaryUrlsPhotosDiffWidths = new Map<
    TWidth,
    TCloudinarySecureUrl
  >();

  for (let [width, photoInfo] of cloudinaryInfoPhotosDiffWidths) {
    cloudinaryIdsPhotosDiffWidths.set(width, photoInfo.public_id);
    cloudinaryUrlsPhotosDiffWidths.set(width, photoInfo.secure_url);
  }

  return { cloudinaryIdsPhotosDiffWidths, cloudinaryUrlsPhotosDiffWidths };
};
