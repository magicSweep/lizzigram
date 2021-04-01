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
  const props = useWallOfPhotos();

  console.log("[RENDER WALL_OF_PHOTS]");

  return <WallOfPhotosWidget {...props} />;
};

export default WallOfPhotos;
