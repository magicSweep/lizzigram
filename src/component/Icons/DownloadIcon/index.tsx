import React, { FC } from "react";
import BaseIcon, { IIconProps } from "./../BaseIcon";
//import classes from "./../../../styles/classes.module.scss";

const downloadSvg = <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>;

const DownloadIcon: FC<IIconProps> = ({ width, height, iconClass, color }) => {
  //const fIconClass = iconClass ? iconClass : "";

  return (
    <BaseIcon
      svgContent={downloadSvg}
      width={width}
      height={height}
      iconClass={iconClass}
      viewBox="0 0 24 24"
      color={color}
    />
  );
};

export default DownloadIcon;
