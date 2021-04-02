import React, { FC } from "react";
import classes from "./PSHelperPanel.module.scss";
import IconButton from "../../../component/IconButton";
import DescIcon from "../../../component/Icons/DescIcon";
import ControlPanel from "../../../component/ControlPanel";
import ImgZoomControlPanel, {
  IImgZoomControlPanelProps,
} from "../../../component/ImgZoomControlPanel";
import DownloadIcon from "../../../component/Icons/DownloadIcon";
import { makeDownloadPhotoUrl } from "../../helper";

/* import { downloadPhotoUrl } from "../../../config";

export const makeDownloadPhotoUrl = (activePhoto: TPhotoData) => {
  let downloadUrl = `${downloadPhotoUrl}/${activePhoto.photo.googleDriveId}`;
  if (activePhoto.photo.imageExtention)
    downloadUrl += `.${activePhoto.photo.imageExtention}`;

  return downloadUrl;
} */

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
  /* const downloadImgName = `lizzy-image_${Date.now()}${
    activePhoto.photo.imageExtention
      ? "." + activePhoto.photo.imageExtention
      : ""
  }`; */

  let downloadUrl = makeDownloadPhotoUrl(activePhoto);

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
          onClick={(event) => {
            event.stopPropagation();
          }}
          icon={<DownloadIcon color="secondary" width={28} height={28} />}
          href={downloadUrl}
          /* download={downloadImgName} */
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
