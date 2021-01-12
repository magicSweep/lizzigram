//import { memo } from "react";
import React, { FC } from "react";
import Skeleton from "../../component/Skeleton";
import classes from "./TagsSkeletons.module.scss";

const getSkeletons = (numberOfSkeletons: number) => {
  const elements = [];

  for (let i = 0; i < numberOfSkeletons; i++) {
    elements.push(
      <div
        key={classes.container + "_skeleton_" + i}
        className={classes.container}
      >
        <Skeleton variant="tag" />
      </div>
    );
  }
  return elements;
};

const TagsSkeletons: FC<{ numberOfSkeletons: number }> = ({
  numberOfSkeletons,
}) => {
  console.log("[PHOTO SKELETONS RENDER]");

  const elements = getSkeletons(numberOfSkeletons);

  return <>{elements}</>;
};

export default TagsSkeletons;
