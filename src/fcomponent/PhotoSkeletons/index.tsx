//import { memo } from "react";
import React, { FC } from "react";
import Skeleton from "../../component/Skeleton";
import classes from "./PhotoSkeletons.module.scss";

export const getPhotoCardSkeleton = (key?: string) => {
  return (
    <div key={key} className={classes.container}>
      <div className={classes.item}>
        <Skeleton variant="rect" />
      </div>
    </div>
  );
};

export const getSkeletons = (numberOfSkeletons: number) => {
  const elements = [];

  for (let i = 0; i < numberOfSkeletons; i++) {
    let skel = getPhotoCardSkeleton(`${classes.container}_skeleton_${i}`);
    elements.push(skel);
  }
  return elements;
};

const PhotoSkeletons: FC<{ numberOfSkeletons: number }> = ({
  numberOfSkeletons,
}) => {
  console.log("[PHOTO SKELETONS RENDER]");

  const elements = getSkeletons(numberOfSkeletons);

  return <>{elements}</>;
};

export default PhotoSkeletons;
