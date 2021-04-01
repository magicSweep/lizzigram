import {
  photoCardWidth,
  photoCardHeight,
  maxAppWidth,
} from "../../../../config";

export const calcPhotosLimitPerQuery = () => {
  let width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;

  width = width > maxAppWidth ? maxAppWidth : width;

  let numberOfElementsByWidth = Math.floor(width / photoCardWidth);

  numberOfElementsByWidth =
    numberOfElementsByWidth === 0 ? 1 : numberOfElementsByWidth;

  let numberOfElementsByHeight = Math.ceil(height / photoCardHeight);

  return {
    width,
    height,
    numberOfElementsByWidth,
    numberOfElementsByHeight,
  };
};
