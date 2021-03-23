import random from "lodash.random";
import AddPhotoFirestoreReq from "./AddPhotoFirestoreReq";
import AddPhotoWorkerReq from "./AddPhotoWorkerReq";
import {
  addPhotoStartRequestAC,
  addPhotoRequestErrorAC,
  addPhotoRequestSuccessAC,
  getAddedPhotoSuccessAC,
} from "../../store/action/photos";
import { batch } from "react-redux";
import { hideAddFormAC, showAlertAC } from "../../../store";
import GetAddedPhotoReq from "./GetAddedPhotoReq";

import AddPhotoReqManager from "./AddPhotoReqManager";

jest.mock("lodash.random");

jest.mock("react-redux");

(random as jest.Mock).mockReturnValue(666);

(batch as jest.Mock).mockImplementation((callback) => callback());

jest.mock("./GetAddedPhotoReq", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});
jest.mock("./AddPhotoFirestoreReq", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});
jest.mock("./AddPhotoWorkerReq", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock("../../store/action/photos", () => {
  return {
    __esModule: true,
    addPhotoStartRequestAC: jest
      .fn()
      .mockReturnValue("ADD_PHOTO_START_REQUEST_AC"),
    addPhotoRequestErrorAC: jest
      .fn()
      .mockReturnValue("ADD_PHOTO_REQUEST_ERROR_AC"),
    addPhotoRequestSuccessAC: jest
      .fn()
      .mockReturnValue("ADD_PHOTO_REQUEST_SUCCESS_AC"),
    getAddedPhotoSuccessAC: jest.fn().mockReturnValue("ADD_PHOTO_AC"),
  };
});

jest.mock("../../../store", () => {
  return {
    __esModule: true,
    hideAddFormAC: jest.fn().mockReturnValue("HIDE_ADD_FORM_AC"),
    showAlertAC: jest.fn().mockReturnValue("SHOW_ALERT_AC"),
  };
});

let manager = new AddPhotoReqManager();

describe("AddPhotoReqManager", () => {
  beforeEach(() => {
    manager = new AddPhotoReqManager();
    manager.dispatch = jest.fn();

    (batch as jest.Mock).mockClear();
    (hideAddFormAC as jest.Mock).mockClear();
    (showAlertAC as jest.Mock).mockClear();
  });

  describe("startNew", () => {
    test("", () => {});
  });

  describe("sendGetAddedPhotoReq", () => {
    test(`Do:
            - it create new request: GetAddedPhotoReq
            - it set on success req func - call request.addOnSuccess 
               - onSuccess it call this.dispatch(getAddedPhotoSuccessAC(photoData))
            - it send request - call request.fetch with photoId
    `, () => {
      const fetch = jest.fn();
      const addOnSuccess = jest.fn((callback) => {
        callback("photoData");
      });
      (GetAddedPhotoReq as jest.Mock).mockReturnValue({
        fetch,
        addOnSuccess,
      });

      //manager.removeReqFromState = jest.fn();

      manager.sendGetAddedPhotoReq("photoId");

      expect(GetAddedPhotoReq).toHaveBeenCalledTimes(1);
      expect(GetAddedPhotoReq).toHaveBeenLastCalledWith(true);

      expect(addOnSuccess).toHaveBeenCalledTimes(1);

      expect(getAddedPhotoSuccessAC).toHaveBeenCalledTimes(1);
      expect(getAddedPhotoSuccessAC).toHaveBeenLastCalledWith(
        "photoData",
        "photoId"
      );

      //expect(manager.removeReqFromState).toHaveBeenCalledTimes(1);
      //expect(manager.removeReqFromState).toHaveBeenCalledWith("photoId");

      expect(manager.dispatch).toHaveBeenCalledTimes(1);
      expect(manager.dispatch).toHaveBeenLastCalledWith("ADD_PHOTO_AC");

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenLastCalledWith("photoId");
    });
  });

  describe("stateChangesOnSuccess", () => {
    test(`Do:
            - it call react-redux batch, that call callback with logic
            - if no other requests it dispatched addPhotoRequestSuccessAC
                - if we still use same form it dispatched hideAddFormAC
            - it dispatched showAlertAC("Фото успешно добавлено.", "success")
    `, () => {
      manager.stateChangesOnSuccess("photoId");

      // We on same form and it's last request - we call hide form
      manager.anotherForm = false;
      manager.requests = new Map();

      expect(batch).toHaveBeenCalledTimes(1);

      expect(addPhotoRequestSuccessAC).toHaveBeenCalledTimes(1);
      expect(addPhotoRequestSuccessAC).toHaveBeenCalledWith(true, "photoId");

      expect(manager.dispatch).toHaveBeenNthCalledWith(
        1,
        "ADD_PHOTO_REQUEST_SUCCESS_AC"
      );
      expect(manager.dispatch).toHaveBeenNthCalledWith(2, "HIDE_ADD_FORM_AC");
      expect(manager.dispatch).toHaveBeenNthCalledWith(3, "SHOW_ALERT_AC");
    });

    /*   test(`Do:
            - it call react-redux batch, that call callback with logic
            - if no other requests it dispatched addPhotoRequestSuccessAC
                - if we still use same form it dispatched hideAddFormAC
            - it dispatched showAlertAC("Фото успешно добавлено.", "success")
    `, () => {
      manager.stateChangesOnSuccess();
      manager.requests.set(12, "hello");
      manager.anotherForm = false;

      expect(batch).toHaveBeenCalledTimes(1);

      expect(GetAddedPhotoReq).toHaveBeenCalledTimes(1);
      expect(GetAddedPhotoReq).toHaveBeenLastCalledWith(true);
    }); */
  });

  describe("beforeAddPhotoFirestoreReq", () => {
    test(``, () => {});
  });

  describe("onError", () => {
    test(``, () => {});
  });

  describe("cancel", () => {
    test(``, () => {});
  });
});
