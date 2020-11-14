import { resolve } from "path";
import { PhotoCloudinaryController } from "./../../controller/photoCloudinary";

const pathToUploadPhotoFileDir = resolve(__dirname, "upload");
const pathToDirWithPhotosDiffWidths = resolve(__dirname, "result");
//pathToWebResultDir: string;

const pathToUploadPhotoFile = resolve(__dirname, "upload", "13.jpg");
const file = {
  filename: "13.jpg",
  path: pathToUploadPhotoFile,
};
const widths = [400, 800, 1200, 1600, 1900];

describe("add", () => {
  test("", async () => {
    const ctrl = new PhotoCloudinaryController(
      file,
      widths,
      pathToUploadPhotoFileDir,
      pathToDirWithPhotosDiffWidths
    );

    const res = await ctrl.add();

    expect(res).toEqual("hello");
  });
});
