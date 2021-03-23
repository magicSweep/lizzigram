//import { IPhotosAction, TPhotosData } from "../../types";
//import { TPhotoData } from "../../types";

export const allPhotosStartNewRequestAC = (): IPhotosAction => {
  return {
    type: "ALL_PHOTOS_START_NEW_REQUEST",
  };
};

export const allPhotosStartMoreRequestAC = (): IPhotosAction => {
  return {
    type: "ALL_PHOTOS_START_MORE_REQUEST",
  };
};

export const allPhotosRequestSuccessAC = (
  data: TGetPhotosData
): IPhotosAction => {
  return {
    type: "ALL_PHOTOS_REQUEST_SUCCESS",
    photos: data.photos,
    nextPageDocRef: data.nextPageDocRef,
    hasNextPage: data.hasNextPage,
  };
};

export const fetchMorePhotosRequestSuccessAC = (
  data: TGetPhotosData
): IPhotosAction => {
  return {
    type: "FETCH_MORE_PHOTO_REQUEST_SUCCESS",
    photos: data.photos,
    nextPageDocRef: data.nextPageDocRef,
    hasNextPage: data.hasNextPage,
  };
};

export const allPhotosRequestErrorAC = (): IPhotosAction => {
  return {
    type: "ALL_PHOTOS_REQUEST_ERROR",
  };
};

export const addPhotoStartRequestAC = (
  reqId: ID,
  photoReq: IPhotoReq
): IPhotosAction => {
  return {
    type: "ADD_PHOTO_START_REQUEST",
    reqId,
    photoReq,
  };
};

export const addPhotoAnotherFormAC = (): IPhotosAction => {
  return {
    type: "ADD_PHOTO_ANOTHER_FORM",
  };
};

export const addPhotoRequestSuccessAC = (
  isLastAddPhotoReq: boolean,
  reqId: ID
): IPhotosAction => {
  return {
    type: "ADD_PHOTO_REQUEST_SUCCESS",
    isLastAddPhotoReq,
    reqId,
  };
};

export const addPhotoRequestErrorAC = (
  isLastAddPhotoReq: boolean,
  reqId: ID
): IPhotosAction => {
  return {
    type: "ADD_PHOTO_REQUEST_ERROR",
    isLastAddPhotoReq,
    reqId,
  };
};

export const editPhotoStartRequestAC = (
  reqId: ID,
  photoReq: IPhotoReq
): IPhotosAction => {
  return {
    type: "EDIT_PHOTO_START_REQUEST",
    reqId,
    photoReq,
  };
};

export const editPhotoAnotherFormAC = (): IPhotosAction => {
  return {
    type: "EDIT_PHOTO_ANOTHER_FORM",
  };
};

export const editPhotoRequestSuccessAC = (
  isLastEditPhotoReq: boolean,
  reqId: ID,
  photoId?: string
): IPhotosAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_SUCCESS",
    photoId,
    isLastEditPhotoReq,
    reqId,
  };
};

export const editPhotoRequestErrorAC = (
  isLastEditPhotoReq: boolean,
  reqId: ID
): IPhotosAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_ERROR",
    isLastEditPhotoReq,
    reqId,
  };
};

//editPhotoAC
export const getEditedPhotoSuccessAC = (
  photo: TPhotoData,
  reqId: ID
): IPhotosAction => {
  return {
    type: "GET_EDITED_PHOTO_SUCCESS",
    photo,
    reqId,
  };
};

export const getEditedPhotoErrorAC = (reqId: ID): IPhotosAction => {
  return {
    type: "GET_EDITED_PHOTO_ERROR",
    reqId,
  };
};

//addPhotoAC
export const getAddedPhotoSuccessAC = (
  photo: TPhotoData,
  reqId: ID
): IPhotosAction => {
  return {
    type: "GET_ADDED_PHOTO_SUCCESS",
    photo,
    reqId,
  };
};

export const getAddedPhotoErrorAC = (reqId: ID): IPhotosAction => {
  return {
    type: "GET_ADDED_PHOTO_ERROR",
    reqId,
  };
};

//REMOVE_PHOTO_REQUEST_INFO
/* export const removePhotoReqAC = (photoId: string): IPhotosAction => {
  return {
    type: "REMOVE_PHOTO_REQUEST_INFO",
    reqId: photoId,
  };
}; */

export const deletePhotoAC = (photoId: string): IPhotosAction => {
  return {
    type: "DELETE_PHOTO",
    photoId,
  };
};
