//import { memo } from "react";
import React, { FC } from "react";
import Skeleton from "../../Skeleton";
import classes from "./TagsSkeletons.module.scss";
import checkboxClasses from "./../TagsCheckbox/TagsCheckbox.module.scss";
import { numberOfTagsByType, numberOfTagsByPhoto } from "../../../config";
import styles from "./../../../styles/classes.module.scss";
//import commonClasses from "./../classes.module.scss";

const getTagCheckboxSkeletons = (numberOfSkeletons: number[]) => {
  const elements: any[][] = [];

  for (let i in numberOfSkeletons) {
    elements[i] = [];

    for (let y = 0; y < numberOfSkeletons[i]; y++) {
      elements[i].push(
        <div
          key={`${classes.container}_skeleton_${i}_${y}`}
          className={classes.container}
        >
          <Skeleton variant="tag" />
        </div>
      );
    }
  }
  return (
    <>
      <h3 className={`${styles.primaryColor} ${checkboxClasses.title}`}>
        Настроение:
      </h3>
      <ul className={checkboxClasses.container}>{elements[0]}</ul>
      <h3 className={`${styles.secondaryColor} ${checkboxClasses.title}`}>
        С кем:
      </h3>
      <ul className={checkboxClasses.container}>{elements[1]}</ul>
      <h3 className={`${styles.warningColor} ${checkboxClasses.title}`}>
        Где:
      </h3>
      <ul className={checkboxClasses.container}>{elements[2]}</ul>
    </>
  );
};

const getDescSkeletons = (numberOfSkeletons: number) => {
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
  return <>{elements}</>;
};

const TagsSkeletons: FC<{ type: "desc" | "checkbox" }> = ({ type }) => {
  console.log("[PHOTO SKELETONS RENDER]");

  if (type === "desc") return getDescSkeletons(numberOfTagsByPhoto);

  if (type === "checkbox") return getTagCheckboxSkeletons(numberOfTagsByType);

  return null;
};

export default TagsSkeletons;
