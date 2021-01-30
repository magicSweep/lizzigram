import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePhotos } from "../../../photos/hook/usePhotos";
import { showPhotoSliderAC, showEditFormAC } from "../../../store";
import { getPhotoIndex, getPhotoByIndex } from "./helper";

export const useWallOfPhotos = () => {
  const isSearch = useSelector<IGlobalState, boolean>(
    (state) => state.search.isSearch
  );

  const userUID = useSelector<IGlobalState, string>((state) =>
    state.auth.user ? state.auth.user.uid : ""
  );

  const dispatch = useDispatch();

  const {
    photos,
    hasNextPage,
    loading,
    error,
    loadMore: loadMorePhotos,
    loadPhotos: reLoadPhotos,
  } = usePhotos();

  const showPhotoSlider = useCallback(
    (event: any) => {
      // set active index
      // show photo slider
      const index = getPhotoIndex(event.target);

      const photo = getPhotoByIndex(photos, index);

      dispatch(showPhotoSliderAC(photo, index));
    },
    [photos]
  );

  const showEditPhotoForm = useCallback(
    (index: number) => {
      const photo = getPhotoByIndex(photos, index);

      dispatch(showEditFormAC(photo));
    },
    [photos]
  );

  return {
    photos,
    loadMorePhotos,
    reLoadPhotos,
    hasNextPage,
    loading,
    error,
    isSearch,
    showEditPhotoForm,
    showPhotoSlider,
    userUID,
  };
};
