import sharp, { Sharp, Metadata, OutputInfo } from "sharp";
import { PerformanceObserver, performance } from "perf_hooks";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminWebp from "imagemin-webp";
import { resolve } from "path";
import { promisify } from "util";
import fs, { existsSync } from "fs";

const imagesDir = resolve(__dirname, "images");
const resultDir = resolve(__dirname, "result");
const resultDirSharp = `${resultDir}/sharp`;
const resultDirImagemin = `${resultDir}/imagemin`;

/* OBSERVER SETUP */
const obs = new PerformanceObserver((items) => {
  /* RESULT LOG */
  /* const [measure] = items.getEntriesByName("Optimized sharp jpeg");
  console.log(measure);

  const [measure1] = items.getEntriesByName("Optimized imagemin jpeg");
  console.log(measure1); */

  /* const [measure2] = items.getEntriesByName("Optimized sharp webp");
  console.log(measure2); */

  items.getEntries().forEach((entry) => {
    console.log(JSON.stringify(entry));
  });

  /* const [measure3] = items.getEntriesByName("Optimized imagemin webp");
  console.log(measure3); */

  performance.clearMarks();
});

obs.observe({ entryTypes: ["measure"] });

describe("sharpVSimagemin", () => {
  /* test("Paths", () => {
    expect(resultDirSharp).toEqual("hello");
  }); */

  /* describe("Create optimized jpg", () => {
    const image = `${imagesDir}/image6.jpeg`;

    test("sharp", async () => {
      performance.mark("start_sharp");

      await sharp(image)
        .jpeg({ quality: 75 })
        //.jpeg()
        .toFile(`${resultDirSharp}/optJpg.jpg`);

      performance.mark("end_sharp");

      performance.measure("Optimized sharp jpeg", "start_sharp", "end_sharp");

      expect(true).toEqual(true);
    });

    test("imagemin", async () => {
      performance.mark("start_imagemin");

      await imagemin([image], {
        destination: resultDirImagemin,
        plugins: [
          imageminMozjpeg({
            quality: 75,
            progressive: false,
          }),
        ],
      });

      performance.mark("end_imagemin");

      performance.measure(
        "Optimized imagemin jpeg",
        "start_imagemin",
        "end_imagemin"
      );

      expect(true).toEqual(true);

      /*  await imagemin(["images/*.{jpg,png}"], {
        destination: "build/images",
        plugins: [
          imageminMozjpeg({
            quality: 70,
            progressive: false
          }),
          imageminPngquant({
            quality: [0.6, 0.8],
          }),
        ],
      }); /
    });
  }); */

  /* describe("Create optimized webp", () => {
    const image = `${imagesDir}/image6.jpeg`;

    test("sharp", async () => {
      performance.mark("start_webp_sharp");

      await sharp(image)
        .webp({ quality: 75 })
        .toFile(`${resultDirSharp}/optimizeWebp.webp`);

      performance.mark("end_webp_sharp");

      performance.measure(
        "Optimized sharp webp",
        "start_webp_sharp",
        "end_webp_sharp"
      );

      expect(true).toEqual(true);
    });

    test("imagemin", async () => {
      performance.mark("start_webp_imagemin");

      await imagemin([image], {
        destination: resultDirImagemin,
        plugins: [
          imageminWebp({
            quality: 75,
          }),
        ],
      });

      performance.mark("end_webp_imagemin");

      performance.measure(
        "Optimized imagemin webp",
        "start_webp_imagemin",
        "end_webp_imagemin"
      );

      expect(true).toEqual(true);
    });
  }); */

  describe("Make optimize webp and after that resize", () => {
    const image = `${imagesDir}/Liza_firstWeek.png`;

    test("sharp", async () => {
      performance.mark("start_sharp");

      const pathToOptimizedWebp = `${resultDirSharp}/optimizeWebp.webp`;

      await sharp(image).webp().rotate().toFile(pathToOptimizedWebp);

      // RESIZE
      /* await sharp(pathToOptimizedWebp)
        .resize({ width: 1920 })
        .rotate()
        .toFile(`${resultDirSharp}/optimizeWebp_1080.webp`);

      await sharp(pathToOptimizedWebp)
        .resize({ width: 360 })
        .rotate()
        .toFile(`${resultDirSharp}/optimizeWebp_180.webp`);

      // GENERATE BASE 64

      const encode = await sharp(pathToOptimizedWebp)
        //.withMetadata()
        //.jpeg({ quality: 40 })
        .blur()
        .resize({ width: 40 })
        .rotate()
        .toBuffer();
      const res = encode.toString("base64"); */

      const resize1 = sharp(pathToOptimizedWebp)
        .resize({ width: 1920 })
        .rotate()
        .toFile(`${resultDirSharp}/optimizeWebp_1080.webp`);

      const resize2 = sharp(pathToOptimizedWebp)
        .resize({ width: 360 })
        .rotate()
        .toFile(`${resultDirSharp}/optimizeWebp_180.webp`);

      // GENERATE BASE 64

      const buffer = sharp(pathToOptimizedWebp)
        //.withMetadata()
        //.jpeg({ quality: 40 })
        .blur()
        .resize({ width: 15 })
        .rotate()
        .toBuffer();

      const [buf, r1, r2] = await Promise.all([buffer, resize1, resize2]);

      const res = buf.toString("base64");

      console.log("BASE 64", res);

      performance.mark("end_sharp");

      performance.measure(
        "Optimize and resize sharp webp",
        "start_sharp",
        "end_sharp"
      );

      expect(true).toEqual(true);
    });
  });
});
