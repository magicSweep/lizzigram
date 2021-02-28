import React, { FC, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./../../styles/classes.module.scss";
import classes from "./Portal.module.scss";

//export const modalId = "modal";
//export const alertId = "alert";

export interface IPortalProps {
  children: any;
  type: "modal" | "alert" | "context-menu";
}

let modalRoot: any = undefined;
let alertRoot: any = undefined;

const Portal: FC<IPortalProps> = ({ children, type }) => {
  /* const [element, setElement] = useState<HTMLDivElement>(() => {
    const elem = document.createElement("div");
    if (type === "modal" || type === "context-menu")
      elem.classList.add(classes.modal);
    else if (type === "alert") elem.classList.add(classes.alert);
    return elem;
  }); */
  //const elementRef: any = useRef();

  const [element, setElement] = useState<HTMLDivElement>();

  useEffect(() => {
    const elem = document.createElement("div");
    if (type === "modal" || type === "context-menu")
      elem.classList.add(classes.modal);
    else if (type === "alert") elem.classList.add(classes.alert);

    setElement(elem);
  }, []);

  useEffect(() => {
    if (!element) return;

    if (type === "modal" || type === "context-menu") {
      if (modalRoot === undefined) {
        modalRoot = document.querySelector("div#modal");
        if (!modalRoot) throw new Error("No modal root element");
      }
    } else if (type === "alert") {
      if (alertRoot === undefined) {
        alertRoot = document.querySelector("div#alert");
        if (!alertRoot) throw new Error("No alert root element");
      }
    } else {
      throw new Error(`Bad type - ${type}`);
    }
  }, [element]);

  useEffect(() => {
    if (!element) return;

    //elementRef.current = document.createElement("div");
    if (type === "modal" || type === "context-menu")
      modalRoot.appendChild(element);
    else if (type === "alert") alertRoot.appendChild(element);

    return () => {
      if (type === "modal" || type === "context-menu")
        modalRoot.removeChild(element);
      else if (type === "alert") alertRoot.removeChild(element);
    };
  }, [element]);

  useEffect(() => {
    if (type === "modal") document.body.classList.add(styles.stopScrolling);

    return () => {
      if (type === "modal")
        document.body.classList.remove(styles.stopScrolling);
    };
  }, []);

  console.log("[RENDER PORTAL]");

  //if (!elementRef.current) return null;

  if (!element) return null;

  return ReactDOM.createPortal(children, element);
};

export default Portal;
