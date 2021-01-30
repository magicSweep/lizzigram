import React, { FC } from "react";
import PhotoDescWidget from "./PhotoDesc";
import { usePhotoDesc } from "./hook";
//import { TPhotoData } from "../../types";

export interface IPhotoDescProps {
  photo: TPhotoData;
}

export const PhotoDesc: FC<IPhotoDescProps> = ({ photo }) => {
  const { tags, error, loading, showEditPhotoForm } = usePhotoDesc();

  console.log("[RENDER PHOTO DESC] ");

  return (
    <PhotoDescWidget
      photo={photo}
      tags={tags}
      loading={loading}
      error={error}
      showEditPhotoForm={showEditPhotoForm}
    />
  );
};

export default PhotoDesc;
