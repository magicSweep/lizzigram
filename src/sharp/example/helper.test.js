import {
  getBase64Size,
  makeHtmlWithBase64,
  bytesToMegabytes,
  round,
} from "./helper";
import { resolve } from "path";
import { path as rootPath } from "app-root-path";

//import { pathToImagesDir } from ".";

describe("round", () => {
  test("", () => {
    const result = round(10.345, 2);

    expect(result).toEqual(10.35);
  });
});

describe("getBase64Size", () => {
  test("", async () => {
    const size = await getBase64Size(
      `
            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAadffafafddfafaaadfgsfdhs
            dsakf;la jlk;jjdf;lakjdf asfgsdfgs gf sdfg s gfsd
            asfdjlja'dlfjal;dfjadfgsddddddddddddddddddddddddgf s fdgs dfg s
            akjlds;fja;lfdjl;j234234ls gf sdddddddddddfgsdgfs dgf sgf sdg f
            ajfkjfa;lfdjl;akjfdlkjaflkjalfkjs fdddddddddddddg
            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAadffafafddfafaa
            dsakf;la jlk;jjdf;lakjdf sg s sdfgsfgsgfgsgfsfggfsg
            asfdjlja'dlfjal;dfjadfs gf sgf sg sfsfgsgfsfgsdgf
            akjlds;fja;lfdjl;j234234lsgsgsggfgggggggggggggggggggggggggg
            ajfkjfa;lfdjl;akjfdlkjaflkjalfkjggggggggggggggggggggggg
            `
    );

    const result = `${round(bytesToMegabytes(size), 5)}MB`;

    expect(result).toEqual("0.00066MB");
  });
});

describe("test", () => {
  test("", () => {
    const pathToImagesDir = resolve(rootPath, "src/sharp/images/");
    expect(`${pathToImagesDir}/ladki.jpg`).toEqual(
      "/home/nikki/Documents/Project/lizzygram/backend/src/sharp/images/ladki.jpg"
    );
  });
});
