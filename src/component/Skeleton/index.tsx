import React, { FC } from "react";
import classes from "./Skeleton.module.scss";

export interface ISkeletonProps {
  variant: "rect" | "circle" | "tag";
  /* width?: number;
  height?: number; */
}

const Skeleton: FC<ISkeletonProps> = ({ variant }) => {
  let skeletonClasses = classes.root;

  if (variant === "rect") {
    skeletonClasses += ` ${classes.rect}`;
  } else if (variant === "circle") {
    skeletonClasses += ` ${classes.circle}`;
  } else if (variant === "tag") {
    skeletonClasses += ` ${classes.tag}`;
  }

  console.log("[RENDER SKELETON", variant);

  return (
    <span
      className={skeletonClasses}
      /* style={{
        width: `${width}px`,
        height: `${height}px`,
      }} */
    ></span>
  );
};

export default Skeleton;
