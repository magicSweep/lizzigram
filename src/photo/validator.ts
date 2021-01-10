const acceptableMimetypes = [
  "image/webp",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/tiff",
];

export const isValidFile = (file: Express.Multer.File) => {
  if (!file) return false;

  //check mime type
  if (!acceptableMimetypes.includes(file.mimetype)) {
    console.error("BAD PHOTO FILE MIMETYPE", file.mimetype);
    return false;
  }

  return true;
};

export const isValidUserUid = (userUid: string) => {
  if (!userUid) return false;

  return true;
};

export const isValidID = (id: string) => {
  if (!id) return false;

  if (id.length !== 13) return false;

  if (parseInt(id).toString().length !== 13) return false;

  return true;
};
