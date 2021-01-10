import { sCloudinary } from "../../cloudinary";
import { PhotoCloudinaryController } from "./PhotoCloudinary";

jest.mock("../../cloudinary", () => {
  return {
    __esModule: true,
    sCloudinary: {
      uploadFile: jest.fn(() => {
        return Promise.resolve({
          width: "100dinasours",
        });
      }),
      deleteFile: jest.fn(() => Promise.resolve("Deleted")),
    },
  };
});

describe("PhotoCloudinary", () => {
  describe("Helper methods", () => {
    test("uploadImagesByDifferentWidths", () => {});

    test("getPathsToDiffWidthPhotos", () => {});

    test("makePhotoName", () => {});
  });
});
