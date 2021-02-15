import React, { FC } from "react";
import IconButton from "../IconButton";
import CloseIcon from "../Icons/CloseIcon";
import ZoomInIcon from "../Icons/ZoomInIcon";
import ZoomOutIcon from "../Icons/ZoomOutIcon";
import classes from "./ImgZoomControlPanel.module.scss";

export interface IImgZoomControlPanelProps {
  onZoomIn: (event: any) => void;
  onZoomOut: (event: any) => void;
  onCancel: (event: any) => void;
  maxZoom: number;
  minZoom: number;
  zoom: number;
}

const ImgZoomControlPanel: FC<IImgZoomControlPanelProps> = ({
  onZoomIn,
  onZoomOut,
  onCancel,
  maxZoom,
  minZoom,
  zoom,
}) => {
  console.log("[IMAGE ZOOM CONTROL PANEL] RENDER");

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.zoom}>
          <IconButton
            ariaLabel="Увеличить масштаб изображения"
            onClick={onZoomIn}
            type="box"
            disabled={zoom === maxZoom}
            icon={<ZoomInIcon color="primary" width={28} height={28} />}
          />
        </div>

        <div className={classes.cancel}>
          <IconButton
            ariaLabel="Изначальный масштаб изображения"
            onClick={onCancel}
            type="box"
            disabled={zoom === 1}
            icon={<CloseIcon color="secondary" width={22} height={22} />}
          />
        </div>

        <div className={classes.zoom}>
          <IconButton
            ariaLabel="Уменьшить масштаб изображения"
            onClick={onZoomOut}
            type="box"
            disabled={zoom === minZoom}
            icon={<ZoomOutIcon color="primary" width={28} height={28} />}
          />
        </div>
      </div>
    </div>
  );
};

export default ImgZoomControlPanel;
