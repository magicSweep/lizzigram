import React from "react";
import { usePhotoSlider } from "./hooks";
import PhotoSliderWidget from "./PhotoSlider";

export const PhotoSlider = () => {
  const {
    photos,
    loading,
    hasNextPage,
    error,
    loadMore,
    initActiveIndex,
    editedPhotoIds,
  } = usePhotoSlider();

  console.log("[PHOTO SLIDER] RENDER", initActiveIndex, loading);
  return (
    <PhotoSliderWidget
      photos={photos}
      loading={loading}
      hasNextPage={hasNextPage}
      error={error}
      loadMorePhotos={loadMore}
      initActiveIndex={initActiveIndex}
      editedPhotoIds={editedPhotoIds}
    />
  );
};

export default PhotoSlider;
