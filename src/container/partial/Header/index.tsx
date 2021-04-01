import React, { useContext } from "react";
import { WindowScrollContext } from "../../../provider/WindowScroller";
import HeaderWidget from "./Header";

const Header = () => {
  const isShow = useContext(WindowScrollContext);

  console.log("[RENDER HEADER]", isShow);

  return <HeaderWidget isShow={isShow} />;
};

export default Header;
