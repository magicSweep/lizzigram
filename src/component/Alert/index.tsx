import React, { FC } from "react";
import Portal from "../Portal";
//import styles from "./../../styles/classes.module.scss";
import AlertWidget from "./Alert";
import { useAlert } from "./hook";

const Alert = () => {
  const {
    alertState: { type, message, isShow },
    hideAlert,
  } = useAlert();

  console.log("[RENDER ALERT]");

  if (!isShow) return null;

  return (
    <Portal type="alert">
      <AlertWidget type={type} onClose={hideAlert} message={message} />
    </Portal>
  );
};

export default Alert;
