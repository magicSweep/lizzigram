import { getPhotosCollection } from "../../../firebase/initFirestore";
import GetAddedPhotoReq from "./GetAddedPhotoReq";

jest.mock("../../../firebase/initFirestore", () => {
  return {
    __esModule: true,
    getPhotosCollection: jest.fn(),
  };
});

let request: GetAddedPhotoReq = new GetAddedPhotoReq(false);

describe("GetAddedPhotoReq", () => {
  beforeEach(() => {
    request = new GetAddedPhotoReq(false);
  });

  test("type must be - GET_ADDED_PHOTO", () => {
    expect(request.type).toEqual("GET_ADDED_PHOTO");
  });

  describe("request", () => {
    test(`Do:
            - it get photoId
            - it call getPhotosCollection().doc(photoId).get()
            - it make TPhotoData
      `, async () => {
      const get = jest.fn().mockResolvedValue({
        data: () => "TPhotoData",
      });
      const doc = jest.fn(() => ({ get }));

      (getPhotosCollection as jest.Mock).mockReturnValue({ doc });

      const photo = await request.request("photoId");

      expect(getPhotosCollection).toHaveBeenCalledTimes(1);

      expect(doc).toHaveBeenCalledTimes(1);
      expect(doc).toHaveBeenCalledWith("photoId");

      expect(get).toHaveBeenCalledTimes(1);

      expect(photo).toEqual({ id: "photoId", photo: "TPhotoData" });
    });
  });
});
