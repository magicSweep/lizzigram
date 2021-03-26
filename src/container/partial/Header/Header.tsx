import React, { FC } from "react";
import classes from "./Header.module.scss";
import Logo from "./../../../component/Logo";
//import loadable from "@loadable/component";
//import { AuthSkeleton } from "../../../auth/component/AuthFragment/AuthFragment";
//import { useShowOnDidMount } from "../../../hooks/useShowOnDidMount";
import AuthFragment from "../../../auth/component/AuthFragment";

/* const LoadableAuthFragment = loadable(
  () => import("../../../auth/component/AuthFragment"),
  { fallback: <AuthSkeleton /> }
); */

/* const LoadableAuthFragment = lazy(() =>
  import("../../../auth/component/AuthFragment")
); */

const Header: FC<{ isShow: boolean }> = ({ isShow }) => {
  //const classes = useStyles();
  //const isShow = useShowOnDidMount();

  const rootClasses = isShow
    ? `${classes.root} ${classes.show}`
    : `${classes.root} ${classes.hide}`;

  console.log("[RENDER HEADER WIDGET]");

  return (
    <header className={rootClasses}>
      <div className={classes.toolbar}>
        <Logo />

        {/*  <AuthFragment /> */}

        {/*  {!isShow && <AuthSkeleton />} */}

        <AuthFragment />
      </div>
    </header>
  );
};

export default Header;
