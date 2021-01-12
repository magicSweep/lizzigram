import React, { FC } from "react";
import BaseIcon, { IIconProps } from "./../BaseIcon";
//import classes from "./../../../styles/classes.module.scss";

const editSvg = (
  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
);

const EditIcon: FC<IIconProps> = ({ width, height, iconClass, color }) => {
  //const fIconClass = iconClass ? iconClass : "";

  return (
    <BaseIcon
      svgContent={editSvg}
      width={width}
      height={height}
      iconClass={iconClass}
      viewBox="0 0 24 24"
      color={color}
    />
  );
};

export default EditIcon;
