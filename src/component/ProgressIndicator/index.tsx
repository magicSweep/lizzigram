import React from "react";
import classes from "./ProgressIndicator.module.scss";

const ProgressIndicator = () => {
  return (
    <div className={classes.root}>
      <div className={classes.progressTrack}></div>
      <div className={classes.progressBar} role="progressbar"></div>
    </div>
  );
};

export default ProgressIndicator;
