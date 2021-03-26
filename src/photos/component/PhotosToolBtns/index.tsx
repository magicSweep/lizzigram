import React, { FC, useContext } from "react";
import PhotosToolBtnsWidget from "./PhotosToolBtns";
import { WindowScrollContext } from "../../../provider/WindowScroller";

const PhotosToolBtns: FC<IPhotosToolBtnsProps> = (props) => {
  const isShow = useContext(WindowScrollContext);

  return <PhotosToolBtnsWidget {...props} isShow={isShow} />;
};

export default PhotosToolBtns;
