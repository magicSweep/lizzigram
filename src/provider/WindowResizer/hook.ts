import { useState, useEffect, useRef } from "react";

let i = 0;

export const useWindowResize = () => {
  const [resized, setResized] = useState(0);

  const ref = useRef(i++);

  const onWindowResize = () => {
    //console.log("WINDOW RESIZE", ref.current);
    setResized((prevResize: number) => prevResize + 1);
  };

  //console.log("USE WINDOW RESIZE");

  useEffect(() => {
    window.addEventListener("resize", onWindowResize, false);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return resized;
};

export const useAspectRatio = () => {
  const resized = useWindowResize();

  const [aspectRatio, setAspectRatio] = useState(0);

  useEffect(() => {
    const windowClientWidth = document.documentElement.clientWidth;
    const windowClientHeight = document.documentElement.clientHeight;

    setAspectRatio(
      Math.round((windowClientWidth / windowClientHeight) * 100) / 100
    );
  });

  /* console.log(
      "[USE ASPECT RATIO]",
      resized,
      Math.round((windowClientWidth / windowClientHeight) * 100) / 100
    ); */

  return aspectRatio;
};
