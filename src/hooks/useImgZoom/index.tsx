import { useState } from "react";

const minZoom = 1;
const originZoom = 1;
const maxZoom = 3;
const margaZoom = 0.5;

export const useImgZoom = () => {
  const [zoom, setZoom] = useState<number>(1);

  const zoomIn = (event: any) => {
    event.stopPropagation();

    if (zoom < maxZoom) {
      setZoom((prevZoom) => prevZoom + margaZoom);
    }
  };

  const zoomOut = (event: any) => {
    event.stopPropagation();

    if (zoom >= minZoom) {
      setZoom((prevZoom) => prevZoom - margaZoom);
    }
  };

  const cancel = (event: any) => {
    if (event) event.stopPropagation();

    if (zoom != originZoom) {
      setZoom(originZoom);
    }
  };

  return {
    zoom,
    zoomIn,
    zoomOut,
    cancel,
    maxZoom,
    minZoom,
  };
};
