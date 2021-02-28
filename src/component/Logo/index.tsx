import React from "react";
import classes from "./Logo.module.scss";
import logo from "./../../static/logo_23ewe32.png";

const Logo = () => {
  console.log("[RENDER LOGO]");
  return (
    <img
      width={55}
      height={55}
      src={logo}
      /* className={classes.image} */
      alt="Lizzygram лого"
    />
  );
};

export default Logo;
