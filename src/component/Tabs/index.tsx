import React, { useState, Children, FC } from "react";
import classes from "./Tabs.module.scss";

interface ITabsProps {
  children: React.ReactElement[];
  titles: string[];
}

const getNavigationBtns = (titles: string[], index: number, setIndex: any) => {
  return titles.map((value, i) => {
    return (
      <button
        key={classes.button + i}
        className={
          index === i ? `${classes.button} ${classes.active}` : classes.button
        }
        onClick={() => setIndex(i)}
      >
        {value}
      </button>
    );
  });
};

const Tabs: FC<ITabsProps> = ({ children, titles }) => {
  const [index, setIndex] = useState(0);

  const navBtns = getNavigationBtns(titles, index, setIndex);

  const updatedChildren = Children.map(children, (child, i) => {
    if (i === index) {
      return <div>{child}</div>;
    }
    return null;
  });

  console.log("[TABS RENDER]", index);

  return (
    <div className={classes.root}>
      <div className={classes.titles}>{navBtns}</div>

      <div className={classes.sections}>{updatedChildren}</div>
    </div>
  );
};

export default Tabs;
