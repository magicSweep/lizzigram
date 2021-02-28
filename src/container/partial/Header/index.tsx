import React from "react";
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

const Header = () => {
  //const classes = useStyles();
  //const isShow = useShowOnDidMount();

  console.log("[RENDER HEADER WIDGET]");

  return (
    <header className={classes.appBar}>
      <div className={classes.toolbar}>
        <Logo />

        <AuthFragment />

        {/*  {!isShow && <AuthSkeleton />} */}

        {/* {isShow && (
          <Suspense fallback={AuthSkeleton}>
            <LoadableAuthFragment />
          </Suspense>
        )} */}
      </div>
    </header>
  );
};

export default Header;
