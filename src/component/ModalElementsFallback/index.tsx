import React, { FC } from "react";
//import ReactDOM from "react-dom";
import Portal from "../Portal";
import Spinner from "../Spinner";
//import styles from "./../../styles/classes.module.scss";
import classes from "./../Modal/Modal.module.scss";

interface IModalElementsFallbackProps {
  onClose: (event: any) => void;
}

const ModalElementsFallback: FC<IModalElementsFallbackProps> = ({
  onClose,
}) => {
  console.log("[RENDER MODAL ELEMENTS FALLBACK]");

  //if (!elementRef.current) return null;

  return (
    <Portal type="modal">
      <div className={classes.root}>
        <div className={classes.overlay} onClick={onClose}></div>
        <Spinner />
      </div>
    </Portal>
  );
};

export default ModalElementsFallback;
