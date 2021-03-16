import { Reducer } from "redux";
//import { IPhotosState, IPhotosAction } from "../../types";
//import { IPhoto } from "../../../types";

import { onFetchMorePhotosRequestSuccess } from "./helper";

const photosInitialState: IPhotosState = {
  nextPageDocRef: undefined,
  hasNextPage: false,
  photos: undefined,
  loading: false,
  error: false,
  addLoading: false,
  addError: false,
  addAnotherForm: false,
  editLoading: false,
  editError: false,
  editAnotherForm: false,
};

const reducer: Reducer<IPhotosState, IPhotosAction> = (
  state = photosInitialState,
  action: IPhotosAction
) => {
  switch (action.type) {
    case "ALL_PHOTOS_START_NEW_REQUEST":
      return {
        ...state,
        photos: undefined,
        loading: true,
        error: false,
      };
    case "ALL_PHOTOS_START_MORE_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "ALL_PHOTOS_REQUEST_SUCCESS":
      return {
        ...state,
        photos: action.photos,
        loading: false,
        error: false,
        nextPageDocRef: action.nextPageDocRef,
        hasNextPage: action.hasNextPage as boolean,
      };

    case "FETCH_MORE_PHOTO_REQUEST_SUCCESS":
      return onFetchMorePhotosRequestSuccess(state, action);

    case "ALL_PHOTOS_REQUEST_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };

    case "ADD_PHOTO_START_REQUEST":
      return {
        ...state,
        addLoading: true,
        addAnotherForm: false,
        addError: false,
      };

    case "ADD_PHOTO_ANOTHER_FORM":
      return {
        ...state,
        addLoading: false,
        addAnotherForm: true,
      };
    case "ADD_PHOTO_REQUEST_SUCCESS":
      return {
        ...state,
        addLoading: false,
        addError: false,
      };
    case "ADD_PHOTO_REQUEST_ERROR":
      return {
        ...state,
        addLoading: false,
        addError: true,
      };

    case "EDIT_PHOTO_START_REQUEST":
      return {
        ...state,
        editLoading: true,
        editAnotherForm: false,
        editError: false,
      };
    case "EDIT_PHOTO_ANOTHER_FORM":
      return {
        ...state,
        editLoading: false,
        editAnotherForm: true,
      };
    case "EDIT_PHOTO_REQUEST_SUCCESS":
      if (action.photoId) {
        if (state.photos === undefined) throw new Error("No photo state");

        const photos2 = state.photos;
        photos2.delete(action.photoId);
        const newPhotos2 = new Map(photos2);
        return {
          ...state,
          photos: newPhotos2,
          editLoading: action.isLastEditPhotoReq === true ? false : true,
          editError: false,
        };
      } else {
        return {
          ...state,
          editLoading: action.isLastEditPhotoReq === true ? false : true,
          editError: false,
        };
      }
    case "EDIT_PHOTO_REQUEST_ERROR":
      return {
        ...state,
        editLoading: false,
        editError: true,
      };

    case "ADD_PHOTO":
      //const photos = state.photos;
      //photos.set(action.photo.id, action.photo.photo);
      if (action.photo === undefined)
        throw new Error("No photo in add photo action");

      return {
        ...state,
        photos: new Map([
          [action.photo.id, action.photo.photo],
          //@ts-ignore
          ...state.photos,
        ]),
      };

    case "EDIT_PHOTO":
      if (state.photos === undefined || action.photo === undefined)
        throw new Error("No photo state or photo on action");
      //const photos1 = state.photos;
      //photos1.set(action.photo.id, action.photo.photo);
      //const newPhotos1 = new Map([...state.photos, ...action.photos]);
      state.photos.set(action.photo.id, action.photo.photo);

      //console.log("EDIT_PHOTO", newPhotos1);
      return {
        ...state,
        photos: new Map(state.photos),
      };

    case "DELETE_PHOTO":
      if (state.photos === undefined || action.photoId === undefined)
        throw new Error("No photo state or photoId on action");
      const allPhotos = state.photos;
      allPhotos.delete(action.photoId);

      const newPhotos3 = new Map(allPhotos);

      console.log("DELETE_PHOTO", newPhotos3);
      return {
        ...state,
        photos: newPhotos3,
      };

    default:
      return state;
  }
};

export default reducer;
