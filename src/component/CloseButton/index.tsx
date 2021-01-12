import React, { FC } from "react";
import classes from "./CloseButton.module.scss";
//import styles from "./../../styles/classes.module.scss";
import { useButtonClick } from "../Button/hook";

export interface ICloseButtonProps {
  ariaLabel: string;
  disabled: boolean;
  onClick: (event: any) => void;
}

const CloseButton: FC<ICloseButtonProps> = ({
  onClick,
  disabled,
  ariaLabel,
}) => {
  const { bgClass, onMouseDown, onMouseUp } = useButtonClick();

  /*   let textClasses = `${styles.labelFont} ${classes.text}`;
  
    if (disabled) textClasses += ` ${styles.disabledColor}`;
  
    const rootClasses = `${classes.root} ${bgClass}`; */

  let rootClasses = `${classes.root} ${bgClass}`;

  return (
    <button
      disabled={disabled}
      aria-label={ariaLabel}
      className={rootClasses}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <span className={classes.container}>
        <svg
          width={20}
          height={20}
          className={classes.svg}
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </span>
    </button>
  );
};

export default CloseButton;
