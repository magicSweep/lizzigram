import { resolve } from "path";
import { path as rootPath } from "app-root-path";
import { promisify } from "util";
import { readFile, writeFile, stat, unlink, existsSync } from "fs";

export const pathToBase64Template = resolve(
  rootPath,
  "src/sharp/example/base64.template.html"
);

export const pathToResizeTemplate = resolve(
  rootPath,
  "src/sharp/example/resize.template.html"
);

export const makeHtmlWithResizedPhotos = async (
  photosInfo: Map<number, string>,
  sizes: Map<number, number>,
  originalPhotoInfo: { size: number; resolution: number[] }
) => {
  const template: string = await promisify(readFile)(pathToResizeTemplate, {
    encoding: "utf8",
  });

  /*   const pathsFS = new Map();

      pathsFS.set(400, `${pathToResultDir}/girl-on-water-400.jpg`);
      pathsFS.set(800, `${pathToResultDir}/girl-on-water-800.jpg`);
 */
  //console.log("TEMPLATE ", template);

  let resultHtml = template;

  resultHtml = resultHtml.replace(
    `{{SIZE_ORIGIN}}`,
    `${round(bytesToMegabytes(originalPhotoInfo.size), 5)}MB`
  );

  resultHtml = resultHtml.replace(
    `{{RESOLUTION_ORIGIN}}`,
    `${originalPhotoInfo.resolution[0]}x${originalPhotoInfo.resolution[1]}`
  );

  for (let size of photosInfo.keys()) {
    //replace image path
    resultHtml = resultHtml.replace(
      `{{SRC${size}}}`,
      `file://${photosInfo.get(size)}`
    );

    //replace image size
    resultHtml = resultHtml.replace(
      `{{SIZE${size}}}`,
      `${round(bytesToMegabytes(sizes.get(size)), 5)}MB`
    );
  }

  await promisify(writeFile)(
    resolve(rootPath, "src/sharp/example/resize.html"),
    resultHtml,
    { encoding: "utf-8" }
  );
};

export const makeHtmlWithBase64 = async (base64: string, size: number) => {
  const template: string = await promisify(readFile)(pathToBase64Template, {
    encoding: "utf8",
  });

  //console.log("TEMPLATE ", template);

  let resultHtml = template.replace(
    "{{SRC}}",
    `data:image/png;base64, ${base64}`
  );

  resultHtml = resultHtml.replace(
    "{{SIZE}}",
    `${round(bytesToMegabytes(size), 5)}MB`
  );

  await promisify(writeFile)(
    resolve(rootPath, "src/sharp/example/base64.html"),
    resultHtml,
    { encoding: "utf-8" }
  );
};

export const getBase64Size = async (base64: string) => {
  const pahtToTempFile = resolve(rootPath, "src/sharp/example/temp.txt");

  await promisify(writeFile)(pahtToTempFile, base64, {
    encoding: "utf8",
  });

  const tempFileStats = await promisify(stat)(pahtToTempFile);

  if (existsSync(pahtToTempFile)) await promisify(unlink)(pahtToTempFile);

  return tempFileStats.size;
};

export const bytesToMegabytes = (bytes: number) => {
  return bytes / (1024 * 1024);
};

export const round = (number: number, toFixed: number) => {
  return Number(number.toFixed(toFixed));
};
