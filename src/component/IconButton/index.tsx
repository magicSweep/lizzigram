import React, { forwardRef } from "react";
import { useButtonClick } from "../Button/hook";
import classes from "./IconButton.module.scss";

export interface IIconButtonProps {
  ariaLabel: string;
  onClick?: (event: any) => void | undefined;
  disabled?: boolean;
  index?: number;
  icon: any;
  type: TIconBtnType;
}

const getWrapperClasses = (
  type: TIconBtnType,
  disabled: boolean | undefined,
  bgClass: string,
  classes: any
) => {
  let wrapperClasses = classes.wrapper;

  if (type === "circle") wrapperClasses += ` ${classes["wrapper--circle"]}`;
  else if (type === "box") wrapperClasses += ` ${classes["wrapper--box"]}`;
  else throw new Error(`No implementation for icon btn type - ${type}`);

  if (disabled) {
    wrapperClasses += ` ${classes.disabled}`;
  } else {
    wrapperClasses += ` ${bgClass}`;
  }

  return wrapperClasses;
};

const IconButton = forwardRef<any, IIconButtonProps>(
  ({ ariaLabel, onClick, disabled, icon, type, index }, ref) => {
    const { bgClass, onMouseDown, onMouseUp } = useButtonClick();

    const fIcon = React.cloneElement(icon, {
      iconClass: classes.svg,
      color: disabled ? "disabled" : icon.props.color,
    });

    let wrapperClasses = getWrapperClasses(type, disabled, bgClass, classes);

    console.log("[RENDER ICON BUTTON]", icon.props);

    return (
      <button
        className={classes.root}
        onClick={disabled ? undefined : onClick}
        onMouseDown={disabled ? undefined : onMouseDown}
        onMouseUp={disabled ? undefined : onMouseUp}
        disabled={disabled}
        aria-label={ariaLabel}
        ref={ref}
      >
        <span className={wrapperClasses}>{fIcon}</span>
      </button>
    );
  }
);

export default IconButton;
