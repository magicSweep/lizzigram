import React, { FC } from "react";
import classes from "./ControlPanel.module.scss";

interface IControlPanelProps {
  controller: ICarouselController<ICarouselState>;
}

const svg = (
  <svg
    width={12}
    height={12}
    className={classes.svg}
    viewBox="0 0 512.002 512.002"
  >
    <g>
      <g>
        <path d="M388.425,241.951L151.609,5.79c-7.759-7.733-20.321-7.72-28.067,0.04c-7.74,7.759-7.72,20.328,0.04,28.067l222.72,222.105    L123.574,478.106c-7.759,7.74-7.779,20.301-0.04,28.061c3.883,3.89,8.97,5.835,14.057,5.835c5.074,0,10.141-1.932,14.017-5.795    l236.817-236.155c3.737-3.718,5.834-8.778,5.834-14.05S392.156,245.676,388.425,241.951z" />
      </g>
    </g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
  </svg>
);

const ControlPanel: FC<IControlPanelProps> = ({ controller }) => {
  console.log(
    "[CONTROL PANEL] RENDER",
    controller.activeIndex,
    controller.itemsLength,
    controller.onFetchMore,
    controller.activeIndex <= controller.itemsLength - 1,
    controller.activeIndex <= controller.itemsLength - 1 &&
      controller.onFetchMore
  );

  return (
    <div className={classes.root}>
      {controller.activeIndex > 0 && (
        <div className={classes.arrow} onClick={controller.onDecreaseIndex}>
          {svg}
        </div>
      )}

      <div
        ref={controller.containerRef}
        onMouseDown={controller.onMouseDown}
        onTouchStart={controller.onTouchStart}
        /*  onTouchMove={controller.onTouchMove} */
        onTouchEnd={controller.onTouchEnd}
        className={classes.slider}
      ></div>

      {(controller.activeIndex < controller.itemsLength - 1 ||
        (controller.activeIndex >= controller.itemsLength - 1 &&
          controller.onFetchMore)) && (
        <div className={classes.arrow} onClick={controller.onIncreaseIndex}>
          {svg}
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
