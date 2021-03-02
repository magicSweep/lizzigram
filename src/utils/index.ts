export { deleteFile, writeFile, readFile } from "./fs";

export const getFileNameWithoutExtension = (filename: string) => {
  const parts = filename.split(".");

  if (parts.length === 1) return filename;

  if (parts.length === 2) return parts[0];

  if (parts.length > 2) {
    parts.pop();
    const res = parts.filter((val) => {
      //@ts-ignore
      return val != false;
    });

    //console.log(JSON.stringify(res));
    return res.join(".");
  }
};

export const isValidPhotoId = (photoId: string) => {
  const res = photoId.match(/[a-zA-Z0-9_-]*/);

  return res[0] === photoId;
};
