import React, { FC, useContext } from "react";
import { WindowResizeContext } from "../../../provider/WindowResizer";
import PreloadBase64Image, { IBase64ImageProps } from "./../PreloadBase64Image";
//import { useAspectRatio } from "./hook";

const getStyle = (
  isAspectRatio: boolean,
  photoAspectRatio: number,
  zoom: number
) => {
  const fullSize = 100 * zoom;

  return {
    width: isAspectRatio ? `${fullSize}vw` : `${photoAspectRatio * fullSize}vh`,
    height: isAspectRatio
      ? `${Math.round(fullSize / photoAspectRatio)}vw`
      : `${fullSize}vh`,
  };
};

export interface IFullScreenImageProps extends IBase64ImageProps {
  zoom: number;
}

const FullScreenImage: FC<IFullScreenImageProps> = (props) => {
  const aspectRatio = useContext(WindowResizeContext);

  /*  if (aspectRatio === 0)
    throw new Error("!!!!!!!!!NO ASPECT RATION ON IFullScreenImageProps"); */

  if (aspectRatio === 0) {
    console.log("!!!!!!!!!NO ASPECT RATIO ON IFullScreenImageProps");
    return null;
  }

  const style = getStyle(
    props.photo.photo.aspectRatio >= aspectRatio,
    props.photo.photo.aspectRatio,
    props.zoom
  );

  console.log("[FULL SCREEN IMAGE] RENDER", style, props.photo);

  return <PreloadBase64Image imageStyle={style} {...props} />;
};

export default FullScreenImage;
