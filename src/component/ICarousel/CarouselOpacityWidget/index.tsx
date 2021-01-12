import React, { ReactNode } from "react";
//import { makeStyles } from "@material-ui/core/styles";
import { updateChildren } from "./helper";
import classes from "./CarouselOpacity.module.scss";

interface ICarouselOpacityProps {
  controller: ICarouselOpacityController<ICarouselState>;
  children: ReactNode[];
  //onFetchMore?: () => void;
}

const CarouselOpacityWidget = ({
  controller,
  children,
}: //onFetchMore,
ICarouselOpacityProps) => {
  const updatedChildren = updateChildren(
    children,
    controller.activeIndex,
    //controller.isTranslated,
    //controller.opacity,
    controller.activeItemRef,
    classes
  );

  console.log("[CAROUSEL OPACITY WIDGET] RENDER", controller.activeIndex);

  return (
    <div className={classes.root}>
      <ul className={classes.list}>{updatedChildren}</ul>
    </div>
  );
};

export default CarouselOpacityWidget;
