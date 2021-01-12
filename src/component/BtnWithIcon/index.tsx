import React, { FC, forwardRef, useRef, useState } from "react";
import classes from "./BtnWithIcon.module.scss";
import styles from "./../../styles/classes.module.scss";
import { useButtonClick } from "./../Button/hook";

//export type BUTTON_TYPE = "TEXT" | "OUTLINED" | "CONTAINED";

export interface IBtnWithIconProps {
  iconStart?: any;
  iconEnd?: any;
  label: any;
  ariaLabel: string;
  disabled: boolean;
  onClick?: (event: any) => void | undefined;
  fullWidth?: boolean;
  color?: TColorProp;
  htmlFor?: string;
}

const WithLabel: FC<{ children: any; htmlFor?: string }> = ({
  children,
  htmlFor,
}) => {
  if (htmlFor) {
    return (
      <label
        htmlFor={htmlFor}
        className={classes.inputLabel}
        onClick={() => console.log("Label click")}
      >
        {children}
      </label>
    );
  }

  return children;
};

const BtnWithIcon = forwardRef<any, IBtnWithIconProps>(
  (
    {
      iconStart,
      iconEnd,
      label,
      ariaLabel,
      onClick,
      disabled,
      fullWidth,
      color = "primary",
      htmlFor,
    },
    ref
  ) => {
    //let buttonClasses: string = getButtonClasses(type);
    let iEnd,
      iStart = null;

    if (iconStart) {
      iStart = React.cloneElement(iconStart, {
        iconClass: classes.svgStart,
        color: disabled ? "disabled" : color,
      });
    }

    if (iconEnd) {
      iEnd = React.cloneElement(iconEnd, {
        iconClass: classes.svgEnd,
        color: disabled ? "disabled" : color,
      });
    }

    const { bgClass, onMouseDown, onMouseUp } = useButtonClick();

    let textClasses = `${styles.labelFont} ${classes.text}`;

    if (disabled) textClasses += ` ${styles.disabledColor}`;

    //let wrapperClasses = `${classes.wrapper} ${bgClass}`;
    let wrapperClasses = classes.wrapper;

    let rootClasses = classes.root;

    if (fullWidth) {
      rootClasses += ` ${styles.fullWidth}`;
      wrapperClasses += ` ${styles.fullWidth}`;
    }

    console.log("[RENDER BUTTON WITH ICON]");

    return (
      <button
        className={rootClasses}
        onClick={disabled ? undefined : onClick}
        onMouseDown={disabled ? undefined : onMouseDown}
        onMouseUp={disabled ? undefined : onMouseUp}
        disabled={disabled}
        aria-label={ariaLabel}
        ref={ref}
      >
        <WithLabel htmlFor={htmlFor}>
          <span
            className={
              disabled
                ? `${wrapperClasses} ${classes.disabled}`
                : `${wrapperClasses} ${bgClass}`
            }
          >
            <span className={classes.container}>
              {iStart}
              <span className={textClasses}>{label}</span>
              {iEnd}
            </span>
          </span>
        </WithLabel>
      </button>
    );
  }
);

export default BtnWithIcon;

/* import React, { FC, forwardRef, useRef, useState } from "react";
import classes from "./BtnWithIcon.module.scss";
import styles from "./../../styles/classes.module.scss";
import { useButtonClick } from "./../Button/hook";

//export type BUTTON_TYPE = "TEXT" | "OUTLINED" | "CONTAINED";

export interface IBtnWithIconProps {
  iconStart?: any;
  iconEnd?: any;
  label: any;
  ariaLabel: string;
  disabled: boolean;
  onClick?: (event: any) => void | undefined;
  fullWidth?: boolean;
  color?: TColorProp;
  htmlFor?: string;
}

const BtnWithIcon = forwardRef<any, IBtnWithIconProps>(
  (
    {
      iconStart,
      iconEnd,
      label,
      ariaLabel,
      onClick,
      disabled,
      fullWidth,
      color = "primary",
      htmlFor,
    },
    ref
  ) => {
    //let buttonClasses: string = getButtonClasses(type);
    let iEnd,
      iStart = null;

    if (iconStart) {
      iStart = React.cloneElement(iconStart, {
        iconClass: classes.svgStart,
        color: disabled ? "disabled" : color,
      });
    }

    if (iconEnd) {
      iEnd = React.cloneElement(iconEnd, {
        iconClass: classes.svgEnd,
        color: disabled ? "disabled" : color,
      });
    }

    const { bgClass, onMouseDown, onMouseUp } = useButtonClick();

    let textClasses = `${styles.labelFont} ${classes.text}`;

    if (disabled) textClasses += ` ${styles.disabledColor}`;

    //let wrapperClasses = `${classes.wrapper} ${bgClass}`;
    let wrapperClasses = classes.wrapper;

    let rootClasses = classes.root;

    if (fullWidth) {
      rootClasses += ` ${styles.fullWidth}`;
      wrapperClasses += ` ${styles.fullWidth}`;
    }

    console.log("[RENDER BUTTON WITH ICON]");

    return (
      <button
        className={rootClasses}
        onClick={disabled ? undefined : onClick}
        onMouseDown={disabled ? undefined : onMouseDown}
        onMouseUp={disabled ? undefined : onMouseUp}
        disabled={disabled}
        aria-label={ariaLabel}
        ref={ref}
      >
        {htmlFor && (
          <label
            htmlFor={htmlFor}
            className={classes.inputLabel}
            onClick={() => console.log("Label click")}
          >
            {label}
          </label>
        )}

        <span
          className={
            disabled
              ? `${wrapperClasses} ${classes.disabled}`
              : `${wrapperClasses} ${bgClass}`
          }
        >
          <span className={classes.container}>
            {iStart}
            <span className={textClasses}>{label}</span>
            {iEnd}
          </span>
        </span>
      </button>
    );
  }
);

export default BtnWithIcon;
 */
