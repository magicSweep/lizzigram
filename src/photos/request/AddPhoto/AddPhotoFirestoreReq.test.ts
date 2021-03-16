import AddPhotoFirestoreReq from "./AddPhotoFirestoreReq";
import { getPhotosCollection } from "../../firebase/initFirestore";
import { makeAddPhotoData } from "../helper/DataHelper";
import { createPhotoFirestoreData, iphoto } from "./data/data";

jest.mock("../helper/DataHelper", () => {
  return {
    __esModule: true,
    makeAddPhotoData: jest.fn(() => ({
      date: "Super date",
      tags: { er3: true, r34: true },
      yearsOld: 2,
      description: "hello desc",
      base64: "",
      files: [],
      aspectRatio: 0,
      srcSet: "",
      iconSrc: "",
      src: "",
      _timestamp: 12333,
      googleDriveId: "",
      addedByUserUID: "",
      isActive: false,
      imageExtention: "jpeg",
    })),
  };
});

jest.mock("../../firebase/initFirestore", () => {
  return {
    __esModule: true,
    getPhotosCollection: jest.fn(),
  };
});

//global.AbortController = jest.fn();

let request: AddPhotoFirestoreReq | undefined = undefined;

describe("AddPhotoFirestoreReq", () => {
  beforeEach(() => {
    request = new AddPhotoFirestoreReq(false);
  });

  test("type must be - SEND_PHOTO_TO_FIRESTORE_ON_ADD", () => {
    expect((request as AddPhotoFirestoreReq).type).toEqual(
      "SEND_PHOTO_TO_FIRESTORE_ON_ADD"
    );
  });

  describe("prepareDataToFirestoreReq", () => {
    test(`Do: 
    - it call makeAddPhotoData and get photo
    - then fill field addedByUserUID
`, () => {
      const photo = (request as AddPhotoFirestoreReq).prepareDataToFirestoreReq(
        createPhotoFirestoreData
      );

      expect(makeAddPhotoData).toHaveBeenCalledTimes(1);
      expect(makeAddPhotoData).toHaveBeenCalledWith(
        createPhotoFirestoreData.photoFormData
      );

      expect(photo).toEqual(iphoto);
    });
  });

  describe("request", () => {
    test(`Do:
    - it prepare photo data with this.prepareDataToFirestoreReq
    - send request with getPhotosCollection
`, async () => {
      if (request) {
        const set = jest.fn().mockResolvedValue(undefined);
        const doc = jest.fn(() => ({ set }));

        (getPhotosCollection as jest.Mock).mockReturnValue({ doc });

        request.prepareDataToFirestoreReq = jest.fn(() => iphoto as any);

        await request.request(createPhotoFirestoreData);

        expect(request.prepareDataToFirestoreReq).toHaveBeenCalledTimes(1);
        expect(request.prepareDataToFirestoreReq).toHaveBeenCalledWith(
          createPhotoFirestoreData
        );

        expect(getPhotosCollection).toHaveBeenCalledTimes(1);

        expect(doc).toHaveBeenCalledTimes(1);
        expect(doc).toHaveBeenCalledWith(createPhotoFirestoreData.photoId);

        expect(set).toHaveBeenCalledTimes(1);
        expect(set).toHaveBeenCalledWith(iphoto);
      }
    });
  });
});
