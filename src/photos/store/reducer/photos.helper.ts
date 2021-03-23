const addNewReqInfoImmutable = (
  prevRequests: Map<ID, IPhotoReq>,
  reqId: ID,
  photoReq: IPhotoReq
) => {
  const requests = new Map(prevRequests);

  requests.set(reqId, photoReq);

  return requests;
};

/* const setSuccessStatusOnReqInfoImmutable = (
  prevRequests: TPhotoReqs,
  reqId: ID
) => {
  return setStatusOnReqInfoImmutable(prevRequests, reqId, "success");
}; */

/* const setErrorStatusOnReqInfoImmutable = (
  prevRequests: TPhotoReqs,
  reqId: ID
) => {
  return setStatusOnReqInfoImmutable(prevRequests, reqId, "error");
}; */

const setStatusOnReqInfoImmutable = (
  prevRequests: TPhotoReqs,
  reqId: ID,
  statusType: TPhotoReqStatus,
  stage: TPhotoReqStage
) => {
  const requests = new Map(prevRequests);

  if (!requests.has(reqId))
    throw new Error(`No request info for that reqId - ${reqId}`);

  const request = requests.get(reqId);

  (request as IPhotoReq).status = {
    type: statusType,
    stage,
  };

  return requests;
};

export const onAddPhotoStartRequest = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (!action.reqId || !action.photoReq)
    throw new Error(`No reqId or photoReq on ${action.type}`);

  const requests = addNewReqInfoImmutable(
    state.requests,
    action.reqId,
    action.photoReq
  );

  return {
    ...state,
    requests,
    addLoading: true,
    addAnotherForm: false,
    addError: false,
  };
};

export const onAddPhotoRequestSuccess = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (!action.reqId)
    throw new Error("No reqId or photoReq on ADD_PHOTO_REQUEST_SUCCESS");

  const requests = setStatusOnReqInfoImmutable(
    state.requests,
    action.reqId,
    "success",
    "get_photo"
  );

  return {
    ...state,
    requests,
    addLoading: false,
    addError: false,
  };
};

export const onAddPhotoRequestError = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (!action.reqId) throw new Error("No reqId  on ADD_PHOTO_REQUEST_ERROR");

  const requests = setStatusOnReqInfoImmutable(
    state.requests,
    action.reqId,
    "error",
    "done"
  );

  return {
    ...state,
    requests,
    addLoading: action.isLastAddPhotoReq === true ? false : true,
    addError: action.isLastAddPhotoReq === true ? true : false,
  };
};

//onAddPhoto
export const onGetAddedPhotoSuccess = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (!action.reqId || action.photo === undefined)
    throw new Error(`No reqId or photo  on ${action.type}`);

  /* const requests = setStatusOnReqInfoImmutable(
    state.requests,
    action.reqId,
    "success",
    "done"
  ); */

  const requests = deleteRequestAndGetRequests(state.requests, action.reqId);

  return {
    ...state,
    requests,
    photos: new Map([
      [action.photo.id, action.photo.photo],
      //@ts-ignore
      ...state.photos,
    ]),
  };
};

export const onGetAddedPhotoError = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (!action.reqId) throw new Error(`No reqId on ${action.type}`);

  const requests = deleteRequestAndGetRequests(state.requests, action.reqId);

  return {
    ...state,
    requests,
  };
};

const deleteRequestAndGetRequests = (
  reqsFromState: TPhotoReqs,
  reqId: string
): TPhotoReqs => {
  const requests = new Map(reqsFromState);

  if (!requests.has(reqId))
    throw new Error(`No request info for that reqId - ${reqId}`);

  requests.delete(reqId);

  return requests;
};

export const onEditPhotoStartRequest = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (!action.reqId || !action.photoReq)
    throw new Error("No reqId or photoReq on EDIT_PHOTO_START_REQUEST");

  const requests = addNewReqInfoImmutable(
    state.requests,
    action.reqId,
    action.photoReq
  );

  return {
    ...state,
    requests,
    editLoading: true,
    editAnotherForm: false,
    editError: false,
  };
};

export const onEditPhotoRequestSuccess = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (state.photos === undefined) throw new Error("No photo state");

  if (!action.reqId)
    throw new Error("No reqId or photoReq on EDIT_PHOTO_REQUEST_SUCCESS");

  const requests = setStatusOnReqInfoImmutable(
    state.requests,
    action.reqId,
    "success",
    "get_photo"
  );

  let photos;

  // IF WE HAVE PHOTO_ID IT MEANS THAT EDITED PHOTO
  // NOT IN SEARCH TERMS
  if (action.photoId) {
    photos = new Map(state.photos);

    photos.delete(action.photoId);
  } else {
    photos = state.photos;
  }

  return {
    ...state,
    requests,
    photos,
    editLoading: action.isLastEditPhotoReq === true ? false : true,
    editError: false,
  };

  /* if (action.photoId) {
    if (state.photos === undefined) throw new Error("No photo state");

    const photos = new Map(state.photos);
    photos.delete(action.photoId);
    return {
      ...state,
      requests,
      photos,
      editLoading: action.isLastEditPhotoReq === true ? false : true,
      editError: false,
    };
  } else {
    return {
      ...state,
      requests,
      editLoading: action.isLastEditPhotoReq === true ? false : true,
      editError: false,
    };
  } */
};

export const onEditPhotoRequestError = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (!action.reqId) throw new Error("No reqId  on EDIT_PHOTO_REQUEST_ERROR");

  const requests = setStatusOnReqInfoImmutable(
    state.requests,
    action.reqId,
    "error",
    "done"
  );

  return {
    ...state,
    requests,
    editLoading: action.isLastEditPhotoReq === true ? false : true,
    editError: action.isLastEditPhotoReq === true ? true : false,
  };
};

//GET_ADDED_PHOTO_SUCCESS
export const onGetEditedPhotoSuccess = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (!action.reqId || action.photo === undefined)
    throw new Error(`No reqId or photo  on ${action.type}`);

  /* const requests = setStatusOnReqInfoImmutable(
    state.requests,
    action.reqId,
    "success",
    "done"
  ); */

  const requests = deleteRequestAndGetRequests(state.requests, action.reqId);

  return {
    ...state,
    requests,
    photos: new Map([
      //@ts-ignore
      ...state.photos,
      [action.photo.id, action.photo.photo],
    ]),
  };
};

export const onGetEditedPhotoError = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (!action.reqId) throw new Error(`No reqId on ${action.type}`);

  const requests = deleteRequestAndGetRequests(state.requests, action.reqId);

  return {
    ...state,
    requests,
  };
};

//REMOVE_PHOTO_REQUEST_INFO
/* export const onRemovePhotoRequestInfo = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (action.reqId === undefined)
    throw new Error("No reqId on REMOVE_PHOTO_REQUEST_INFO");

  const requests = new Map(state.requests);

  if (!requests.has(action.reqId))
    throw new Error(`No request info for that reqId - ${action.reqId}`);

  requests.delete(action.reqId);

  return {
    ...state,
    requests,
  };
}; */

export const onDeletePhoto = (
  state: IPhotosState,
  action: IPhotosAction
): IPhotosState => {
  if (state.photos === undefined || action.photoId === undefined)
    throw new Error("No photo state or photoId on action");

  const photos = new Map(state.photos);

  photos.delete(action.photoId);

  return {
    ...state,
    photos,
  };
};
