import { resolve } from "path";
import { path as rootPath } from "app-root-path";
import { promisify } from "util";
import { readFile, writeFile, stat, unlink, existsSync } from "fs";
import { iPhotoSizes as photoSizes } from "./SharpExampleController";

export const pathToExampleDir = resolve(rootPath, "src/sharp/example");

export const pathToBase64Template = `${pathToExampleDir}/base64.template.html`;

export const pathToResizeTemplate = `${pathToExampleDir}/resize.template.html`;

export const makeHtmlWithResizedPhotos = async (
  photosInfo: Map<number, string>,
  sizes: Map<number, number>,
  originalPhotoInfo: {
    size: number;
    isInverted: boolean;
    resolution: number[];
  },
  aspectRatio: number
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

  const isHeightMoreThenWidth =
    originalPhotoInfo.resolution[1] >= originalPhotoInfo.resolution[0];

  resultHtml = resultHtml.replace(
    `{{SIZE_ORIGIN}}`,
    `${round(bytesToMegabytes(originalPhotoInfo.size), 5)}MB`
  );

  resultHtml = resultHtml.replace(
    `{{RESOLUTION_ORIGIN}}`,
    `${originalPhotoInfo.resolution[0]}x${originalPhotoInfo.resolution[1]}`
  );

  resultHtml = resultHtml.replace(
    `{{ORIENTATION}}`,
    `${originalPhotoInfo.isInverted ? "Inverted" : "Not inverted"}`
  );

  resultHtml = resultHtml.replace(`{{ASPECT_RATIO}}`, `${aspectRatio}`);

  for (let size of photosInfo.keys()) {
    //replace image path
    resultHtml = resultHtml.replace(
      `{{WIDTH${size}}}`,
      `${
        originalPhotoInfo.isInverted ||
        originalPhotoInfo.resolution[1] >= originalPhotoInfo.resolution[0]
          ? "auto"
          : size + "px"
      }`
    );

    resultHtml = resultHtml.replace(
      `{{HEIGHT${size}}}`,
      `${
        originalPhotoInfo.isInverted ||
        originalPhotoInfo.resolution[1] >= originalPhotoInfo.resolution[0]
          ? getHeightByWidth(size) + "px"
          : "auto"
      }`
    );

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

  await promisify(writeFile)(`${pathToExampleDir}/resize.html`, resultHtml, {
    encoding: "utf-8",
  });
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

  await promisify(writeFile)(`${pathToExampleDir}/base64.html`, resultHtml, {
    encoding: "utf-8",
  });
};

export const getHeightByWidth = (width: number) => {
  for (let size of photoSizes) {
    if (size.width === width) return size.height;
  }
};

export const getBase64Size = async (base64: string) => {
  const pahtToTempFile = `${pathToExampleDir}/temp.txt`;

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
