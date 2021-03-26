import React, { FC } from "react";
import BtnWithIcon from "../../../component/BtnWithIcon";
import IconButton from "../../../component/IconButton";
import DeleteIcon from "../../../component/Icons/DeleteIcon";
import PlusIcon from "../../../component/Icons/PlusIcon";
import SearchIcon from "../../../component/Icons/SearchIcon";
import classes from "./PhotosToolBtns.module.scss";

const PhotosToolBtns: FC<IPhotosToolBtnsWidgetProps> = ({
  isShow,
  isEditor,
  isSearch,
  showAddPhotoForm,
  showSearchPhotoForm,
  resetSearchState,
}) => {
  const addPhotoBtnClasses = isShow
    ? `${classes.addPhotoButton} ${classes.show}`
    : `${classes.addPhotoButton} ${classes.hideAddPhotoBtn}`;

  const searchBtnsClasses = isShow
    ? `${classes.searchBtns} ${classes.show}`
    : `${classes.searchBtns} ${classes.hideSearchBtn}`;

  return (
    <div className={classes.root}>
      {isEditor && (
        <div className={addPhotoBtnClasses}>
          <BtnWithIcon
            iconStart={<PlusIcon width={16} height={16} />}
            disabled={false}
            ariaLabel="Добавить фото"
            onClick={showAddPhotoForm}
            label="Добавить фото"
            color="secondary"
          />
        </div>
      )}
      <div className={searchBtnsClasses}>
        <div className={classes.searchBtn}>
          <IconButton
            type="circle"
            icon={<SearchIcon width={32} height={32} />}
            onClick={showSearchPhotoForm}
            ariaLabel=""
          />
        </div>
        {isSearch && (
          <BtnWithIcon
            iconStart={<DeleteIcon width={16} height={16} />}
            disabled={false}
            ariaLabel="Отменить поиск"
            onClick={resetSearchState}
            label="Отменить поиск"
            color="secondary"
          />
        )}
      </div>
    </div>
  );
};

export default PhotosToolBtns;
