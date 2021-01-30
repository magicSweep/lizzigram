import { useDispatch, useSelector } from "react-redux";
import { showEditFormAC } from "../../../store";
import { useTags } from "../../../hooks/useTags";

export const usePhotoDesc = () => {
  const dispatch = useDispatch();

  const { tags, error, loading } = useTags();

  /* const photo = useSelector<IGlobalState, TPhotoData>(
    state => state.modal.photo
  ); */

  const showEditPhotoForm = (photo: TPhotoData) =>
    dispatch(showEditFormAC(photo));

  return {
    //photo,
    tags,
    error,
    loading,
    showEditPhotoForm,
  };
};
