import React, { FC } from "react";
import IconButton from "../IconButton";
import ArrowIcon from "../Icons/ArrowIcon";
import classes from "./ControlPanel.module.scss";

interface IControlPanelProps {
  controller: ICarouselController<ICarouselState>;
}

const ControlPanel: FC<IControlPanelProps> = ({ controller }) => {
  console.log(
    "[CONTROL PANEL] RENDER",
    controller.activeIndex,
    controller.itemsLength
    /*  controller.onFetchMore,
    controller.activeIndex <= controller.itemsLength - 1,
    controller.activeIndex <= controller.itemsLength - 1 &&
      controller.onFetchMore */
  );

  return (
    <div className={classes.root}>
      <div className={classes.arrow}>
        <IconButton
          ariaLabel="Показать предыдуший слайд"
          onClick={controller.onDecreaseIndex}
          disabled={controller.activeIndex <= 0}
          type="box"
          icon={
            <ArrowIcon
              color="primary"
              width={16}
              height={16}
              direction="left"
            />
          }
        />
      </div>

      <div
        ref={controller.containerRef}
        onMouseDown={controller.onMouseDown}
        onTouchStart={controller.onTouchStart}
        /*  onTouchMove={controller.onTouchMove} */
        onTouchEnd={controller.onTouchEnd}
        className={classes.slider}
      ></div>

      <div className={classes.arrow}>
        <IconButton
          ariaLabel="Показать следующий слайд"
          onClick={controller.onIncreaseIndex}
          type="box"
          disabled={
            !(
              controller.activeIndex < controller.itemsLength - 1 ||
              (controller.activeIndex >= controller.itemsLength - 1 &&
                controller.onFetchMore)
            )
          }
          icon={
            <ArrowIcon
              color="primary"
              width={16}
              height={16}
              direction="right"
            />
          }
        />
      </div>
    </div>
  );
};

export default ControlPanel;
