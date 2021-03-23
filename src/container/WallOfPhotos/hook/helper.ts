import { isEditedReq } from "../../../photos/container/PhotoSlider/helper";

export const makeAddEditPhotoReqInfo = (requests: TPhotoReqs) => {
  const res: any = {
    editedPhotoIds: [],
    numberOfAddedPhotos: 0,
  };

  if (requests.size === 0) return res;

  requests.forEach((photoReq, reqId) => {
    if (isEditedReq(photoReq)) {
      res.editedPhotoIds.push(reqId);
    }

    if (photoReq.type === "add" && photoReq.status.stage !== "done") {
      res.numberOfAddedPhotos++;
    }
  });

  //console.log("MAKE EDITED PHOTO IDS", editedPhotoIds);

  return res;
};

export const calcNumberOfAddedPhotos = (requests: TPhotoReqs) => {
  let numberOfAddedPhotos: number = 0;

  if (requests.size === 0) return [];

  requests.forEach((photoReq, reqId) => {
    if (photoReq.type === "add" && photoReq.status.stage !== "done") {
      numberOfAddedPhotos++;
    }
  });

  //console.log("MAKE EDITED PHOTO IDS", editedPhotoIds);

  return numberOfAddedPhotos;
};

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
