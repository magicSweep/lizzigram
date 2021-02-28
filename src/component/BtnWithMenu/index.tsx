import React, {
  cloneElement,
  Children,
  FC,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./BtnWithMenu.module.scss";
//import styles from "./../../styles/classes.module.scss";
//import { useButtonClick } from "./../Button/hook";
//import BtnWithIcon, { IBtnWithIconProps } from "../BtnWithIcon";
import Portal from "../Portal";

const getUpdatedChildren = (children: any[], itemClickHandler: () => void) => {
  return Children.map(children, (child, i) => {
    //console.log("Before clone child", child.props);

    let newChild = cloneElement(child, {
      onClick: (event: any) => {
        if (child.props.onClick) child.props.onClick();
        itemClickHandler();
      },
    });

    return <li className={classes.item}>{newChild}</li>;
  });
};

const BtnWithMenu: FC<IBtnWithMenuProps> = ({
  //iconStart,
  //iconEnd,
  menuButton,
  children,
  //label,
  //ariaLabel,
  disabled,
  positionType,
}) => {
  //let buttonClasses: string = getButtonClasses(type);
  const [state, setState] = useState<IBtnWithMenuState>({
    show: false,
    position: {},
  });

  const containerRef = useRef<any>();

  const wrapperClasses = state.show
    ? `${classes.wrapper} ${classes["wrapper--active"]}`
    : classes.wrapper;

  const onScrollOrResizeRef = useRef(() => {
    console.log("On scroll");

    document.removeEventListener("scroll", onScrollOrResizeRef.current);

    window.removeEventListener("resize", onScrollOrResizeRef.current);

    setState((prevState: any) => ({ ...prevState, show: false }));
  });

  useEffect(() => {
    return () => {
      document.removeEventListener("scroll", onScrollOrResizeRef.current);
      window.removeEventListener("resize", onScrollOrResizeRef.current);
    };
  }, []);

  const onOpenMenu = (event: any) => {
    const rect = containerRef.current.getBoundingClientRect();
    const windowClientWidth = document.documentElement.clientWidth;

    const position: IPosition = {};

    switch (positionType) {
      case "start":
        position.top = rect.bottom;
        position.left = rect.left;
        break;
      case "end":
        position.top = rect.bottom;
        position.right = windowClientWidth - rect.left - rect.width;
        break;

      default:
        throw new Error(
          `No implementation for position type | ${positionType} |`
        );
    }

    console.log(
      "OPEN MENU",
      containerRef.current.getBoundingClientRect(),
      position
    );

    document.addEventListener("scroll", onScrollOrResizeRef.current);
    window.addEventListener("resize", onScrollOrResizeRef.current);

    setState((prevState: IBtnWithMenuState) => {
      if (prevState.show === true) {
        return { ...prevState, show: false };
      } else {
        return {
          show: true,
          position,
        };
      }
    });
  };

  const onCloseMenu = () => {
    console.log("onCloseMenu");
    document.removeEventListener("scroll", onScrollOrResizeRef.current);
    window.removeEventListener("resize", onScrollOrResizeRef.current);

    setState((prevState: any) => ({ ...prevState, show: false }));
  };

  const fMenuButton = cloneElement(menuButton, {
    onClick: onOpenMenu,
    disabled: disabled,
    ref: containerRef,
  });

  const updatedChildren = getUpdatedChildren(children, onCloseMenu);

  console.log("[RENDER BUTTON WITH MENU]");

  return (
    <>
      <div className={wrapperClasses}>{fMenuButton}</div>

      {state.show && (
        <Portal type="context-menu">
          <>
            <div className={classes.overlay} onClick={onCloseMenu}></div>
            <ul className={classes.menu} style={state.position}>
              {updatedChildren}
            </ul>
          </>
        </Portal>
      )}
    </>
  );
};

export default BtnWithMenu;

/* import React, { FC, useRef, useState } from "react";
import classes from "./BtnWithMenu.module.scss";
import styles from "./../../styles/classes.module.scss";
import { useButtonClick } from "./../Button/hook";

//export type BUTTON_TYPE = "TEXT" | "OUTLINED" | "CONTAINED";

export interface IBtnWithMenuProps {
  label: string;
  ariaLabel: string;
  disabled: boolean;
  onClick?: (event: any) => void | undefined;
}

const BtnWithMenu: FC<IBtnWithMenuProps> = ({
  label,
  ariaLabel,
  onClick,
  disabled,
}) => {
  //let buttonClasses: string = getButtonClasses(type);
  const [state, setState] = useState({
    show: false,
    left: 0,
    top: 0,
  });

  const containerRef = useRef<any>();

  const { bgClass, onMouseDown, onMouseUp } = useButtonClick();

  let textClasses = `${styles.labelFont} ${classes.text}`;

  if (disabled) textClasses += ` ${styles.disabledColor}`;

  const wrapperClasses = `${classes.wrapper} ${bgClass}`;

  const clickHandler = (event: any) => {
    const rect = containerRef.current.getBoundingClientRect();

    setState((prevState: any) => {
      if (prevState.show === true) {
        return { ...prevState, show: false };
      } else {
        return {
          show: true,
          left: rect.left,
          top: rect.bottom,
        };
      }
    });

    if (onClick) onClick(event);
  };

  console.log("[RENDER BUTTON]");

  return (
    <>
      <button
        className={classes.root}
        onClick={disabled ? undefined : clickHandler}
        onMouseDown={disabled ? undefined : onMouseDown}
        onMouseUp={disabled ? undefined : onMouseUp}
        disabled={disabled}
        aria-label={ariaLabel}
        ref={containerRef}
      >
        <span
          className={
            disabled ? `${classes.wrapper} ${classes.disabled}` : wrapperClasses
          }
        >
          <span className={classes.container}>
            <svg
              width={20}
              height={20}
              className={classes.svgSmile}
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="15.5" cy="9.5" r="1.5"></circle>
              <circle cx="8.5" cy="9.5" r="1.5"></circle>
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-4c-.73 0-1.38-.18-1.96-.52-.12.14-.86.98-1.01 1.15.86.55 1.87.87 2.97.87 1.11 0 2.12-.33 2.98-.88-.97-1.09-.01-.02-1.01-1.15-.59.35-1.24.53-1.97.53z"></path>
            </svg>
            <span className={textClasses}>{label}</span>
            <svg
              width={22}
              height={22}
              className={classes.svgArrow}
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
            </svg>
          </span>
        </span>
      </button>

      {state.show && (
        <div
          className={classes.menu}
          style={{
            top: state.top,
            left: state.left,
          }}
        ></div>
      )}
    </>
  );
};

export default BtnWithMenu;
 */
