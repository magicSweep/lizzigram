//make image srcset string
export const makeImageSrcSetAttr = (
  pathToPhotosByWidths: Map<number, string>
) => {
  let result = "";

  //"/images/girl_300.jpeg 300w, /images/girl_600.jpeg 600w"

  //@ts-ignore
  for (let entry of pathToPhotosByWidths) {
    result += `${entry[1]} ${entry[0]}w, `;
  }

  result = result.slice(0, -2);

  return result;
};

//make image sizes string
export const makeImageSizesAttr = (aspectRatio: number) => {
  //""

  let ratio = Math.round(aspectRatio * 100);

  return `(max-aspect-ratio: ${ratio}/100) 99vw, ${ratio}vh`;
};

/* export const setPropertiesToUpdate = (photoInput: IEditPhotoInput) => {
  const propertiesToUpdate: any = {};

  if (photoInput.file) propertiesToUpdate._timestamp = Date.now();
  if (photoInput.date) propertiesToUpdate.date = photoInput.date;
  if (photoInput.desc) propertiesToUpdate.desc = photoInput.desc;
  if (photoInput.tags) propertiesToUpdate.tags = photoInput.tags;

  return propertiesToUpdate;
}; */
