import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { WindowResizeContext, WindowResizeProvider } from "./context";

const Child = () => {
  const resized = useContext(WindowResizeContext);

  console.log("RENDER CHILD", resized);

  return <p>Resized - {resized}</p>;
};

const Test = () => {
  return (
    <WindowResizeProvider>
      <Child />
      <Child />
    </WindowResizeProvider>
  );
};

export default Test;
