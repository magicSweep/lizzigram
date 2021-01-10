import { unlink, readFile as readFileFS, writeFile as writeFileFS } from "fs";
import { promisify } from "util";

export const deleteFile = (path: string) => {
  return promisify(unlink)(path);
};

export const readFile = (path: string) => {
  return promisify(readFileFS)(path, { encoding: "utf-8" });
};

export const writeFile = (path: string, data: string) => {
  return promisify(writeFileFS)(path, data, { encoding: "utf-8" });
};
