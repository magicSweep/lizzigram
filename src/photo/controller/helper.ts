import PhotoModel from "../entity/PhotoModel";
import ReSizedPhoto from "./../helper/ReSizedPhoto";

export const updateGoogleDriveFile = (
  photoResizer: ReSizedPhoto,
  googleDriveId: string
) => {
  photoResizer
    .updateGoogleDriveFile(googleDriveId)
    .then((res) => {
      // REMOVE UPLOAD PHOTO
      photoResizer.removeUploadPhoto();

      // REMOVE OPTIMIZED PHOTO
      photoResizer.removeOptimizedPhoto();
    })
    .catch((err: Error) =>
      console.error(`Error on save photo to google drive`, err)
    );
};

export const saveToGoogleDrive = (
  photoResizer: ReSizedPhoto,
  photoModel: PhotoModel
) => {
  photoResizer
    .saveToGoogleDrive()
    .then((res) => {
      // ADD GOOGLE DRIVE ID TO FIRESTORE
      photoModel
        .updateGoogleId(res.data.id)
        .catch((err) => console.error("ERROR SET GOOGLE DRIVE PHOTO ID ", err));

      // REMOVE UPLOAD PHOTO
      photoResizer.removeUploadPhoto();

      // REMOVE OPTIMIZED PHOTO
      photoResizer.removeOptimizedPhoto();
    })
    .catch((err: Error) =>
      console.error(`Error on save photo to google drive`, err)
    );
};
