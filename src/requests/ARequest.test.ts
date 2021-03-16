import ARequest from "./ARequest";
import wait from "waait";

import {
  onStart as onStartLog,
  onError as onErrorLog,
  onSuccess as onSuccessLog,
} from "./logger";

jest.mock("./logger", () => {
  return {
    __esModule: true,
    onStart: jest.fn(),
    onError: jest.fn(),
    onSuccess: jest.fn(),
  };
});

global.AbortController = jest.fn();

class TestRequest extends ARequest<string, string> {
  type: TRequestType = "GET_ALL_TAGS";

  request = () => {
    return Promise.resolve("hello");
  };
}

let request = undefined;

describe("ARequest", () => {
  beforeEach(() => {
    (onStartLog as jest.Mock).mockClear();
    (onErrorLog as jest.Mock).mockClear();
    (onSuccessLog as jest.Mock).mockClear();
  });
  describe("Fetch", () => {
    test("Does it even work", () => {
      request = new TestRequest(true);
      request.request = jest.fn();

      request.fetch("hello");

      expect(onStartLog).toHaveBeenCalledTimes(1);
      expect(request.request).toHaveBeenCalledTimes(1);
    });

    test(` 
        - it must set this.reqData - TReqData
        - it must call onStartLog
        - it must call our onStart if it not undefined
        - call this.request
        - if ok:
          - it must call onSuccessLog
          - it must call our onSuccess if it not undefined
        - if not ok:
          - it must decrement ARequest.requests[this.type]
          - it must call onErrorLog
          - it must call onError if it not undefined
    `, async () => {
      request = new TestRequest(true);
      request.request = jest.fn().mockResolvedValue("result");

      const onStart = jest.fn();
      const onSuccess = jest.fn();

      request.addOnStart(onStart);
      request.addOnSuccess(onSuccess);

      request.fetch("hello");

      expect(request.reqData).toEqual("hello");

      expect(onStartLog).toHaveBeenCalledTimes(1);
      expect(onStartLog).toHaveBeenCalledWith("hello", "GET_ALL_TAGS");
      expect(onStart).toHaveBeenCalledTimes(1);
      expect(onStart).toHaveBeenCalledWith("hello");

      expect(request.request).toHaveBeenCalledTimes(1);

      await wait(200);

      expect(onSuccessLog).toHaveBeenCalledTimes(1);
      expect(onSuccessLog).toHaveBeenCalledWith("result", "GET_ALL_TAGS");
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(onSuccess).toHaveBeenCalledWith("result");
    });

    test(` 
        - if request not ok:
          - it must call onErrorLog
          - it must call our onError if it not undefined
    `, async () => {
      request = new TestRequest(true);

      request.request = jest.fn().mockRejectedValue("Bad fat error");

      const onError = jest.fn();

      request.addOnError(onError);

      request.fetch("hello");

      expect(request.request).toHaveBeenCalledTimes(1);

      await wait(200);

      expect(onErrorLog).toHaveBeenCalledTimes(1);
      expect(onErrorLog).toHaveBeenCalledWith("Bad fat error", "GET_ALL_TAGS");
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith("Bad fat error");
    });
  });
});
