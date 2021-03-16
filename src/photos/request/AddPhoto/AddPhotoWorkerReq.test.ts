import { makePhotoFormData } from "../helper/DataHelper";
import AddPhotoWorkerReq from "./AddPhotoWorkerReq";
import {
  createPhotoFirestoreData,
  returnDataByMakePhotoFormData,
} from "./data/data";
import { post } from "../../utils/Fetch";
import { addPhotoUrl } from "../../config";

jest.mock("../helper/DataHelper", () => {
  return {
    __esModule: true,
    makePhotoFormData: jest.fn(),
  };
});

jest.mock("../../utils/Fetch", () => {
  return {
    __esModule: true,
    post: jest.fn(),
  };
});

let request: AddPhotoWorkerReq = new AddPhotoWorkerReq(false);

describe("AddPhotoWorkerReq", () => {
  beforeAll(() => {
    (makePhotoFormData as jest.Mock).mockReturnValue(
      returnDataByMakePhotoFormData
    );
  });

  beforeEach(() => {
    request = new AddPhotoWorkerReq(false);
  });

  test("type must be - SEND_PHOTO_TO_WORKER_ON_ADD", () => {
    expect(request.type).toEqual("SEND_PHOTO_TO_WORKER_ON_ADD");
  });

  describe("prepareDataToWorkerReq", () => {
    test("It get data and call makePhotoFormData with that data", () => {
      const res = request.prepareDataToWorkerReq(createPhotoFirestoreData);

      expect(makePhotoFormData).toHaveBeenCalledTimes(1);
      expect(makePhotoFormData).toHaveBeenCalledWith({
        id: createPhotoFirestoreData.photoId,
        userUid: createPhotoFirestoreData.userUid,
        file: createPhotoFirestoreData.photoFormData.photoFile[0],
      });

      expect(res).toEqual(returnDataByMakePhotoFormData);
    });
  });

  describe("request", () => {
    test(`Do:
        - It get data:TCreatePhotoFirestoreData
        - It call this.prepareDataToWorkerReq(data) with that data
        - it send post()
        - call res.json
    `, async () => {
      request.prepareDataToWorkerReq = jest.fn().mockReturnValue("formData");

      const json = jest.fn().mockResolvedValue({
        status: "success",
        data: {},
      });

      (post as jest.Mock).mockResolvedValue({ json });

      const res = await request.request(createPhotoFirestoreData);

      expect(request.prepareDataToWorkerReq).toHaveBeenCalledTimes(1);
      expect(request.prepareDataToWorkerReq).toHaveBeenCalledWith(
        createPhotoFirestoreData
      );

      expect(post).toHaveBeenCalledTimes(1);
      expect(post).toHaveBeenCalledWith(addPhotoUrl, "formData", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      expect(json).toHaveBeenCalledTimes(1);

      expect(res).toEqual(undefined);
    });

    test(`If post return status error - it throw Error`, async () => {
      request.prepareDataToWorkerReq = jest.fn().mockReturnValue("formData");

      const json = jest.fn().mockResolvedValue({
        status: "error",
        data: "Super error",
      });

      (post as jest.Mock).mockResolvedValue({ json });

      try {
        await request.request(createPhotoFirestoreData);
      } catch (err) {
        expect(err.message).toEqual("Server return some error - Super error");
      }
    });
  });
});
