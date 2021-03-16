import EditPhotoFirestoreReq from "./EditPhotoFirestoreReq";
import EditPhotoWorkerReq from "./EditPhotoWorkerReq";
import {
  editPhotoStartRequestAC,
  editPhotoRequestErrorAC,
  editPhotoRequestSuccessAC,
  editPhotoAC,
} from "../../photos/store/action/photos";
import { batch } from "react-redux";
import { hideEditFormAC, showAlertAC } from "../../store";
import GetEditedPhotoReq from "./GetEditedPhotoReq";
import { makeEditPhotoData, isInSearchTerms } from "../helper/DataHelper";

import EditPhotoReqManager from "./EditPhotoReqManager";

jest.mock("lodash.random");

jest.mock("react-redux");

(batch as jest.Mock).mockImplementation((callback) => callback());

jest.mock("../helper/DataHelper", () => {
  return {
    __esModule: true,
    isInSearchTerms: jest.fn(),
    makeEditPhotoData: jest.fn(),
  };
});

jest.mock("./GetEditedPhotoReq", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});
jest.mock("./EditPhotoFirestoreReq", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});
jest.mock("./EditPhotoWorkerReq", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock("../../photos/store/action/photos", () => {
  return {
    __esModule: true,
    editPhotoStartRequestAC: jest
      .fn()
      .mockReturnValue("EDIT_PHOTO_START_REQUEST_AC"),
    editPhotoRequestErrorAC: jest
      .fn()
      .mockReturnValue("EDIT_PHOTO_REQUEST_ERROR_AC"),
    editPhotoRequestSuccessAC: jest
      .fn()
      .mockReturnValue("EDIT_PHOTO_REQUEST_SUCCESS_AC"),
    editPhotoAC: jest.fn().mockReturnValue("EDIT_PHOTO_AC"),
  };
});

jest.mock("../../store", () => {
  return {
    __esModule: true,
    hideEditFormAC: jest.fn().mockReturnValue("HIDE_EDIT_FORM_AC"),
    showAlertAC: jest.fn().mockReturnValue("SHOW_ALERT_AC"),
  };
});

let manager = new EditPhotoReqManager();

describe("AddPhotoReqManager", () => {
  beforeEach(() => {
    manager = new EditPhotoReqManager();
    manager.dispatch = jest.fn();

    (batch as jest.Mock).mockClear();
    (hideEditFormAC as jest.Mock).mockClear();
    (showAlertAC as jest.Mock).mockClear();
    (isInSearchTerms as jest.Mock).mockClear();
    (editPhotoRequestSuccessAC as jest.Mock).mockClear();
  });

  describe("startNew", () => {
    test("", () => {});
  });

  describe("sendGetEditedPhotoReq", () => {
    test(`Do:
            - it create new request: GetEditedPhotoReq
            - it set on success req func - call request.addOnSuccess 
               - onSuccess it call this.dispatch(editPhotoAC(photoData))
            - it send request - call request.fetch with photoId
    `, () => {
      const fetch = jest.fn();
      const addOnSuccess = jest.fn((callback) => {
        callback("photoData");
      });
      (GetEditedPhotoReq as jest.Mock).mockReturnValue({
        fetch,
        addOnSuccess,
      });

      manager.sendGetEditedPhotoReq("photoId");

      expect(GetEditedPhotoReq).toHaveBeenCalledTimes(1);
      expect(GetEditedPhotoReq).toHaveBeenLastCalledWith(true);

      expect(addOnSuccess).toHaveBeenCalledTimes(1);

      expect(editPhotoAC).toHaveBeenCalledTimes(1);
      expect(editPhotoAC).toHaveBeenLastCalledWith("photoData");

      expect(manager.dispatch).toHaveBeenCalledTimes(1);
      expect(manager.dispatch).toHaveBeenLastCalledWith("EDIT_PHOTO_AC");

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenLastCalledWith("photoId");
    });
  });

  describe("stateChangesOnSuccess", () => {
    test(`Do:
            - it call react-redux batch, that call callback with logic
            - we check if edited photo in current search terms
              - if yes - we dispatch editPhotoRequestSuccessAC with no photoId and isLastReq
              - if no - we dispatch editPhotoRequestSuccessAC with photoId( it removes this photo from global state) and isLastReq
                - and send request for edited photo - call this.sendGetEditedPhotoReq(photoId)
            - if we still use same form and it is the last request - we close form by dispatched hideAddFormAC
            - it shows success alert - showAlertAC("Фото успешно добавлено.", "success")
    `, () => {
      // PREPARE
      manager.searchState = "searchState" as any;
      manager.sendGetEditedPhotoReq = jest.fn();
      manager.anotherForm = false;

      (isInSearchTerms as jest.Mock).mockReturnValue(true);

      // CALL
      manager.stateChangesOnSuccess(
        "photoFirestoreData" as any,
        "photoId",
        true
      );

      // EXPECTS
      expect(batch).toHaveBeenCalledTimes(1);

      // EDITED PHOTO IN SEARCH TERMS
      expect(isInSearchTerms).toHaveBeenCalledTimes(1);
      expect(isInSearchTerms).toHaveBeenCalledWith(
        "searchState",
        "photoFirestoreData"
      );

      // WE DISPATCH editPhotoRequestSuccessAC WITH UNDEFINED PHOTO ID - IT DO NOTHING WITH PHOTO IN STATE
      expect(editPhotoRequestSuccessAC).toHaveBeenCalledTimes(1);
      expect(editPhotoRequestSuccessAC).toHaveBeenCalledWith(undefined, true);
      expect(manager.dispatch).toHaveBeenNthCalledWith(
        1,
        "EDIT_PHOTO_REQUEST_SUCCESS_AC"
      );

      // WE SEND REQUEST TO FIRESTORE FOR EDITED PHOTO INFO
      expect(manager.sendGetEditedPhotoReq).toHaveBeenCalledTimes(1);
      expect(manager.sendGetEditedPhotoReq).toHaveBeenCalledWith("photoId");

      // WE HIDE FORM - CAUSE IT IS LAST REQEUST AND WE DO NOT CLOSE IT
      expect(manager.dispatch).toHaveBeenNthCalledWith(2, "HIDE_EDIT_FORM_AC");
      // WE SHOW SUCCESS ALERT
      expect(manager.dispatch).toHaveBeenNthCalledWith(3, "SHOW_ALERT_AC");
    });

    test(`Do:
            - it call react-redux batch, that call callback with logic
            - we check if edited photo in current search terms
              - if yes - we dispatch editPhotoRequestSuccessAC with no photoId and isLastReq
              - if no - we dispatch editPhotoRequestSuccessAC with photoId( it removes this photo from global state) and isLastReq
                - and send request for edited photo - call this.sendGetEditedPhotoReq(photoId)
            - if close form and open new - we do not dispatched hideAddFormAC
            - it shows success alert - showAlertAC("Фото успешно добавлено.", "success")
    `, () => {
      // PREPARE
      manager.searchState = "searchState" as any;
      manager.sendGetEditedPhotoReq = jest.fn();
      manager.anotherForm = true;

      (isInSearchTerms as jest.Mock).mockReturnValue(false);

      // CALL
      manager.stateChangesOnSuccess(
        "photoFirestoreData" as any,
        "photoId",
        true
      );

      // EXPECTS
      expect(batch).toHaveBeenCalledTimes(1);

      // EDITED PHOTO IN SEARCH TERMS
      expect(isInSearchTerms).toHaveBeenCalledTimes(1);
      expect(isInSearchTerms).toHaveBeenCalledWith(
        "searchState",
        "photoFirestoreData"
      );

      // WE DISPATCH editPhotoRequestSuccessAC WITH UNDEFINED PHOTO ID - IT DO NOTHING WITH PHOTO IN STATE
      expect(editPhotoRequestSuccessAC).toHaveBeenCalledTimes(1);
      expect(editPhotoRequestSuccessAC).toHaveBeenCalledWith("photoId", true);
      expect(manager.dispatch).toHaveBeenNthCalledWith(
        1,
        "EDIT_PHOTO_REQUEST_SUCCESS_AC"
      );

      // WE DO NOT SEND REQUEST TO FIRESTORE FOR EDITED PHOTO INFO
      expect(manager.sendGetEditedPhotoReq).toHaveBeenCalledTimes(0);

      // WE OPEN ANOTHER FORM, THAT'S WHY WE DO NOT CLOSE IT
      expect(hideEditFormAC).toHaveBeenCalledTimes(0);
      // WE SHOW SUCCESS ALERT
      expect(manager.dispatch).toHaveBeenNthCalledWith(2, "SHOW_ALERT_AC");
    });
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
