import { useSelector } from "react-redux";
//import { showAlertAC } from "../../../store";
//import { hideAddFormAC } from "../../../store/action/modal";

/* export const useAddEditPhotoForm = () => {
  //const dispatch = useDispatch();

  const tagsData = useSelector<IGlobalState, TTagsData | undefined>(
    (state) => state.tags.tags
  );

  /* const showAlert = (message: string, type: TAlertType) =>
    dispatch(showAlertAC(message, type));
 /
  return {
    tagsData,
    //userUID,
    //showAlert,
    //dispatch,
  };
}; */

export const useAddPhotoForm = () => {
  //const dispatch = useDispatch();

  const tagsData = useSelector<IGlobalState, TTagsData | undefined>(
    (state) => state.tags.tags
  );
  //const hideAddPhotoForm = () => dispatch(hideAddFormAC());

  return {
    tagsData,
    /* userUID,
    showAlert,
    hideAddPhotoForm, */
  };
};
