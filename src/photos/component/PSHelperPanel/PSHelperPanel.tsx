import React, { FC } from "react";
import classes from "./PSHelperPanel.module.scss";
import IconButton from "../../../component/IconButton";
import DescIcon from "../../../component/Icons/DescIcon";
import ControlPanel from "../../../component/ControlPanel";
import ImgZoomControlPanel, {
  IImgZoomControlPanelProps,
} from "../../../component/ImgZoomControlPanel";
import DownloadIcon from "../../../component/Icons/DownloadIcon";
import { downloadPhotoUrl } from "../../../config";

export interface IPSHelperPanelProps extends IImgZoomControlPanelProps {
  controller: ICarouselController<ICarouselState>;
  activePhoto: TPhotoData;
  //isShowDesc: boolean;
}

interface IPSHelperPanelWidgetProps extends IPSHelperPanelProps {
  showDesc: (photo: TPhotosData) => void;
}

const PSHelperPanel: FC<IPSHelperPanelWidgetProps> = ({
  controller,
  activePhoto,
  //onShowDesc,
  //isShowDesc,
  showDesc,
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
          onClick={showDesc}
          ariaLabel="Показать описание фото..."
        />
      </div>

      <div className={classes.downloadIcon}>
        <IconButton
          type="circle"
          icon={<DownloadIcon color="secondary" width={28} height={28} />}
          href={`${downloadPhotoUrl}/${activePhoto.photo.googleDriveId}`}
          download="lizzy-image"
          ariaLabel="Скачать оригинальный файл..."
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
