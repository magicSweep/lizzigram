import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useAddPhotoFirestoreReq } from "../useAddPhotoFirestoreReq";
import { useAddPhotoWorkerReq } from "../useAddPhotoWorkerReq";
import { useGetAddedPhotoReq } from "../useGetAddedPhotoReq";
import { addPhoto } from "./controller";

export const useAddPhotoReqs = () => {
  const dispatch = useDispatch();

  const {
    start: firestoreReq,
    isLastReq: isLastFirestoreReq,
  } = useAddPhotoFirestoreReq();

  const {
    start: workerReq,
    isLastReq: isLastWorkerReq,
  } = useAddPhotoWorkerReq();

  const { start: getAddedPhotoReq } = useGetAddedPhotoReq();

  const { loading, error, userUid } = useSelector<
    IGlobalState,
    {
      loading: boolean;
      error: boolean;
      userUid: string;
    }
  >(
    (state) => ({
      loading: state.photos.addLoading,
      error: state.photos.addError,
      userUid: state.auth.user ? state.auth.user.uid : "",
    }),
    shallowEqual
  );

  const start = useCallback(
    (photoFormData: IAddPhotoFormData) => {
      addPhoto(
        firestoreReq,
        workerReq,
        getAddedPhotoReq,
        isLastFirestoreReq,
        isLastWorkerReq,
        dispatch,
        photoFormData,
        userUid
      );
    },
    [userUid]
  );

  return {
    start,
    loading,
    error,
  };
};
