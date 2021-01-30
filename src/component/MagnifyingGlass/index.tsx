import React from "react";
import classes from "./MagnifyingGlass.module.scss";

const MagnifyingGlass = () => {
  return (
    <div className={classes["img-zoom-container"]}>
      <img
        id="myimage"
        src="img_girl.jpg"
        width="300"
        height="240"
        alt="Girl"
      />
      <div id="myresult" className={classes["img-zoom-result"]}></div>
    </div>
  );
};

export default MagnifyingGlass;
