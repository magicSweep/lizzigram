import React, { FC } from "react";
import ImageInFixedWrapper from "../../../component/ImageSharp/ImageInFixedWrapper";
import { IBase64ImageProps } from "../../../component/ImageSharp/PreloadBase64Image";
import MoreActionsBtn from "../../../fcomponent/MoreActionsBtn";
//import { IPhoto } from "./../../../types";
import classes from "./PhotoCard.module.scss";
//import EditPhotoMenuBtn from "./../../../fcomponent/EditPhotoMenuBtn";

export interface IPhotoCardProps extends IBase64ImageProps {
  isEditable: boolean;
  showEditPhotoForm: (photo: TPhotoData) => void;
  showPhotoDesc: (photo: TPhotoData) => void;
  /* photo: IPhoto;
  alt: string;
  //isHidden?: boolean;
  onImageClick?: (event: any) => void | undefined;
  index?: number;
  isActive?: boolean; */
}

const PhotoCard: FC<IPhotoCardProps> = (props) => {
  const isEditable = props.isEditable === undefined ? false : props.isEditable;

  const photo: TPhotoData = {
    id: props.photo.id,
    photo: {
      ...props.photo.photo,
      srcSet: "",
      src: props.photo.photo.iconSrc,
    },
  };

  return (
    <div
      key={classes.container + props.index}
      data-index={props.index}
      className={classes.container}
    >
      {/* <div className={classes.image}>{photo.name}</div> */}
      <ImageInFixedWrapper
        wrapperHeight={180}
        wrapperWidth={320}
        wrapperAspectRatio={1.8}
        {...props}
        photo={photo}
      />

      <div className={classes.moreActionsBtn}>
        <MoreActionsBtn
          photo={props.photo}
          isEditable={isEditable}
          index={props.index}
          showEditPhotoForm={props.showEditPhotoForm}
          showPhotoDesc={props.showPhotoDesc}
        />
      </div>
    </div>
  );
};

export default PhotoCard;
