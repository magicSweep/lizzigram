import { useDispatch, useSelector, shallowEqual } from "react-redux";
import AddPhotoReqManager from "../../request/AddPhoto/AddPhotoReqManager";

let reqManager: AddPhotoReqManager | undefined = undefined;

export const useAddPhoto = () => {
  const dispatch = useDispatch();

  if (reqManager === undefined) reqManager = new AddPhotoReqManager();

  /* const {
    start: firestoreReq,
    isLastReq: isLastFirestoreReq,
  } = useAddPhotoFirestoreReq();

  const {
    start: workerReq,
    isLastReq: isLastWorkerReq,
  } = useAddPhotoWorkerReq();

  const { start: getAddedPhotoReq } = useGetAddedPhotoReq(); */

  const { loading, error, userUid, anotherForm } = useSelector<
    IGlobalState,
    {
      loading: boolean;
      error: boolean;
      userUid: string;
      anotherForm: boolean;
    }
  >(
    (state) => ({
      loading: state.photos.addLoading,
      error: state.photos.addError,
      userUid: state.auth.user ? state.auth.user.uid : "",
      anotherForm: state.photos.addAnotherForm,
    }),
    shallowEqual
  );

  reqManager.dispatch = dispatch;
  reqManager.anotherForm = anotherForm;

  const start = (photoFormData: IAddPhotoFormData) => {
    if (!reqManager) throw new Error("No reqManager on useAddPhoto");

    reqManager.startNew({
      //photoId,
      photoFormData,
      userUid,
    });
    /*   addPhoto(
        firestoreReq,
        workerReq,
        getAddedPhotoReq,
        isLastFirestoreReq,
        isLastWorkerReq,
        dispatch,
        photoFormData,
        userUid,
        anotherForm
      ); */
  };

  return {
    start,
    loading,
    error,
  };
};
