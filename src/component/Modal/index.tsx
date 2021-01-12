import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Portal from "../Portal";
import styles from "./../../styles/classes.module.scss";
import ModalWidget, { IModalProps } from "./Modal";

const Modal: FC<IModalProps> = ({ onClose, type, children }) => {
  console.log("[RENDER MODAL]");

  //if (!elementRef.current) return null;

  return (
    <Portal type="modal">
      <ModalWidget type={type} onClose={onClose}>
        {children}
      </ModalWidget>
    </Portal>
  );
};

export default Modal;
