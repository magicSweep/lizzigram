import React, { FC, useEffect, useRef } from "react";
import classes from "./Alert.module.scss";
//import styles from "./../../styles/classes.module.scss";
import CloseButton from "../CloseButton";

export interface IAlertProps {
  type: TAlertType;
  //show: boolean;
  onClose: (event: any) => void | undefined;
  message: string;
}

const getSvgAndRootClasses = (type: TAlertType): [JSX.Element, string] => {
  switch (type) {
    case "error":
      return [
        <svg
          className={classes.svgError}
          width={28}
          height={28}
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>{" "}
        </svg>,
        `${classes.root} ${classes["error-bg"]}`,
      ];

    case "success":
      return [
        <svg
          className={classes.svgSuccess}
          width={28}
          height={28}
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
        </svg>,
        `${classes.root} ${classes["success-bg"]}`,
      ];

    case "info":
      return [
        <svg
          className={classes.svgInfo}
          width={28}
          height={28}
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path>{" "}
        </svg>,
        `${classes.root} ${classes["info-bg"]}`,
      ];

    case "warning":
      return [
        <svg
          className={classes.svgWarning}
          width={28}
          height={28}
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"></path>{" "}
        </svg>,
        `${classes.root} ${classes["warning-bg"]}`,
      ];

    default:
      throw new Error(`Bad alert type - ${type}`);
  }
};

const Alert: FC<IAlertProps> = ({ type, onClose, message }) => {
  /* useEffect(() => {
    if (show === true) document.body.classList.add(styles.stopScrolling);
    else document.body.classList.remove(styles.stopScrolling);
  }, [show]); */

  /* let wrapperClass = "";

  if (type === "form") wrapperClass = classes.wrapperForm;
  else if (type === "slider") wrapperClass = classes.wrapperSlider; */

  const timerIdRef = useRef<any>();

  useEffect(() => {
    timerIdRef.current = setTimeout(onClose, 5000);

    return () => {
      clearTimeout(timerIdRef.current);
    };
  });

  console.log("[RENDER ALERT WIDGET", type);

  const [svg, rootClasses] = getSvgAndRootClasses(type);

  return (
    <>
      <div className={rootClasses}>
        {svg}
        <div className={classes.content}>
          {/* <div> */}
          <p>{message}</p>
          {/*  </div> */}
        </div>
        <div className={classes.closeButton}>
          <CloseButton
            ariaLabel="Закрыть алерт"
            disabled={false}
            onClick={onClose}
          />
        </div>
      </div>
    </>
  );
};

export default Alert;
