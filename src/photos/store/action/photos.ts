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

export const addPhotoStartRequestAC = (): IPhotosAction => {
  return {
    type: "ADD_PHOTO_START_REQUEST",
  };
};

export const addPhotoAnotherFormAC = (): IPhotosAction => {
  return {
    type: "ADD_PHOTO_ANOTHER_FORM",
  };
};

export const addPhotoRequestSuccessAC = (): IPhotosAction => {
  return {
    type: "ADD_PHOTO_REQUEST_SUCCESS",
  };
};

export const addPhotoRequestErrorAC = (): IPhotosAction => {
  return {
    type: "ADD_PHOTO_REQUEST_ERROR",
  };
};

export const editPhotoStartRequestAC = (): IPhotosAction => {
  return {
    type: "EDIT_PHOTO_START_REQUEST",
  };
};

export const editPhotoAnotherFormAC = (): IPhotosAction => {
  return {
    type: "EDIT_PHOTO_ANOTHER_FORM",
  };
};

export const editPhotoRequestSuccessAC = (
  photoId?: string,
  isLastEditPhotoReq?: boolean
): IPhotosAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_SUCCESS",
    photoId,
    isLastEditPhotoReq,
  };
};

export const editPhotoRequestErrorAC = (): IPhotosAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_ERROR",
  };
};

export const editPhotoAC = (photo: TPhotoData): IPhotosAction => {
  return {
    type: "EDIT_PHOTO",
    photo,
  };
};

export const addPhotoAC = (photo: TPhotoData): IPhotosAction => {
  return {
    type: "ADD_PHOTO",
    photo,
  };
};

export const deletePhotoAC = (photoId: string): IPhotosAction => {
  return {
    type: "DELETE_PHOTO",
    photoId,
  };
};
