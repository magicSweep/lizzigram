type TRequestType =
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

type TCreatePhotoFirestoreData = {
  photoId: string;
  photoFormData: IAddPhotoFormData;
  userUid: string;
};

type TEditPhotoFirestoreData = {
  photoId: string;
  photo: IEditPhotoData;
};

type TEditPhotoWorkerData = {
  photoId: string;
  userUid: string;
  photoFormData: IAddPhotoFormData;
};

/* interface IRequest<TRequestData, TResponseData> {
  start: (
    data: TRequestData,
    onStart?: any,
    onError?: any,
    onSuccess?: any
  ) => void;
  cancel: () => void;
  isLastReq: () => boolean;
}

abstract class ARequest<TRequestData, TResponseData>
  implements IRequest<TRequestData, TResponseData> {
  //id: any;
  abstract type: TRequestType;
  abortController: AbortController = new AbortController();
  dispatch: any;
  log: boolean;
  //isRequest: boolean = false;
  isSingle: boolean;
  numberOfRequests: number = 0;
  //onStart: () => void;
  //onError: (err: any) => void;
  //onSuccess: (res: TResponseData) => void;

  // isSingel - is it one request for all app or many 
  constructor(
    //id: number,
    isSingle: boolean,
    dispatch: any,
    log: boolean = true
  ) {
    this.id = id;
    this.dispatch = dispatch;
    this.log = log;
    this.isSingle = isSingle;
  }

  // IF WE NEED OUR OWN ONSUCCESS AND ETC 
  syncStart = async (data: TRequestData): Promise<TResponseData> => {
    try {
      this.onStart(data);

      const res = await this.request(data);

      this.onSuccess(res);

      return res;
    } catch (err) {
      this.onError(err);
      throw err;
    }
  };

  start = (
    data: TRequestData,
    onStart?: any,
    onError?: any,
    onSuccess?: any
  ) => {
    if (this.isSingle && this.numberOfRequests > 0) return;

    this.onStart(data);

    if (onStart) onStart();

    this.send(data, onError, onSuccess);
  };

  cancel = () => {
    this.abortController.abort();
  };

  isLastReq = () => {
    return this.numberOfRequests === 0;
  };

  send = (data: TRequestData, onError?: any, onSuccess?: any) => {
    try {
      const res = await this.request(data);

      this.onSuccess(res);

      if (onSuccess) onSuccess(res);
    } catch (err) {
      this.onError(err);

      if (onError) onError(err);
    }
  };

  onStart(data: any) {
    this.numberOfRequests++;

    if (this.log) {
      console.log(`----------REQUEST START - ${this.type} ----------`);

      console.log("Start data: ", data);

      /* if (data) {
        console.log("Start data: ", data);
         for (let prop in data) {
          console.log(
            ` - ${prop} - ${
              typeof data[prop] === "object" || typeof data[prop] === "array"
                ? JSON.stringify(data[prop])
                : data[prop]
            }`
          );
        } 
      }
 /
      console.log("------------------------------------------------");
    }
  }
  onError(err: any) {
    if (this.log) {
      console.log(`----------REQUEST ERROR - ${this.type} ----------`);

      console.log(`ERROR - `, err);

      /*   if (err.message) {
        console.log(`MESSAGE - ${err.message}`);
      } else {
        console.log(`ERROR - ${JSON.stringify(err)}`);
      } /

      console.log("------------------------------------------------");
    }

    this.numberOfRequests--;
  }
  onSuccess(data: TResponseData) {
    if (this.log) {
      console.log(`----------REQUEST SUCCESSS - ${this.type} ----------`);

      console.log("Response data: ", data);

      /*  if (data) {
        console.log("Response data: ");
        for (let prop in data) {
          console.log(
            ` - ${prop} - ${
              typeof data[prop] === "object" || typeof data[prop] === "array"
                ? JSON.stringify(data[prop])
                : data[prop]
            }`
          );
        }
      } /

      console.log("------------------------------------------------");
    }

    this.numberOfRequests--;
  }

  abstract request(data: TRequestData): Promise<TResponseData>;
}
 */
