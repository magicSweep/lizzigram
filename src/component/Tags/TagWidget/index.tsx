import React, { FC } from "react";
import commonClasses from "./../classes.module.scss";
import { getRootClassesByColor } from "./../helper";

export interface ITagWidgetProps {
  label: string;
  color: TColorProp;
}

const TagWidget: FC<ITagWidgetProps> = ({ label, color }) => {
  //let flabelClasses = classes.label;
  let rootClasses = `${commonClasses.root} ${getRootClassesByColor(color)}`;

  return (
    <>
      <span className={rootClasses}>{`#${label}`}</span>
    </>
  );
};

export default TagWidget;
