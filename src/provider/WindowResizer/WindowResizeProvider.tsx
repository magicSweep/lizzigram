import React from "react";
import { useAspectRatio } from "./hook";
import { WindowResizeContext } from "./context";

const WindowResizeProvider = ({ children }: any) => {
  const aspectRatio = useAspectRatio();

  return (
    <WindowResizeContext.Provider value={aspectRatio}>
      {children}
    </WindowResizeContext.Provider>
  );
};

export default WindowResizeProvider;
