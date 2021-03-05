import React from "react";
import commonClasses from "./../classes.module.scss";
import classes from "./TagsError.module.scss";

const TagsError = () => {
  return (
    <div className={commonClasses.tagsContainer}>
      <p className={classes.error}> Упс, тэги не загрузились...</p>
    </div>
  );
};

export default TagsError;
