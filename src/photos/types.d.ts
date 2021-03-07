//import { IPhoto } from "./../types";
//import { Action } from "redux";

// PHOTO_SUBSCRIBER
/* 
interface ISubscribeInfo {
  unsubscribe: () => void;
  isInit: boolean;
} */

// END PHOTO_SUBSCRIBER

// STORE

// SEARCH

type TSearchActionTypes = "SET_SEARCH_STATE" | "RESET_SEARCH_STATE";

interface ISearchState {
  tagsIds: string[];
  yearsOld: number;
  isSearch: boolean;
  //minDate: Date;
  //maxDate: Date;
  //orderBy: "desc" | "";
}

interface ISearchAction extends Action<TSearchActionTypes> {
  type: TSearchActionTypes;
  state?: ISearchState;
  /* tagsIds: string[];
  minDate?: Date;
  maxDate?: Date;
  orderBy: "desc" | ""; */
}

// PHOTOS

type TPhotosActionTypes =
  | "ADD_PHOTO"
  | "EDIT_PHOTO"
  | "DELETE_PHOTO"
  | "ADD_PHOTO_START_REQUEST"
  | "ADD_PHOTO_ANOTHER_FORM"
  | "ADD_PHOTO_REQUEST_SUCCESS"
  | "ADD_PHOTO_REQUEST_ERROR"
  | "ALL_PHOTOS_START_NEW_REQUEST"
  | "ALL_PHOTOS_START_MORE_REQUEST"
  | "ALL_PHOTOS_REQUEST_SUCCESS"
  | "ALL_PHOTOS_REQUEST_ERROR"
  | "EDIT_PHOTO_START_REQUEST"
  | "EDIT_PHOTO_ANOTHER_FORM"
  | "EDIT_PHOTO_REQUEST_SUCCESS"
  | "EDIT_PHOTO_REQUEST_ERROR"
  | "FETCH_MORE_PHOTO_START_REQUEST"
  | "FETCH_MORE_PHOTO_REQUEST_SUCCESS"
  | "FETCH_MORE_PHOTO_REQUEST_ERROR";

type TPhotoFirestoreResponse = {
  data: () => IPhoto;
  id: string;
};

type TPhotosData = Map<string, IPhoto>;

type TPhotoData = {
  id: string;
  photo: IPhoto;
};

interface IPhotosState {
  hasNextPage: boolean;
  nextPageDocRef: any;
  photos: TPhotosData | undefined;
  loading: boolean;
  error: boolean;
  addAnotherForm: boolean;
  addLoading: boolean;
  addError: boolean;
  editAnotherForm: boolean;
  editLoading: boolean;
  editError: boolean;
}

interface IPhotosAction extends Action<TPhotosActionTypes> {
  type: TPhotosActionTypes;
  photos?: TPhotosData;
  photo?: TPhotoData;
  photoId?: string;
  hasNextPage?: boolean;
  nextPageDocRef?: any;
  isLast?: boolean;
}

type TAllPhotosFetchFunc = (searchTerms: any) => (dispatch: any) => void;

type TAddFormFetchFunc = (
  photoFormData: IAddPhotoFormData,
  onSuccess?: any,
  onError?: any
) => (dispatch: any) => void;

/* export type TEditFormFetchFunc = (
  photoId: string,
  photoFormData: IEditPhotoFormData,
  onSuccess?: any,
  onError?: any
) => (dispatch: any) => void; */

// FORMS

/* export const makeEditPhotoData = (
  formData: IEditPhotoFormData
  //operationType: "edit" | "add"
) => {
  const fieldsToUpdate: any = {};
  if (formData.date) {
    fieldsToUpdate.date = formData.date;
    fieldsToUpdate.yearsOld = getYearsOld(formData.date);
  }
  if (formData.tags) fieldsToUpdate.tags = getOnlyTrueTags(formData.tags);
  if (formData.desc) fieldsToUpdate.description = formData.desc;

  if (formData.photoFile && formData.photoFile.length > 0)
    fieldsToUpdate.isActive = false;

  return fieldsToUpdate;
};
 */
interface IEditPhotoData {
  description?: string;
  date?: Date;
  photoFile?: FileList;
  isActive?: boolean;
  yearsOld?: number;
  tags?: { [name: string]: boolean };
}

interface IEditPhotoFormData {
  desc?: string;
  date?: string;
  photoFile?: FileList;
  tags?: { [name: string]: boolean };
}

interface IAddPhotoFormData {
  desc: string;
  date: string;
  photoFile: FileList;
  tags: { [name: string]: boolean };
}

interface ISearchFormData {
  ages: number;
  tags: { [name: string]: boolean };
}
