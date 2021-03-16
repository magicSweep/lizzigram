import { useDispatch, useSelector, shallowEqual } from "react-redux";
import EditPhotoReqManager from "../../request/EditPhoto/EditPhotoReqManager";

let reqManager: EditPhotoReqManager | undefined = undefined;

export const useEditPhoto = () => {
  const dispatch = useDispatch();

  if (reqManager === undefined) reqManager = new EditPhotoReqManager();

  const {
    loading,
    error,
    prevPhoto,
    userUid,
    searchState,
    anotherForm,
  } = useSelector<
    IGlobalState,
    {
      loading: boolean;
      error: boolean;
      prevPhoto: TPhotoData | undefined;
      userUid: string;
      searchState: ISearchState;
      anotherForm: boolean;
    }
  >(
    (state) => ({
      loading: state.photos.editLoading,
      error: state.photos.editError,
      prevPhoto: state.modal.photo,
      userUid: state.auth.user ? state.auth.user.uid : "",
      searchState: state.search,
      anotherForm: state.photos.editAnotherForm,
    }),
    shallowEqual
  );

  reqManager.dispatch = dispatch;
  reqManager.anotherForm = anotherForm;
  reqManager.searchState = searchState;

  const start = (photoFormData: IEditPhotoFormData) => {
    if (!reqManager) throw new Error("No reqManager on useEditPhoto");

    if (!prevPhoto) throw new Error("No prevPhoto on useEditPhoto");

    reqManager.startNew({
      photoId: prevPhoto.id,
      photoFormData,
      userUid,
    });
  };

  return {
    start,
    loading,
    error,
  };
};
