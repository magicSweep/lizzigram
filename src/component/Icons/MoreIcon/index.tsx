import React, { FC } from "react";
import BaseIcon, { IIconProps } from "./../BaseIcon";
//import classes from "./../../../styles/classes.module.scss";

const moreSvg = (
  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
);

const MoreIcon: FC<IIconProps> = ({ width, height, iconClass, color }) => {
  //const fIconClass = iconClass ? iconClass : "";

  return (
    <BaseIcon
      svgContent={moreSvg}
      width={width}
      height={height}
      iconClass={iconClass}
      viewBox="0 0 24 24"
      color={color}
    />
  );
};

export default MoreIcon;
