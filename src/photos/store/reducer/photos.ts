import { Reducer } from "redux";
//import { IPhotosState, IPhotosAction } from "../../types";
//import { IPhoto } from "../../../types";

import { onFetchMorePhotosRequestSuccess } from "./helper";
import {
  onAddPhotoStartRequest,
  onAddPhotoRequestSuccess,
  onAddPhotoRequestError,
  onGetAddedPhotoSuccess,
  onGetAddedPhotoError,
  //onRemovePhotoRequestInfo,
  onEditPhotoStartRequest,
  onEditPhotoRequestSuccess,
  onEditPhotoRequestError,
  onDeletePhoto,
  onGetEditedPhotoSuccess,
  onGetEditedPhotoError,
} from "./photos.helper";

const photosInitialState: IPhotosState = {
  nextPageDocRef: undefined,
  hasNextPage: false,
  photos: undefined,
  requests: new Map(),
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
      return onAddPhotoStartRequest(state, action);

    case "ADD_PHOTO_ANOTHER_FORM":
      return {
        ...state,
        addLoading: false,
        addAnotherForm: true,
      };
    case "ADD_PHOTO_REQUEST_SUCCESS":
      return onAddPhotoRequestSuccess(state, action);

    case "ADD_PHOTO_REQUEST_ERROR":
      return onAddPhotoRequestError(state, action);

    case "EDIT_PHOTO_START_REQUEST":
      return onEditPhotoStartRequest(state, action);

    case "EDIT_PHOTO_ANOTHER_FORM":
      return {
        ...state,
        editLoading: false,
        editAnotherForm: true,
      };
    case "EDIT_PHOTO_REQUEST_SUCCESS":
      return onEditPhotoRequestSuccess(state, action);

    case "EDIT_PHOTO_REQUEST_ERROR":
      return onEditPhotoRequestError(state, action);

    case "GET_ADDED_PHOTO_SUCCESS":
      return onGetAddedPhotoSuccess(state, action);

    case "GET_ADDED_PHOTO_ERROR":
      return onGetAddedPhotoError(state, action);

    case "GET_EDITED_PHOTO_SUCCESS":
      return onGetEditedPhotoSuccess(state, action);

    case "GET_EDITED_PHOTO_ERROR":
      return onGetEditedPhotoError(state, action);

    case "DELETE_PHOTO":
      return onDeletePhoto(state, action);

    /*  case "REMOVE_PHOTO_REQUEST_INFO":
      return onRemovePhotoRequestInfo(state, action); */

    default:
      return state;
  }
};

export default reducer;
