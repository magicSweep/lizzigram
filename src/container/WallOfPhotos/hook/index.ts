import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePhotos } from "../../../photos/hook/usePhotos";
import {
  showPhotoSliderAC,
  showEditFormAC,
  showPhotoDescAC,
} from "../../../store";
import { getPhotoIndex, makeAddEditPhotoReqInfo } from "./helper";

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
    requests,
    hasNextPage,
    loading,
    //addPhotoLoading,
    error,
    loadMore: loadMorePhotos,
    loadPhotos: reLoadPhotos,
  } = usePhotos();

  const { editedPhotoIds, numberOfAddedPhotos } = makeAddEditPhotoReqInfo(
    requests
  );

  const showPhotoSlider = useCallback(
    (event: any) => {
      // set active index
      // show photo slider
      const index = getPhotoIndex(event.target);

      //const photo = getPhotoByIndex(photos, index);

      dispatch(showPhotoSliderAC(index));
    },
    [photos]
  );

  const showEditPhotoForm = useCallback((photo: TPhotoData) => {
    //const photo = getPhotoByIndex(photos, index);

    dispatch(showEditFormAC(photo.id));
  }, []);

  const showPhotoDesc = useCallback((photo: TPhotoData) => {
    //const photo = getPhotoByIndex(photos, index);

    dispatch(showPhotoDescAC(photo.id));
  }, []);

  return {
    photos,
    editedPhotoIds,
    numberOfAddedPhotos,
    loadMorePhotos,
    reLoadPhotos,
    hasNextPage,
    loading,
    //addPhotoLoading,
    error,
    isSearch,
    showEditPhotoForm,
    showPhotoSlider,
    showPhotoDesc,
    userUID,
  };
};
