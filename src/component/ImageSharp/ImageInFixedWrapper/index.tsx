import React, { FC } from "react";
import PreloadBase64Image, { IBase64ImageProps } from "./../PreloadBase64Image";

export const getImageStyle = (
  wrapperAspectRatio: number,
  aspectRatio: number,
  wrapperWidth: number,
  wrapperHeight: number
) => {
  let height, width;

  if (aspectRatio <= wrapperAspectRatio) {
    width = `${Math.floor(wrapperHeight * aspectRatio)}px`;
    height = `${wrapperHeight}px`;
  } else {
    width = `${wrapperWidth}px`;
    height = `${Math.floor(wrapperWidth / aspectRatio)}px`;
  }

  return {
    //display: "block",
    //margin: "auto",
    cursor: "pointer",
    width,
    height,
  };
};

export interface IImageInFixedWrapper extends IBase64ImageProps {
  wrapperAspectRatio: number;
  wrapperWidth: number;
  wrapperHeight: number;
}

const ImageInFixedWrapper: FC<IImageInFixedWrapper> = (props) => {
  const style = getImageStyle(
    props.wrapperAspectRatio,
    props.photo.photo.aspectRatio,
    props.wrapperWidth,
    props.wrapperHeight
  );

  console.log("[IMAGE FIXED WRAPPER] RENDER");

  return <PreloadBase64Image imageStyle={style} {...props} />;
};

export default ImageInFixedWrapper;
