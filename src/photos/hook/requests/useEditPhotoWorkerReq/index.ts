import { useCallback } from "react";
import { useRequest } from "../../../../hooks/useRequest";
import { isLastReq as isLast } from "../../../../hooks/useRequest/controller";
import {
  request,
  prepareDataToWorkerReq,
  getIsNeedRequest,
} from "./controller";

export const useEditPhotoWorkerReq = () => {
  const { syncStart: iSyncStart, cancel } = useRequest<FormData, void>(
    "SEND_PHOTO_TO_WORKER_ON_EDIT",
    false
  );

  const syncStart = useCallback(
    (photoId: string, userUid: string, photoFormData: IEditPhotoFormData) => {
      const data = prepareDataToWorkerReq(photoFormData, userUid, photoId);

      return iSyncStart(data, request);
    },
    []
  );

  const isLastReq = useCallback(
    () => isLast("SEND_PHOTO_TO_WORKER_ON_EDIT"),
    []
  );

  return {
    syncStart,
    getIsNeedRequest,
    isLastReq,
    cancel,
  };
};
