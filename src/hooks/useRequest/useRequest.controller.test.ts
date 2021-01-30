import {
  onStart as onStartLog,
  onError as onErrorLog,
  onSuccess as onSuccessLog,
} from "../../photos/hook/requests/logger";
import { send, start, requests } from "./controller";
import { useRef } from "react";
import wait from "waait";

jest.mock("./../logger", () => {
  return {
    __esModule: true,
    onStart: jest.fn(),
    onError: jest.fn(),
    onSuccess: jest.fn(),
  };
});

const request = jest.fn();
const onError = jest.fn();
const onSuccess = jest.fn();
const onStart = jest.fn();

describe("Controller useRequest", () => {
  afterEach(() => {
    (onStartLog as jest.Mock).mockClear();
    (onErrorLog as jest.Mock).mockClear();
    (onSuccessLog as jest.Mock).mockClear();

    onError.mockClear();
    onSuccess.mockClear();
    onStart.mockClear();
    request.mockClear();
  });

  describe("Send", () => {
    test("On success - it call request func, onSuccess and log func", async () => {
      request.mockResolvedValueOnce("response");

      await send(
        "GET_ALL_TAGS",
        true,
        "signal" as any,
        "data",
        request,
        onError,
        onSuccess
      );

      expect(request).toHaveBeenCalledTimes(1);
      expect(request).toHaveBeenCalledWith("data", "signal");

      expect(onSuccessLog).toHaveBeenCalledTimes(1);
      expect(onSuccessLog).toHaveBeenCalledWith("response", "GET_ALL_TAGS");

      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(onSuccess).toHaveBeenCalledWith("response");
    });

    test("On error - it call request func, onError and log func", async () => {
      request.mockRejectedValueOnce("error");

      await send(
        "GET_ALL_TAGS",
        true,
        "signal" as any,
        "data",
        request,
        onError,
        onSuccess
      );

      expect(request).toHaveBeenCalledTimes(1);
      expect(request).toHaveBeenCalledWith("data", "signal");

      expect(onErrorLog).toHaveBeenCalledTimes(1);
      expect(onErrorLog).toHaveBeenCalledWith("error", "GET_ALL_TAGS");

      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith("error");
    });
  });

  describe("Start", () => {
    test("Success", async () => {
      request.mockResolvedValueOnce("response");

      start(
        "GET_ALL_PHOTOS",
        true,
        true,
        "signal" as any,
        "data",
        request,
        onStart,
        onError,
        onSuccess
      );

      expect(requests["GET_ALL_PHOTOS"]).toEqual(1);

      await wait(200);

      expect(onStart).toHaveBeenCalledTimes(1);
      expect(onStartLog).toHaveBeenCalledTimes(1);

      expect(requests["GET_ALL_PHOTOS"]).toEqual(0);
    });

    test("If single req it does not start if already exists req", async () => {
      requests["GET_ADDED_PHOTO"] = 23;

      request.mockResolvedValueOnce("response");

      start(
        "GET_ADDED_PHOTO",
        true,
        true,
        "signal" as any,
        "data",
        request,
        onStart,
        onError,
        onSuccess
      );

      expect(requests["GET_ADDED_PHOTO"]).toEqual(23);

      await wait(100);

      expect(onStart).toHaveBeenCalledTimes(0);
      expect(onStartLog).toHaveBeenCalledTimes(0);

      expect(request).toHaveBeenCalledTimes(0);
    });
  });
});
