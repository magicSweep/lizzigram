import React, { forwardRef } from "react";
import { useButtonClick } from "../Button/hook";
import classes from "./IconButton.module.scss";

export interface IIconButtonProps {
  ariaLabel: string;
  onClick?: (event: any) => void | undefined;
  disabled?: boolean;
  index?: number;
  icon: any;
}

const IconButton = forwardRef<any, IIconButtonProps>(
  ({ ariaLabel, onClick, disabled, icon, index }, ref) => {
    const { bgClass, onMouseDown, onMouseUp } = useButtonClick();

    const fIcon = React.cloneElement(icon, {
      iconClass: classes.svg,
      color: disabled ? "disabled" : icon.props.color,
    });

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
        <span
          className={
            disabled
              ? `${classes.wrapper} ${classes.disabled}`
              : `${classes.wrapper} ${bgClass}`
          }
        >
          {fIcon}
        </span>
      </button>
    );
  }
);

export default IconButton;
