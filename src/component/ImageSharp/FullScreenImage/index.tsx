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

export interface IFullScreenImage extends IBase64ImageProps {
  zoom: number;
}

const FullScreenImage: FC<IFullScreenImage> = (props) => {
  //const aspectRatio = useAspectRatio();

  const aspectRatio = useContext(WindowResizeContext);

  if (aspectRatio === 0) return null;

  const style = getStyle(
    props.photo.photo.aspectRatio >= aspectRatio,
    props.photo.photo.aspectRatio,
    props.zoom
  );

  console.log(
    "[FULL SCREEN IMAGE] RENDER",
    style,
    props.photo
    //props.zoom,
    //props.photo.photo.aspectRatio
  );

  return <PreloadBase64Image imageStyle={style} {...props} />;
};

export default FullScreenImage;

/* import React, { FC } from "react";
import PreloadBase64Image, { IBase64ImageProps } from "./../PreloadBase64Image";
import { useAspectRatio } from "./hook";

const getStyle = (isAspectRatio: boolean, aspectRatio: number) => {
  return {
    width: isAspectRatio ? "100vw" : `${aspectRatio * 100}vh`,
    height: isAspectRatio ? `${Math.round(100 / aspectRatio)}vw` : "100vh",
  };
};

export interface IFullScreenImage extends IBase64ImageProps {}

const FullScreenImage: FC<IFullScreenImage> = (props) => {
  const aspectRatio = useAspectRatio();

  const style = getStyle(
    props.photo.aspectRatio >= aspectRatio,
    props.photo.aspectRatio
  );

  console.log("[FULL SCREEN IMAGE] RENDER");

  return <PreloadBase64Image imageStyle={style} {...props} />;
};

export default FullScreenImage;
 */
