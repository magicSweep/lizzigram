import { useDispatch, useSelector } from "react-redux";
import { showAlertAC } from "../../../store";
import { hideAddFormAC } from "../../../store/action/modal";

export const useAddEditPhotoForm = () => {
  const dispatch = useDispatch();

  const { tagsData, userUID } = useSelector<
    IGlobalState,
    { tagsData: TTagsData | undefined; userUID: string }
  >((state) => ({
    tagsData: state.tags.tags,
    userUID: state.auth.user.uid,
  }));

  const showAlert = (message: string, type: TAlertType) =>
    dispatch(showAlertAC(message, type));

  return {
    tagsData,
    userUID,
    showAlert,
    dispatch,
  };
};

export const useAddPhotoForm = () => {
  const dispatch = useDispatch();

  const { tagsData, userUID, showAlert } = useAddEditPhotoForm();

  const hideAddPhotoForm = () => dispatch(hideAddFormAC());

  return {
    tagsData,
    userUID,
    showAlert,
    hideAddPhotoForm,
  };
};
