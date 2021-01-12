import React from "react";
import classes from "./IShimmer.module.scss";

const IShimmer = () => {
  return (
    <div className={classes.root}>
      <div className={classes.gradient}></div>
      <div className={classes.wrapper}>
        <div className={classes.circleRoot}>
          <div className={classes.circle}>
            <svg
              viewBox="0 0 10 10"
              className={classes.svg}
              width="40"
              height="40"
            >
              <path d="M0,0 L10,0 L10,10 L0,10 L0,0 Z M0,5 C0,7.76142375 2.23857625,10 5,10 C7.76142375,10 10,7.76142375 10,5 C10,2.23857625 7.76142375,2.22044605e-16 5,0 C2.23857625,-2.22044605e-16 0,2.23857625 0,5 L0,5 Z"></path>
            </svg>
          </div>
          <div className={classes.separator}></div>
        </div>

        <div className={classes.linesRoot}>
          <div className={classes.line1}></div>
          <div className={classes.line2}></div>
          <div className={classes.null}></div>
        </div>
      </div>

      {/* <div className={classes.element}> */}
      <div className={classes.circle}></div>
      {/* </div> */}
    </div>
  );
};

export default IShimmer;
