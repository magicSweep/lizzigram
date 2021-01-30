import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRequest } from "../../../../hooks/useRequest";
import { request } from "./controller";
import { addPhotoAC } from "../../../store/action/photos";

export const useGetAddedPhotoReq = () => {
  const dispatch = useDispatch();

  const { start: iStart, cancel } = useRequest<string, TPhotoData>(
    "GET_ADDED_PHOTO",
    false
  );

  const start = useCallback((photoId: string) => {
    iStart(photoId, request, null, null, (photoData: TPhotoData) =>
      dispatch(addPhotoAC(photoData))
    );
  }, []);

  return {
    start,
    cancel,
  };
};
