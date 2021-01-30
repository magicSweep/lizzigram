import {
  onStart as onStartLog,
  onError as onErrorLog,
  onSuccess as onSuccessLog,
} from "./logger";

export const requests: any = {
  SEND_PHOTO_TO_FIRESTORE_ON_ADD: 0,
  SEND_PHOTO_TO_FIRESTORE_ON_EDIT: 0,
  SEND_PHOTO_TO_WORKER_ON_ADD: 0,
  SEND_PHOTO_TO_WORKER_ON_EDIT: 0,
  AUTH_IS_EDITOR_FIRESTORE: 0,
  GET_ALL_TAGS: 0,
  GET_ADDED_PHOTO: 0,
  GET_EDITED_PHOTO: 0,
  GET_ALL_PHOTOS: 0,
  GET_MORE_PHOTOS: 0,
};

export const isLastReq = (type: TRequestType) => {
  return requests[type] === 0;
};

/* IF WE NEED OUR OWN ONSUCCESS AND ETC */
export const syncStart = async <TRequestData, TResponseData>(
  type: TRequestType,
  //isSingle: boolean,
  isLog: boolean,
  signal: AbortSignal,
  data: TRequestData,
  request: (data: TRequestData, signal: AbortSignal) => Promise<TResponseData>
): Promise<TResponseData> => {
  try {
    requests[type] = requests[type] + 1;

    if (isLog) onStartLog(data, type);

    const res = await request(data, signal);

    requests[type] = requests[type] - 1;

    if (isLog) onSuccessLog(res, type);

    return res;
  } catch (err) {
    if (isLog) onErrorLog(err, type);

    requests[type] = requests[type] - 1;

    throw err;
  }
};

export const start = <TRequestData, TResponseData>(
  type: TRequestType,
  isSingle: boolean,
  isLog: boolean,
  signal: AbortSignal,
  data: TRequestData,
  request: (data: TRequestData, signal: AbortSignal) => Promise<TResponseData>,
  onStart?: any,
  onError?: any,
  onSuccess?: any
) => {
  if (isSingle && requests[type] > 0) return;

  requests[type] = requests[type] + 1;

  if (isLog) onStartLog(data, type);

  if (onStart) onStart();

  send(type, isLog, signal, data, request, onError, onSuccess);
};

export const send = async <TRequestData, TResponseData>(
  type: TRequestType,
  isLog: boolean,
  signal: AbortSignal,
  data: TRequestData,
  request: (data: TRequestData, signal: AbortSignal) => Promise<TResponseData>,
  onError?: any,
  onSuccess?: any
) => {
  try {
    const res = await request(data, signal);

    if (isLog) onSuccessLog(res, type);

    requests[type] = requests[type] - 1;

    if (onSuccess) onSuccess(res);
  } catch (err) {
    if (isLog) onErrorLog(err, type);

    requests[type] = requests[type] - 1;

    if (onError) onError(err);
  }
};
