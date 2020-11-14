export const makePhotoName = (width: number, name: string) => {
  return `${name}-${width}.jpg`;
};

export const getMapsOfPathsToPhotos = (
  widths: number[],
  name: string,
  pathToFsResultDir: string,
  pathToWebResultDir?: string
) => {
  //we make pathsFileSystem: Map<width, path>
  const pathsFS: Map<number, string> = new Map();
  //we make pathsSite: Map<width, path>
  const pathsWeb: Map<number, string> = new Map();

  for (let width of widths) {
    pathsFS.set(width, `${pathToFsResultDir}/${makePhotoName(width, name)}`);
    if (pathToWebResultDir)
      pathsWeb.set(
        width,
        `${pathToWebResultDir}/${makePhotoName(width, name)}`
      );
  }

  return [pathsFS, pathsWeb];
};
