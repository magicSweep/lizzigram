import React, { CSSProperties, FC, useState } from "react";
import classes from "./PreloadBase64Image.module.scss";
//import useMediaQuery from "@material-ui/core/useMediaQuery";

export interface IBase64ImageProps {
  //type: TPhotoSizes;
  //imageClasses: string;
  photo: TPhotoData;
  alt: string;
  //isHidden?: boolean;
  onImageClick?: (event: any) => void | undefined;
  index?: number;
  isActive?: boolean;
}

export interface IPreloadBase64ImageProps extends IBase64ImageProps {
  //type: TPhotoSizes;
  imageStyle: CSSProperties;
}

//wrapperFixed - wrapper element has fixed aspectRatio( width and height )
export type TPhotoSizes = "full" | "wrapperFixed";

/* interface IStylesProps {
  type: TPhotoSizes;

  aspectRatio?: number;
  isAspectRatio?: boolean;
  base64: string;
} */

/* const useStyles = makeStyles({
  // style rule
  
  background: (props: any) => ({
    background: `url("data:image/jpeg;base64, ${props.base64}") no-repeat`,
    backgroundSize: "cover",
  }),
}); */

const PreloadBase64Image: FC<IPreloadBase64ImageProps> = ({
  //type,
  imageStyle,
  photo,
  alt,
  index = 0,
  onImageClick = undefined,
}) => {
  /* const classes = useStyles({
    base64: photo.base64,
  }); */

  const [isBackground, setIsBackground] = useState(true);

  const style = isBackground
    ? {
        ...imageStyle,
        background: `url("data:image/jpg;base64, ${photo.photo.base64}") no-repeat`,
        backgroundSize: "cover",
      }
    : imageStyle;

  const onLoad = () => {
    console.log("ON LOAD");
    setIsBackground(false);
  };

  /* const fImageClasses = isBackground
    ? `${imageClasses} ${classes.background}`
    : imageClasses; */

  console.log("[PRELOAD_BASE64_IMAGE] RENDER");

  return (
    <img
      className={classes.image}
      style={style}
      data-index={index}
      onClick={onImageClick}
      src={photo.photo.src}
      data-src={photo.photo.src}
      srcSet={photo.photo.srcSet}
      alt={alt}
      onLoad={onLoad}
    />
  );
};

export default PreloadBase64Image;
