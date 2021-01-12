import { useEffect, useState } from "react";

export const useWindowResize = () => {
  const [resized, setResized] = useState(0);

  const onWindowResize = () => {
    setResized((prevResize: number) => prevResize + 1);
  };

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

  const windowClientWidth = document.documentElement.clientWidth;
  const windowClientHeight = document.documentElement.clientHeight;

  console.log(
    "[USE ASPECT RATIO]",
    resized,
    Math.round((windowClientWidth / windowClientHeight) * 100) / 100
  );

  return Math.round((windowClientWidth / windowClientHeight) * 100) / 100;
};
