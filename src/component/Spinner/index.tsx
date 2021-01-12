import React from "react";
import classes from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={classes.root}>
      <div className={classes.circle}></div>
    </div>
  );
};

export default Spinner;
