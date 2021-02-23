import React, { FC } from "react";
import classes from "./ModalElements.module.scss";
import AddPhotoForm from "../../form/AddPhotoForm";
import EditPhotoForm from "../../form/EditPhotoForm";
import SearchPhotoForm from "../../form/SearchPhotoForm";
import PhotoSlider from "./../PhotoSlider";
import PhotoDesc from "../../component/PhotoDesc";
import Modal from "../../../component/Modal";

interface IModalElementsProps {
  isShowAddPhotoForm: boolean;
  isShowEditPhotoForm: boolean;
  isShowSearchPhotoForm: boolean;
  isShowPhotoSlider: boolean;
  isShowPhotoDesc: boolean;

  hideAddPhotoForm: () => void;
  hideEditPhotoForm: () => void;
  hideSearchPhotoForm: () => void;
  hidePhotoSlider: () => void;
  hidePhotoDesc: () => void;
}

/* FINAL COMPONENTS */

const _refAddPhotoForm = <AddPhotoForm />;

const IAddPhotoForm = () => _refAddPhotoForm;

const _refEditPhotoForm = <EditPhotoForm />;

const IEditPhotoForm = () => _refEditPhotoForm;

const _refSearchPhotoForm = <SearchPhotoForm />;

const ISearchPhotoForm = () => _refSearchPhotoForm;

const _refPhotoSlider = <PhotoSlider />;

const IPhotoSlider = () => _refPhotoSlider;

const _refPhotoDesc = <PhotoDesc />;

const IPhotoDesc = () => _refPhotoDesc;

/* END FINAL COMPONENTS */

const ModalElements: FC<IModalElementsProps> = ({
  isShowAddPhotoForm,
  isShowEditPhotoForm,
  isShowSearchPhotoForm,
  isShowPhotoSlider,
  isShowPhotoDesc,

  hideAddPhotoForm,
  hideEditPhotoForm,
  hideSearchPhotoForm,
  hidePhotoSlider,
  hidePhotoDesc,
}) => {
  return (
    <>
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

      {isShowPhotoDesc && (
        <Modal onClose={hidePhotoDesc} type="form">
          <div className={classes.form}>
            <IPhotoDesc />
          </div>
        </Modal>
      )}
    </>
  );
};

export default ModalElements;
