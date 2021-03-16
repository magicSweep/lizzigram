interface IRequest<TReqData, TResData> {
  type: TRequestType;
  //signal: AbortSignal;
  abortController: AbortController;
  // can we send multiple requests or single one
  //isMultiple: boolean;
  //isLog: boolean;
  //onStart?: any;
  //onError?: any;
  //onSuccess?: any;
  addOnStart: (onStart: TOnStart<TReqData>) => void | undefined;
  addOnSuccess: (onSuccess: TOnSuccess<TResData>) => void | undefined;
  addOnError: (onError: TOnError) => void | undefined;

  //isLastReq: () => boolean;
  fetch: (data: TReqData) => Promise<void>;
  fetchSync: (data: TReqData) => Promise<TResData>;
  cancel: () => void;
}

type TOnStart<T> = (data: T) => void | undefined;
type TOnSuccess<T> = (data: T) => void | undefined;
type TOnError = (err: Error) => void | undefined;

interface IPhotosReqData {
  isLoadMore: boolean;
  searchState: ISearchState;
  nextPageDocRef?: any;
}

type TRequestType =
  | "ABSTRACT"
  | "SEND_PHOTO_TO_FIRESTORE_ON_ADD"
  | "SEND_PHOTO_TO_FIRESTORE_ON_EDIT"
  | "SEND_PHOTO_TO_WORKER_ON_ADD"
  | "SEND_PHOTO_TO_WORKER_ON_EDIT"
  | "AUTH_IS_EDITOR_FIRESTORE"
  | "AUTH_LOGOUT"
  | "AUTH_LOGIN"
  | "GET_ALL_TAGS"
  | "GET_ADDED_PHOTO"
  | "GET_EDITED_PHOTO"
  | "GET_ALL_PHOTOS"
  | "GET_MORE_PHOTOS";

type TGetPhotosData = {
  hasNextPage: boolean;
  nextPageDocRef: any;
  photos: TPhotosData;
};

interface TCreatePhotoData {
  photoFormData: IAddPhotoFormData;
  userUid: string;
}

/* interface TCreatePhotoFirestoreData extends TCreatePhotoData {
  photoId: string;
} */

/* interface IPhotoFirestoreData extends TCreatePhotoData {
  photoId: string;
}
 */
interface ICreatePhotoData<T> {
  photoFormData: T;
  userUid: string;
}

interface IPhotoFirestoreData<T> extends ICreatePhotoData<T> {
  photoId: string;
}

interface IEditPhotoFirestoreData {
  photoId: string;
  photoFormData: IEditPhotoFormData;
  userUid: string;
}

type TEditPhotoFirestoreData = {
  photoId: string;
  photo: IEditPhotoData;
};

type TEditPhotoWorkerData = {
  photoId: string;
  userUid: string;
  photoFormData: IAddPhotoFormData;
};
