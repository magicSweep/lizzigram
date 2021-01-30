import { hideEditFormAC, showAlertAC } from "../../../../store";
import {
  editPhotoStartRequestAC,
  editPhotoRequestSuccessAC,
  editPhotoRequestErrorAC,
} from "../../../store/action/photos";
import { isInSearchTerms } from "../../helper/DataHelper";

export const editPhoto = async (
  firestoreReq: (
    photoId: string,
    photoFormData: IEditPhotoFormData
  ) => Promise<void>,
  workerReq: (
    photoId: string,
    userUid: string,
    photoFormData: IEditPhotoFormData
  ) => Promise<void>,
  getEditedPhotoReq: (photoId: string) => void,
  getPhotoFirestoreData: (photoFormData: IEditPhotoFormData) => IEditPhotoData,
  isNeedWorkerReq: boolean,
  isLastFirestoreReq: () => boolean,
  isLastWorkerReq: () => boolean,
  dispatch: any,
  photoId: string,
  userUid: string,
  photoFormData: IEditPhotoFormData,
  searchState: ISearchState
) => {
  try {
    const requests: Promise<any>[] = [];

    const photoFirestoreData = getPhotoFirestoreData(photoFormData);

    const isNeedFirestoreReq = Object.keys(photoFirestoreData).length > 0;

    if (!isNeedFirestoreReq && !isNeedWorkerReq) {
      //show nothing to chagne alert
      dispatch(showAlertAC("Вы ничего не изменили.", "error"));
    } else {
      // start request AC
      dispatch(editPhotoStartRequestAC());

      if (isNeedFirestoreReq) {
        requests.push(firestoreReq(photoId, photoFormData));
      }

      if (isNeedWorkerReq) {
        requests.push(workerReq(photoId, userUid, photoFormData));
      }

      await Promise.all(requests);

      const isLastReq = isLastFirestoreReq() && isLastWorkerReq();

      if (
        isNeedFirestoreReq &&
        isInSearchTerms(searchState, photoFirestoreData)
      ) {
        dispatch(editPhotoRequestSuccessAC(isLastReq));
        // GET EDITED PHOTO FROM FIRESTORE
        getEditedPhotoReq(photoId);
      } else {
        dispatch(editPhotoRequestSuccessAC(isLastReq, photoId));
      }

      dispatch(hideEditFormAC());

      dispatch(showAlertAC("Фото успешно изменено.", "success"));
    }
  } catch (err) {
    //show error alert
    if (isLastFirestoreReq() && isLastWorkerReq())
      dispatch(editPhotoRequestErrorAC(true));

    dispatch(
      showAlertAC("К сожалению, мы не смогли сохранить изменения", "error")
    );
  }
};
