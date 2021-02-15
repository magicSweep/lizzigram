import React, { FC } from "react";
//import Button from "@material-ui/core/Button";
import Modal from "../../../component/Modal";
import WallOfPhotos from "../../../container/WallOfPhotos";
import AddPhotoForm from "../../form/AddPhotoForm";
import EditPhotoForm from "../../form/EditPhotoForm";
import SearchPhotoForm from "../../form/SearchPhotoForm";
//import { IAuthUser } from "./../../../types";
import { usePhotoContainer } from "./hook";
//import { IPhotosState } from "../../types";
//import { makeStyles } from "@material-ui/core/styles";
//import SearchButton from "../../../component/UI/SearchButton";
import PhotoSlider from "./../PhotoSlider";
import classes from "./Photos.module.scss";
import BtnWithIcon from "../../../component/BtnWithIcon";
import PlusIcon from "../../../component/Icons/PlusIcon";
import IconButton from "../../../component/IconButton";
import SearchIcon from "../../../component/Icons/SearchIcon";
import DeleteIcon from "../../../component/Icons/DeleteIcon";

//!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!1
// CHANGE THIS
type IAuthUser = any;

export interface IPhotosProps {
  authUser: IAuthUser;
  authLoading: boolean;
  //photoState: IPhotosState;
  //loadMore: () => void;
}

/* const useStyles = makeStyles({
  addPhotoButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
  },
}); */

/* FINAL COMPONENTS */

const _refAddPhotoForm = <AddPhotoForm />;

const IAddPhotoForm = () => _refAddPhotoForm;

const _refEditPhotoForm = <EditPhotoForm />;

const IEditPhotoForm = () => _refEditPhotoForm;

const _refSearchPhotoForm = <SearchPhotoForm />;

const ISearchPhotoForm = () => _refSearchPhotoForm;

const _refWallOfPhotos = <WallOfPhotos />;

const IWallOfPhotos = () => _refWallOfPhotos;

const _refPhotoSlider = <PhotoSlider />;

const IPhotoSlider = () => _refPhotoSlider;

/* END FINAL COMPONENTS */

export const Photos: FC<IPhotosProps> = ({
  authUser,
  authLoading,
  //photoState,
  //loadMore,
}) => {
  const {
    //authUser,
    //authLoading,
    isSearch,
    isShowAddPhotoForm,
    isShowEditPhotoForm,
    isShowSearchPhotoForm,
    isShowPhotoSlider,

    showAddPhotoForm,
    //showEditPhotoForm,
    showSearchPhotoForm,
    hideAddPhotoForm,
    hideEditPhotoForm,
    hideSearchPhotoForm,
    hidePhotoSlider,
    resetSearchState,
  } = usePhotoContainer();

  //const { photoState, loadMore } = usePhotos();
  //const classes = useStyles();

  /* const onShowEditPhotoForm = (event: any) => {
    // GET PHOTO FROM EVENT TARGET AND PHOTOS STATE

    const photo = Array.from(photoState.photos.entries())[0];

    showEditPhotoForm({ id: photo[0], photo: photo[1] });
  }; */

  const isAuth = authUser && authUser.uid;

  const isEditor = authUser && authUser.isEditor;

  //const isLoading = authLoading || photosLoading;
  const isLoading = authLoading;

  console.log("[RENDER PHOTOS WIDGET]");

  return (
    <div className={classes.root}>
      {/*   {isLoading && <p>...Проверка аккаунта, пожалуйста, подождите.</p>}
      {!isLoading && !isAuth && (
        <p>Пожалуйста войдите в свой Google аккаунт.</p>
      )} */}
      {!isLoading && isAuth && (
        <>
          <>
            {isEditor && (
              <div className={classes.addPhotoButton}>
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
            <div className={classes.searchBtns}>
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
            {/* if searchState not equal init search state -> show cancel search button */}
          </>

          <IWallOfPhotos />

          {isShowPhotoSlider && (
            <Modal onClose={hidePhotoSlider} type="slider">
              <IPhotoSlider />
            </Modal>
          )}

          {isShowAddPhotoForm && (
            <Modal onClose={hideAddPhotoForm} type="form">
              <div className={classes.form}>
                <IAddPhotoForm />
              </div>
            </Modal>
          )}

          {isShowEditPhotoForm && (
            <Modal onClose={hideEditPhotoForm} type="form">
              <div className={classes.form}>
                <IEditPhotoForm />
              </div>
            </Modal>
          )}

          {isShowSearchPhotoForm && (
            <Modal onClose={hideSearchPhotoForm} type="form">
              <div className={classes.form}>
                <ISearchPhotoForm />
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default Photos;
