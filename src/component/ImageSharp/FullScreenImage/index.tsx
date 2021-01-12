import React, { FC } from "react";
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
