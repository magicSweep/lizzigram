export const getPhotoIdAndExtension = (name: string) => {
  const result = name.split(".");

  let photoId = "";
  let ext = "";

  if (result.length === 1) {
    photoId = name;
  } else if (result.length === 2) {
    [photoId, ext] = result;
  } else {
    throw new Error(`Bad photo name | ${name}`);
  }

  return {
    photoId,
    ext,
  };
};

export const isValidPhotoId = (photoId: string) => {
  const res = photoId.match(/[a-zA-Z0-9_.-]*/);

  return res[0] === photoId;
};
