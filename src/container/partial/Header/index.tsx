import React, { Suspense, lazy } from "react";
import classes from "./Header.module.scss";
import Logo from "./../../../component/Logo";
import { AuthSkeleton } from "../../../auth/component/AuthFragment/AuthFragment";

const LoadableAuthFragment = lazy(() =>
  import("../../../auth/component/AuthFragment")
);

const Header = () => {
  //const classes = useStyles();

  console.log("[RENDER HEADER WIDGET]");

  return (
    <header className={classes.appBar}>
      <div className={classes.toolbar}>
        <Logo />

        <Suspense fallback={AuthSkeleton}>
          <LoadableAuthFragment />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
