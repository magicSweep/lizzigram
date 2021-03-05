import { useDispatch, useSelector } from "react-redux";
import { showEditFormAC } from "../../../store";
//import { useTags } from "../../../hooks/useTags";

export const usePhotoDesc = () => {
  const dispatch = useDispatch();

  //const { tags, error, loading } = useTags();

  const { photo, userUID } = useSelector<
    IGlobalState,
    { photo: TPhotoData | undefined; userUID: string }
  >((state) => ({
    photo: state.modal.photo,
    userUID: state.auth.user ? state.auth.user.uid : "",
  }));

  const showEditPhotoForm = () => dispatch(showEditFormAC(photo));

  return {
    photo,
    /*  tags,
    error,
    loading, */
    isEditable: photo ? photo.photo.addedByUserUID === userUID : false,
    showEditPhotoForm,
  };
};
