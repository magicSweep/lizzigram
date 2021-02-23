import React, { FC } from "react";
import PhotoDescWidget from "./PhotoDesc";
import { usePhotoDesc } from "./hook";
//import { TPhotoData } from "../../types";

export interface IPhotoDescProps {}

export const PhotoDesc: FC<IPhotoDescProps> = () => {
  const {
    tags,
    error,
    loading,
    isEditable,
    photo,
    showEditPhotoForm,
  } = usePhotoDesc();

  console.log("[RENDER PHOTO DESC] ");

  return (
    <PhotoDescWidget
      photo={photo}
      isEditable={isEditable}
      tags={tags}
      loading={loading}
      error={error}
      showEditPhotoForm={showEditPhotoForm}
    />
  );
};

export default PhotoDesc;
