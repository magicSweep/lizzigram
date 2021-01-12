import { useState } from "react";
import styles from "./../../styles/classes.module.scss";

export interface IBClasses {
  bg: string;
  mouseDown: string;
}

export const useButtonClick = (classes?: IBClasses) => {
  let bgClass = styles.buttonBg;
  let mouseDownClass = styles.mouseDownBg;

  if (classes) {
    bgClass = classes.bg;
    mouseDownClass = classes.mouseDown;
  }

  const [finalBgClass, setClass] = useState(bgClass);

  const onMouseDown = () => {
    setClass(mouseDownClass);
  };

  const onMouseUp = () => {
    setClass(bgClass);
  };

  return {
    onMouseUp,
    onMouseDown,
    bgClass: finalBgClass,
  };
};
