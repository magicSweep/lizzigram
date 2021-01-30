import { saveToGoogleDrive, updateGoogleDriveFile } from "./helper";
import wait from "waait";

const photoModel = {
  updateGoogleId: jest.fn(() => Promise.resolve()),
};
const photoResizer = {
  saveToGoogleDrive: jest
    .fn()
    .mockResolvedValue({ data: { id: "googledriveid" } }),
  updateGoogleDriveFile: jest.fn().mockResolvedValue("response"),
  removeUploadPhoto: jest.fn(() => Promise.resolve()),
  removeOptimizedPhoto: jest.fn(() => Promise.resolve()),
};

describe("Helper PhotoCloudinaryController", () => {
  afterEach(() => {
    photoResizer.removeUploadPhoto.mockClear();
    photoResizer.removeOptimizedPhoto.mockClear();
  });

  test("saveToGoogleDrive", async () => {
    saveToGoogleDrive(photoResizer as any, photoModel as any);

    await wait(300);

    // SEND UPLOADED PHOTO TO GOOGLE DRIVE
    expect(photoResizer.saveToGoogleDrive).toHaveBeenCalledTimes(1);

    // ADD GOOGLE DRIVE ID TO FIRESTORE
    expect(photoModel.updateGoogleId).toHaveBeenCalledTimes(1);
    expect(photoModel.updateGoogleId).toHaveBeenNthCalledWith(
      1,
      "googledriveid"
    );

    // REMOVE UPLOAD PHOTO AND OPTIMIZED PHOTO
    expect(photoResizer.removeUploadPhoto).toHaveBeenCalledTimes(1);
    expect(photoResizer.removeOptimizedPhoto).toHaveBeenCalledTimes(1);
  });

  test("updateGoogleDriveFile", async () => {
    updateGoogleDriveFile(photoResizer as any, "googleDriveId");

    await wait(300);

    // SEND UPLOADED PHOTO TO GOOGLE DRIVE
    expect(photoResizer.updateGoogleDriveFile).toHaveBeenCalledTimes(1);
    expect(photoResizer.updateGoogleDriveFile).toHaveBeenNthCalledWith(
      1,
      "googleDriveId"
    );

    // REMOVE UPLOAD PHOTO AND OPTIMIZED PHOTO
    expect(photoResizer.removeUploadPhoto).toHaveBeenCalledTimes(1);
    expect(photoResizer.removeOptimizedPhoto).toHaveBeenCalledTimes(1);
  });
});
