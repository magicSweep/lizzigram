import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRequest } from "../../../../hooks/useRequest";
import { isLastReq as isLast } from "../../../../hooks/useRequest/controller";
import { request } from "./controller";
import { showAlertAC } from "../../../../store";

export const useAddPhotoWorkerReq = () => {
  const dispatch = useDispatch();

  const { start: iStart, cancel } = useRequest<TCreatePhotoFirestoreData, void>(
    "SEND_PHOTO_TO_WORKER_ON_ADD",
    false
  );

  const isLastReq = useCallback(
    () => isLast("SEND_PHOTO_TO_WORKER_ON_ADD"),
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
        null,
        (err: any) => {
          onError(err);
          dispatch(
            showAlertAC("К сожалению, мы не смогли сохранить фото", "error")
          );
        },
        () => {
          onSuccess();
          dispatch(showAlertAC("Фото успешно добавлено.", "success"));
        }
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
