import React from "react";
import { useShowLayoutOnScroll } from "./hook";
import { WindowScrollContext } from "./context";

const WindowScrollProvider = ({ children }: any) => {
  const isShow = useShowLayoutOnScroll();

  return (
    <WindowScrollContext.Provider value={isShow}>
      {children}
    </WindowScrollContext.Provider>
  );
};

export default WindowScrollProvider;
