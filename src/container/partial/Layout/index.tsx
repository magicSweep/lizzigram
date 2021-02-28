import React, { lazy, Suspense } from "react";
import { useShowOnDidMount } from "../../../hooks/useShowOnDidMount";
import Header from "../Header";
import classes from "./Layout.module.scss";
//import loadable from "@loadable/component";
//import Alert from "../../../component/Alert";

interface LayoutProps {
  children: any;
}

/* FINAL COMPONENTS */

const _refHeader = <Header />;

const IHeader = () => _refHeader;

/* const _refAlert = <Alert />;

const IAlert = () => _refAlert; */

const LoadableAlert = lazy(() =>
  import(/* webpackPreload: true */ "../../../component/Alert")
);

/* END FINAL COMPONENTS */

export const Layout = ({ children }: LayoutProps) => {
  const isShow = useShowOnDidMount();

  console.log("[RENDER LAYOUT]");

  return (
    <>
      <IHeader />
      <main className={classes.container}>{children}</main>
      {isShow && (
        <Suspense fallback={null}>
          <LoadableAlert />
        </Suspense>
      )}
    </>
  );
};

export default Layout;
