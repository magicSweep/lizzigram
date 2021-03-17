import { useDispatch, useSelector } from "react-redux";
import { showEditFormAC } from "../../../store";
import { useSelectorPhoto } from "../../hook/useSelectorPhoto";
//import { useTags } from "../../../hooks/useTags";

export const usePhotoDesc = () => {
  const dispatch = useDispatch();

  //const { tags, error, loading } = useTags();

  const photo = useSelectorPhoto();

  const userUID = useSelector<IGlobalState, string>((state) =>
    state.auth.user ? state.auth.user.uid : ""
  );

  const showEditPhotoForm = () => {
    if (!photo) throw new Error("No photo in showEditPhotoForm");
    dispatch(showEditFormAC(photo.id));
  };

  return {
    photo,
    /*  tags,
    error,
    loading, */
    isEditable: photo ? photo.photo.addedByUserUID === userUID : false,
    showEditPhotoForm,
  };
};
