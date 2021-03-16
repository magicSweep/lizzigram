export const iphoto = {
  date: "Super date",
  tags: { er3: true, r34: true },
  yearsOld: 2,
  description: "hello desc",
  base64: "",
  files: [],
  aspectRatio: 0,
  srcSet: "",
  iconSrc: "",
  src: "",
  _timestamp: 12333,
  googleDriveId: "",
  addedByUserUID: "userUid123",
  isActive: false,
  imageExtention: "jpeg",
};

export const returnDataByMakePhotoFormData = new FormData();
returnDataByMakePhotoFormData.append("id", "id");
returnDataByMakePhotoFormData.append("userUid", "userUid");
returnDataByMakePhotoFormData.append("file", "file");

export const createPhotoFirestoreData: TCreatePhotoFirestoreData = {
  photoId: "photoId",
  userUid: "userUid123",
  photoFormData: {
    desc: "hello desc",
    date: "2020-05-05",
    photoFile: {} as any,
    tags: {
      h12: false,
      er3: true,
      "22w": false,
      r34: true,
    },
  },
};
