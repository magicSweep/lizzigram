import React from "react";
import Header from "../Header";
import classes from "./Layout.module.scss";
import Alert from "../../../component/Alert";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

/* FINAL COMPONENTS */

const _refHeader = <Header />;

const IHeader = () => _refHeader;

const _refAlert = <Alert />;

const IAlert = () => _refAlert;

/* END FINAL COMPONENTS */

export const Layout = ({ children }: LayoutProps) => {
  console.log("[RENDER LAYOUT]");

  return (
    <>
      <IHeader />
      <main className={classes.container}>{children}</main>
      <IAlert />
    </>
  );
};

export default Layout;
