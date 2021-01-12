import React, { FC } from "react";
import classes from "./TagWidget.module.scss";
import styles from "./../../styles/classes.module.scss";

export interface ITagWidgetProps {
  label: string;
  color: TColorProp;
}

const TagWidget: FC<ITagWidgetProps> = ({ label, color }) => {
  let flabelClasses = classes.label;
  let frootClasses = classes.root;

  switch (color) {
    case "primary":
      flabelClasses += ` ${styles.primaryColor}`;
      frootClasses += ` ${styles.primaryColorBorder}`;
      break;

    case "secondary":
      flabelClasses += ` ${styles.secondaryColor}`;
      frootClasses += ` ${styles.secondaryColorBorder}`;
      break;

    case "disabled":
      flabelClasses += ` ${styles.disabledColor}`;
      frootClasses += ` ${styles.disabledBorder}`;
      break;

    default:
      throw new Error(`No implementation for color - ${color}`);
  }

  return (
    <>
      <div className={frootClasses}>
        <span className={flabelClasses}>{`#${label}`}</span>
      </div>
    </>
  );
};

export default TagWidget;
