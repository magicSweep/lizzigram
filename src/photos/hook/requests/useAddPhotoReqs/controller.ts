import { batch } from "react-redux";
import { hideAddFormAC, showAlertAC } from "../../../../store";
import {
  addPhotoRequestSuccessAC,
  addPhotoRequestErrorAC,
} from "../../../store/action/photos";
import { generatePhotoId } from "../../helper/DataHelper";

export const addPhoto = async (
  firestoreReq: (
    data: TCreatePhotoFirestoreData,
    onSuccess: () => void,
    onError: (err: any) => void
  ) => void,
  workerReq: (
    data: TCreatePhotoFirestoreData,
    onSuccess: () => void,
    onError: (err: any) => void
  ) => void,
  getAddedPhotoReq: (photoId: string) => void,
  isLastFirestoreReq: () => boolean,
  isLastWorkerReq: () => boolean,
  dispatch: any,
  photoFormData: IAddPhotoFormData,
  userUid: string
  //searchState: ISearchState
) => {
  try {
    const photoId = generatePhotoId(photoFormData.date);

    const data: TCreatePhotoFirestoreData = {
      photoFormData,
      userUid,
      photoId,
    };

    firestoreReq(
      data,
      () => {
        workerReq(
          data,
          () =>
            onWorkerReqSuccess(
              isLastFirestoreReq,
              isLastWorkerReq,
              dispatch,
              photoId,
              getAddedPhotoReq
            ),
          (err) => onReqError(isLastFirestoreReq, isLastWorkerReq, dispatch)
        );
      },
      (err) => onReqError(isLastFirestoreReq, isLastWorkerReq, dispatch)
    );
  } catch (err) {
    console.log("[ADD PHOTO ERROR]", err);
    onReqError(isLastFirestoreReq, isLastWorkerReq, dispatch);
  }
};

export const onWorkerReqSuccess = (
  isLastFirestoreReq: () => boolean,
  isLastWorkerReq: () => boolean,
  dispatch: any,
  photoId: string,
  getAddedPhotoReq: (photoId: string) => void
) => {
  batch(() => {
    if (isLastFirestoreReq() && isLastWorkerReq()) {
      dispatch(addPhotoRequestSuccessAC(true));
      dispatch(hideAddFormAC());
    }

    dispatch(showAlertAC("Фото успешно добавлено.", "success"));
  });

  getAddedPhotoReq(photoId);
};

export const onReqError = (
  isLastFirestoreReq: () => boolean,
  isLastWorkerReq: () => boolean,
  dispatch: any
) => {
  batch(() => {
    if (isLastFirestoreReq() && isLastWorkerReq())
      dispatch(addPhotoRequestErrorAC(true));

    dispatch(showAlertAC("К сожалению, мы не смогли сохранить фото", "error"));
  });
};
