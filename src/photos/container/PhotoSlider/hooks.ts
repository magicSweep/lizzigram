import { useSelector } from "react-redux";
import { usePhotos } from "../../hook/usePhotos";
import { makeEditedPhotoIds } from "./helper";

export const usePhotoSlider = () => {
  const {
    photos,
    loading,
    hasNextPage,
    error,
    loadMore,
    requests,
  } = usePhotos();

  const editedPhotoIds = makeEditedPhotoIds(requests);

  const initActiveIndex = useSelector<IGlobalState, number>(
    (state) => state.modal.initActiveIndex
  );

  return {
    photos,
    loading,
    hasNextPage,
    error,
    loadMore,
    initActiveIndex,
    editedPhotoIds,
  };
};
