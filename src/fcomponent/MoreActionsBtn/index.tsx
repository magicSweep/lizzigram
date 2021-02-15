import React, { FC } from "react";
import BtnWithIcon from "../../component/BtnWithIcon";
import BtnWithMenu from "../../component/BtnWithMenu";
import IconButton from "../../component/IconButton";
import EditIcon from "../../component/Icons/EditIcon";
import MoreIcon from "../../component/Icons/MoreIcon";

export interface IMoreActionsBtnProps {
  index?: number;
  showEditPhotoForm?: (index: number) => void;
}

const MoreActionsBtn: FC<IMoreActionsBtnProps> = ({
  index,
  showEditPhotoForm,
}) => {
  const onShowEditPhotoForm = (event: any) => {
    if (showEditPhotoForm) showEditPhotoForm(index as number);
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
      <BtnWithIcon
        iconStart={<EditIcon width={18} height={18} />}
        label={"Изменить"}
        ariaLabel={"Изменить фото"}
        onClick={onShowEditPhotoForm}
        disabled={false}
        fullWidth={true}
        color="secondary"
      />
    </BtnWithMenu>
  );
};

export default MoreActionsBtn;
