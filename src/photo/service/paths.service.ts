import { TWidth, TPath } from "./../../types";

export const makePhotoName = (width: number, name: string) => {
  return `${name}-${width}.jpg`;
};

export const getPathsToDiffWidthPhotos = (
  widths: TWidth[],
  name: string,
  pathToResultDir: TPath
): Map<TWidth, TPath> => {
  //we make pathsFileSystem: Map<width, path>
  const paths: Map<TWidth, TPath> = new Map();

  for (let width of widths) {
    paths.set(width, `${pathToResultDir}/${makePhotoName(width, name)}`);
  }

  return paths;
};
