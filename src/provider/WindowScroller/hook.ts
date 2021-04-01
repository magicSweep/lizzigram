import { useState, useEffect, useRef } from "react";

let i = 0;

export const useWindowScroll = () => {
  const [yScroll, setYScroll] = useState(0);

  const prevYRef = useRef(0);

  const onWindowScroll = (event: any) => {
    //console.log("WINDOW SCROLL", prevYRef.current);
    const y = document.body.getBoundingClientRect().top;

    setYScroll((prevY) => {
      prevYRef.current = prevY;
      return y;
    });
  };

  //console.log("USE WINDOW SCROLL", yScroll, prevYRef.current);

  useEffect(() => {
    window.addEventListener("scroll", onWindowScroll, false);

    return () => {
      window.removeEventListener("scroll", onWindowScroll, false);
    };
  }, []);

  return {
    y: yScroll,
    prevY: prevYRef.current,
  };
};

export const useShowLayoutOnScroll = () => {
  //const [isShow, setIsShow] = useState(true);

  const isShowRef = useRef(true);

  const { y, prevY } = useWindowScroll();

  //console.log("USE SHOW LAYOUT ON SCROLL");

  //&& isShowRef.current === false
  if (y >= -40) {
    isShowRef.current = true;
  } else if (prevY > y) {
    // WE SCROLL DOWN
    //console.log("Hide");
    isShowRef.current = false;
    /* if (isShowRef.current === true) isShowRef.current = false;
    else isShowRef.current = true; */
  } else {
    // WE SCROLL UP
    //console.log("Show");
    isShowRef.current = true;
    /*  if (isShowRef.current === false) isShowRef.current = true;
    else isShowRef.current = false; */
  }

  return isShowRef.current;
};
