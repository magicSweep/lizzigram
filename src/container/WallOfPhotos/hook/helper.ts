export const getPhotoIndex = (eventTarget: EventTarget) => {
  //console.log("getPhotoIndex", eventTarget);
  const indexValue = (eventTarget as HTMLElement).dataset.index;
  const index = indexValue ? parseInt(indexValue) : -1;
  if (index === -1) throw new Error(`Bad bad image index === ${index}`);

  return index;
};

export const getPhotoByIndex = (
  photos: TPhotosData | undefined,
  index: number
): TPhotoData => {
  if (photos === undefined) throw new Error("No photos");

  const entries = [...photos.entries()];

  return {
    id: entries[index][0],
    photo: entries[index][1],
  };
};
