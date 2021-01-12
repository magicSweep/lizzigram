import React, { FC, useState } from "react";
import classes from "./Button.module.scss";
import styles from "./../../styles/classes.module.scss";
import { useButtonClick } from "./hook";

//export type BUTTON_TYPE = "TEXT" | "OUTLINED" | "CONTAINED";

export interface IButtonProps {
  label: string;
  ariaLabel?: string;
  //type: BUTTON_TYPE;
  onClick?: (event: any) => void | Promise<void>;
  disabled?: boolean;
  index?: number;
}

/* export const getButtonClasses = (type: BUTTON_TYPE): string => {
  let buttonClasses: string = classes.Button;

  switch (type) {
    case "TEXT":
      buttonClasses += " " + classes["Button--Text"];
      break;
    case "OUTLINED":
      buttonClasses += " " + classes["Button--Outlined"];
      break;
    case "CONTAINED":
      buttonClasses += " " + classes["Button--Contained"];
      break;

    default:
      console.error("Bad button type " + type);
      buttonClasses += " " + classes["Button--Text"];
      break;
  }

  return buttonClasses;
};
 */

const Button: FC<IButtonProps> = ({
  label,
  ariaLabel,
  //type,
  disabled,
  onClick,
  index = 0,
}) => {
  //let buttonClasses: string = getButtonClasses(type);

  const { bgClass, onMouseDown, onMouseUp } = useButtonClick();

  let textClasses = `${styles.labelFont} ${classes.text}`;

  if (disabled) textClasses += ` ${styles.disabledColor}`;

  const wrapperClasses = `${classes.wrapper} ${bgClass}`;

  console.log("[RENDER BUTTON]");

  return (
    <button
      className={classes.root}
      onClick={disabled ? undefined : onClick}
      onMouseDown={disabled ? undefined : onMouseDown}
      onMouseUp={disabled ? undefined : onMouseUp}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span
        className={
          disabled ? `${classes.wrapper} ${classes.disabled}` : wrapperClasses
        }
      >
        <span className={classes.container}>
          <span data-index={index} className={textClasses}>
            {label}
          </span>
        </span>
      </span>
    </button>
  );
};

export default Button;
