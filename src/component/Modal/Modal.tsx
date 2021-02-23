import React, { FC, useEffect } from "react";
import ModalCloseButton from "../ModalCloseButton";
import classes from "./Modal.module.scss";
//import styles from "./../../styles/classes.module.scss";
//import CloseButton from "../CloseButton";

type TModalType = "slider" | "form";

export interface IModalProps {
  type: TModalType;
  //show: boolean;
  onClose: (event: any) => void | undefined;
  children: any;
}

const Modal: FC<IModalProps> = ({ onClose, type, children }) => {
  /* useEffect(() => {
    if (show === true) document.body.classList.add(styles.stopScrolling);
    else document.body.classList.remove(styles.stopScrolling);
  }, [show]); */

  /* let wrapperClass = "";

  if (type === "form") wrapperClass = classes.wrapperForm;
  else if (type === "slider") wrapperClass = classes.wrapperSlider; */

  console.log("[RENDER MODAL]", type);

  if (type === "slider") {
    return (
      <div className={classes.root}>
        <div className={classes.overlay} onClick={onClose}></div>
        <ModalCloseButton
          onClick={onClose}
          color="secondary"
          ariaLabel={"Закрыть окно"}
        />
        {children}
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.overlay} onClick={onClose}></div>
      <div className={classes.dialog}>
        <div className={classes.content}>
          <ModalCloseButton
            onClick={onClose}
            color="secondary"
            ariaLabel={"Закрыть окно"}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

/* import React, { FC, useEffect } from "react";
import classes from "Module.module.scss";
import styles from "./../../styles/classes.module.scss";
import CloseButton from "../CloseButton";

type TModalType = "slider" | "form";

interface IModalProps {
    type: TModalType;
  show: boolean;
  onClose: (event: any) => void | undefined;
  children: any;
}

const Modal: FC<IModalProps> = ({ type, onClose, children }) => {
  /* useEffect(() => {
    if (show === true) document.body.classList.add(styles.stopScrolling);
    else document.body.classList.remove(styles.stopScrolling);
  }, [show]); /

  let wrapperClass = "";

  if (type === "form") wrapperClass = classes.wrapperForm;
  else if (type === "slider") wrapperClass = classes.wrapperSlider;


  return (
    <>
      <div className={classes.backDrop} onClick={onClose}></div>
      <div className={modalClasses}>
        <div className={wrapperClass}>
          <div className={classes.closeButton}>
          <CloseButton
            onClick={onClose}
            ariaLabel="Закрыть модальное окно."
            disabled={false}
          />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
 */
