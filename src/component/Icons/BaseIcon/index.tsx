import React, { FC } from "react";
import styles from "./../../../styles/classes.module.scss";

export interface IIconProps {
  width?: number;
  height?: number;
  iconClass?: string;
  color?: TColorProp;
}

interface IBaseIconProps extends IIconProps {
  svgContent: any;
  viewBox?: string;
}

const BaseIcon: FC<IBaseIconProps> = ({
  width,
  height,
  iconClass,
  viewBox,
  svgContent,
  color = "primary",
}) => {
  let fIconClasses = iconClass ? iconClass : "";

  switch (color) {
    case "primary":
      fIconClasses += ` ${styles.primaryFill}`;
      break;

    case "secondary":
      fIconClasses += ` ${styles.secondaryFill}`;
      break;

    case "disabled":
      fIconClasses += ` ${styles.disabledFill}`;
      break;

    default:
      throw new Error(`No implementation for color - ${color}`);
  }

  return (
    <svg
      className={fIconClasses}
      viewBox={viewBox}
      width={width}
      height={height}
      focusable={false}
      aria-hidden={true}
    >
      {svgContent}
    </svg>
  );
};

export default BaseIcon;
