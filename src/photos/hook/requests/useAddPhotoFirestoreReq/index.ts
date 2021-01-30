import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRequest } from "../../../../hooks/useRequest";
import { isLastReq as isLast } from "../../../../hooks/useRequest/controller";
import { request } from "./controller";
import {
  addPhotoStartRequestAC,
  //addPhotoRequestErrorAC,
} from "../../../store/action/photos";

export const useAddPhotoFirestoreReq = () => {
  const dispatch = useDispatch();

  const { start: iStart, cancel } = useRequest<TCreatePhotoFirestoreData, void>(
    "SEND_PHOTO_TO_FIRESTORE_ON_ADD",
    false
  );

  const isLastReq = useCallback(
    () => isLast("SEND_PHOTO_TO_FIRESTORE_ON_ADD"),
    []
  );

  const start = useCallback(
    (
      data: TCreatePhotoFirestoreData,
      onSuccess: () => void,
      onError: (err: any) => void
    ) => {
      iStart(
        data,
        request,
        () => dispatch(addPhotoStartRequestAC()),
        onError,
        onSuccess
      );
    },
    []
  );

  return {
    start,
    isLastReq,
    cancel,
  };
};
