import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRequest } from "../../../../hooks/useRequest";
import { request } from "./controller";
import { editPhotoAC } from "../../../store/action/photos";

export const useGetEditedPhotoReq = () => {
  const dispatch = useDispatch();

  const { start: iStart, cancel } = useRequest<string, TPhotoData>(
    "GET_EDITED_PHOTO",
    false
  );

  const start = useCallback((photoId: string) => {
    iStart(photoId, request, null, null, (photoData: TPhotoData) =>
      dispatch(editPhotoAC(photoData))
    );
  }, []);

  return {
    start,
    cancel,
  };
};
