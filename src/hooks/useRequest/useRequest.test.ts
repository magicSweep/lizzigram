import { start as iStart } from "./controller";
import { useRequest } from "./index";
import { useRef } from "react";

jest.mock("./controller", () => {
  const originalModule = jest.requireActual("./controller");

  return {
    __esModule: true,
    ...originalModule,
    start: jest.fn(),
  };
});

jest.mock("react", () => {
  return {
    __esModule: true,
    useRef: jest.fn(() => ({ current: undefined })),
  };
});

//@ts-ignore
global.AbortController = jest.fn(() => ({
  signal: "signal",
  abort: jest.fn(),
}));

describe("useRequest", () => {
  test("", () => {
    const { start, cancel } = useRequest("GET_ALL_TAGS", true);

    start(undefined, "request" as any);

    expect(iStart).toHaveBeenCalledTimes(1);
  });
});
