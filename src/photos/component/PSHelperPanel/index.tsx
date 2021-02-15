import React, { FC } from "react";
import classes from "./PSHelperPanel.module.scss";
import IconButton from "../../../component/IconButton";
import DescIcon from "../../../component/Icons/DescIcon";
import ControlPanel from "../../../component/ControlPanel";
import ImgZoomControlPanel, {
  IImgZoomControlPanelProps,
} from "../../../component/ImgZoomControlPanel";

interface IPSHelperPanelProps extends IImgZoomControlPanelProps {
  controller: ICarouselController<ICarouselState>;
  onShowDesc: (event: any) => void;
  //isShowDesc: boolean;
}

const PSHelperPanel: FC<IPSHelperPanelProps> = ({
  controller,
  onShowDesc,
  //isShowDesc,
  onZoomIn,
  onZoomOut,
  onCancel,
  maxZoom,
  minZoom,
  zoom,
}) => {
  return (
    <>
      <div className={classes.showDescButton}>
        <IconButton
          type="circle"
          icon={<DescIcon color="secondary" width={30} height={38} />}
          onClick={onShowDesc}
          ariaLabel="Показать описание фото..."
        />
      </div>

      <div className={classes.imgZoomControlPanel}>
        <ImgZoomControlPanel
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onCancel={onCancel}
          maxZoom={maxZoom}
          minZoom={minZoom}
          zoom={zoom}
        />
      </div>

      <div
        className={classes.controlPanel}
        onClick={(event: any) => {
          event.stopPropagation();
        }}
      >
        <ControlPanel controller={controller} />
      </div>
    </>
  );
};

export default PSHelperPanel;
