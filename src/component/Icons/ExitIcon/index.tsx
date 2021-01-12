import React, { FC } from "react";
import BaseIcon, { IIconProps } from "./../BaseIcon";
import classes from "./../../../styles/classes.module.scss";

const exitSvg = (
  <>
    <g>
      <path d="m13.5 24h-11c-1.378 0-2.5-1.122-2.5-2.5v-19c0-1.378 1.122-2.5 2.5-2.5h11c1.378 0 2.5 1.122 2.5 2.5v6c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-6c0-.827-.673-1.5-1.5-1.5h-11c-.827 0-1.5.673-1.5 1.5v19c0 .827.673 1.5 1.5 1.5h11c.827 0 1.5-.673 1.5-1.5v-6c0-.276.224-.5.5-.5s.5.224.5.5v6c0 1.378-1.122 2.5-2.5 2.5z" />
    </g>
    <g>
      <path d="m23.5 12.5h-15c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h15c.276 0 .5.224.5.5s-.224.5-.5.5z" />
    </g>
    <g>
      <path d="m19.5 16.5c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l3.647-3.647-3.646-3.646c-.195-.195-.195-.512 0-.707s.512-.195.707 0l4 4c.195.195.195.512 0 .707l-4 4c-.098.097-.226.146-.354.146z" />
    </g>
  </>
);

const ExitIcon: FC<IIconProps> = ({ width, height, iconClass, color }) => {
  const fIconClass = iconClass ? iconClass : classes.primaryColorBg;

  return (
    <BaseIcon
      svgContent={exitSvg}
      width={width}
      height={height}
      iconClass={fIconClass}
      viewBox="0 0 24 24"
      color={color}
    />
  );
};

export default ExitIcon;
