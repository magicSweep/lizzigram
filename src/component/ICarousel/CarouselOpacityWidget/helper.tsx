import React, { Children, CSSProperties, ReactNode } from "react";

export const getItemStyle = (
  index: number,
  activeIndex: number
): CSSProperties => {
  if (activeIndex === index) {
    return {
      transitionProperty: "opacity",
      transitionDuration: "0.5s",
      opacity: "1",
    };
  }

  return {};
};

export const updateChildren = (
  children: ReactNode[],
  activeIndex: number,
  activeItemRef: any,
  //isTranslated: boolean,
  //opacity: number,
  classes: any
) => {
  console.log("[CAROUSEL OPACITY] UPDATE CHILDREN ", activeIndex);

  return Children.map(children, (child, index) => {
    let style = getItemStyle(index, activeIndex);

    const isActive = activeIndex === index;
    return (
      <li
        key={classes.item + index}
        data-index={index}
        ref={isActive ? activeItemRef : undefined}
        className={classes.item}
        style={style}
      >
        {isActive && child}
      </li>
    );
  });
};

/* export const updateChildren = (
  children: ReactNode[],
  activeIndex: number,
  isTranslated: boolean,
  opacity: number,
  classes: any
) => {
  console.log("[CAROUSEL OPACITY] UPDATE CHILDREN ", activeIndex);

  return Children.map(children, (child, index) => {
    let style = getItemStyle(index, activeIndex, isTranslated, opacity);

    const isActive = activeIndex === index;
    return (
      <li key={classes.item + index} className={classes.item} style={style}>
        {isActive && child}
      </li>
    );
  });
}; */
