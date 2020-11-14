import { IFirebasePhoto } from "./../../types";

export const getPhotoFromFirebase = async (id: string) => {
  return Promise.resolve({
    _timestamp: Date.now(),
    description: "Hello leninists and others...",
    date: new Date(2020, 7, 8),
    yearsOld: 2,
    tags: {
      "123erw342rse": true,
      "234lkj234lkl": true,
    },
    isActive: false,

    addedByUserUID: "someuserUID",
  });
};

export const updatePhotoFirestore = async (
  photoId: string,
  photo: IFirebasePhoto
) => {
  return Promise.resolve({
    _timestamp: Date.now(),
    description: "Hello leninists and others...",
    date: new Date(2020, 7, 8),
    yearsOld: 2,
    tags: {
      "123erw342rse": true,
      "234lkj234lkl": true,
    },
    isActive: false,

    addedByUserUID: "someuserUID",
  });
};

export const updateGoogleIdFirestore = async (
  photoId: string,
  googleDriveId: string
) => {
  return Promise.resolve({
    googleDriveId,
  });
};
