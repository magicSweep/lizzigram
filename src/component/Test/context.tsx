import React, { createContext, useState, useEffect, useRef } from "react";

let i = 0;

export const useWindowResize = () => {
  const [resized, setResized] = useState(0);

  const ref = useRef(i++);

  const onWindowResize = () => {
    console.log("WINDOW RESIZE", ref.current);
    setResized((prevResize: number) => prevResize + 1);
  };

  console.log("USE WINDOW RESIZE");

  useEffect(() => {
    window.addEventListener("resize", onWindowResize, false);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return resized;
};

export const WindowResizeContext = createContext(0);

export const WindowResizeProvider = ({ children }: any) => {
  const resized = useWindowResize();

  return (
    <WindowResizeContext.Provider value={resized}>
      {children}
    </WindowResizeContext.Provider>
  );
};
