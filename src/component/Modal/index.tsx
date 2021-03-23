import React, { FC } from "react";
import Portal from "../Portal";
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
