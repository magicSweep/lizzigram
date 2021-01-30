import { useSelector } from "react-redux";
import { usePhotos } from "../../hook/usePhotos";

export const usePhotoSlider = () => {
  const { photos, loading, hasNextPage, error, loadMore } = usePhotos();

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
  };
};
