import request from "supertest";
import { init } from "./../../app";
import { readdir, unlink, existsSync } from "fs";
import { promisify } from "util";

let app;

const pathToLargePhoto =
  "/home/nikki/Downloads/priroda-ozero-peizazh-gornye-vershiny-gory.jpg";
const pathToPhoto = "/home/nikki/Downloads/13.jpg";
const pathToWrongMimetypeFile = "/home/nikki/Downloads/get.pip.py";

const pathToUploadsDir = "./uploads";

console.log = jest.fn();

describe("Add photo middleware", () => {
  beforeAll(async () => {
    app = await init();
  });

  test("Success file upload", async () => {
    const response = await request(app)
      .post("/add-photo")
      .field("id", "1234567890123")
      .attach("file", pathToPhoto);

    let files = await promisify(readdir)(pathToUploadsDir);
    expect(files.length).toEqual(1);

    const fileName = files[0];
    const pathToFile = `${pathToUploadsDir}/${files[0]}`;

    if (existsSync(pathToFile)) await promisify(unlink)(pathToFile);

    files = await promisify(readdir)(pathToUploadsDir);
    expect(files.length).toEqual(0);

    expect(response.text.includes(fileName)).toEqual(true);

    //expect(response.text).toEqual(true);
  });
});
