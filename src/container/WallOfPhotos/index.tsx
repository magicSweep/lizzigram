import React from "react";
//import { TTagsData } from "../../store/types";
//import { TPhotoData, TPhotosData } from "./../../photos/types";
//import { useDispatch, useSelector } from "react-redux";
//import { IGlobalState } from "../../store/types";
import WallOfPhotosWidget from "./WallOfPhotos";
//import { usePhotos } from "../../photos/hook/usePhotos";
//import { showPhotoSliderAC, showEditFormAC } from "../../store";
import { useWallOfPhotos } from "./hook";

export const WallOfPhotos = () => {
  const {
    photos,
    loadMorePhotos,
    reLoadPhotos,
    hasNextPage,
    loading,
    //ddPhotoLoading,
    editedPhotoIds,
    numberOfAddedPhotos,
    error,
    isSearch,
    showEditPhotoForm,
    showPhotoSlider,
    showPhotoDesc,
    userUID,
  } = useWallOfPhotos();

  console.log("[RENDER WALL_OF_PHOTS]", photos);

  return (
    <WallOfPhotosWidget
      photos={photos}
      loadMorePhotos={loadMorePhotos}
      reLoadPhotos={reLoadPhotos}
      hasNextPage={hasNextPage}
      loading={loading}
      //addPhotoLoading={addPhotoLoading}
      editedPhotoIds={editedPhotoIds}
      numberOfAddedPhotos={numberOfAddedPhotos}
      error={error}
      isSearch={isSearch}
      showPhotoSlider={showPhotoSlider}
      showEditPhotoForm={showEditPhotoForm}
      showPhotoDesc={showPhotoDesc}
      userUID={userUID}
    />
  );
};

export default WallOfPhotos;
