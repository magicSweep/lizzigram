import React, { FC } from "react";
import BtnWithIcon from "../../component/BtnWithIcon";
import BtnWithMenu from "../../component/BtnWithMenu";
import IconButton from "../../component/IconButton";
import DescIcon from "../../component/Icons/DescIcon";
import DownloadIcon from "../../component/Icons/DownloadIcon";
import EditIcon from "../../component/Icons/EditIcon";
import MoreIcon from "../../component/Icons/MoreIcon";
import { downloadPhotoUrl } from "../../config";

export interface IMoreActionsBtnProps {
  index?: number;
  photo: TPhotoData;
  isEditable: boolean;
  showEditPhotoForm: (photo: TPhotoData) => void;
  showPhotoDesc: (photo: TPhotoData) => void;
}

const MoreActionsBtn: FC<IMoreActionsBtnProps> = ({
  index,
  photo,
  isEditable,
  showEditPhotoForm,
  showPhotoDesc,
}) => {
  const onShowEditPhotoForm = (event: any) => {
    if (showEditPhotoForm) showEditPhotoForm(photo);
  };

  const onShowPhotoDesc = (event: any) => {
    if (showPhotoDesc) showPhotoDesc(photo);
  };

  return (
    <BtnWithMenu
      menuButton={
        <IconButton
          type="circle"
          icon={<MoreIcon color="secondary" width={28} height={28} />}
          ariaLabel={"Доступные действия для фото"}
          onClick={undefined}
          disabled={false}
        />
      }
      //type: "CONTAINED",
      disabled={false}
    >
      {isEditable && (
        <BtnWithIcon
          iconStart={<EditIcon width={18} height={18} />}
          label={"Изменить"}
          ariaLabel={"Изменить фото"}
          onClick={onShowEditPhotoForm}
          disabled={false}
          fullWidth={true}
          color="primary"
        />
      )}
      <BtnWithIcon
        iconStart={<DescIcon width={20} height={20} />}
        label={"Показать описание"}
        ariaLabel={"Показать описание фотографии"}
        onClick={onShowPhotoDesc}
        fullWidth={true}
        color="primary"
        disabled={false}
      />
      <BtnWithIcon
        iconStart={<DownloadIcon width={20} height={20} />}
        label={"Скачать оригинальный файл"}
        ariaLabel={"Скачать оригинальный файл фото"}
        href={`${downloadPhotoUrl}/${photo.photo.googleDriveId}`}
        disabled={false}
        fullWidth={true}
        color="primary"
        download="lizzy-photo"
      />
    </BtnWithMenu>
  );
};

/* 
<a href="/download/1J4yFOQMprUYK_lMmbz5NO_eSAGGmrcou" download="lizzy-photo">Download image</a>
*/

export default MoreActionsBtn;
