import { useCallback, useRef } from "react";
import { useRequest } from "../../../../hooks/useRequest";
import { isLastReq as isLast } from "../../../../hooks/useRequest/controller";
import {
  request,
  prepareDataToFirestoreReq,
  getPhotoFirestoreData,
  isPhotoInSearchTerms as isInSearchTerms,
} from "./controller";

export const useEditPhotoFirestoreReq = () => {
  const { syncStart: iSyncStart, cancel } = useRequest<
    TEditPhotoFirestoreData,
    void
  >("SEND_PHOTO_TO_FIRESTORE_ON_EDIT", false);

  const syncStart = useCallback(
    (photoId: string, photoFormData: IEditPhotoFormData) => {
      const data = prepareDataToFirestoreReq(photoFormData, photoId);

      return iSyncStart(data, request);
    },
    []
  );

  const isLastReq = useCallback(
    () => isLast("SEND_PHOTO_TO_FIRESTORE_ON_EDIT"),
    []
  );

  return {
    syncStart,
    getPhotoFirestoreData,
    isLastReq,
    cancel,
  };
};
