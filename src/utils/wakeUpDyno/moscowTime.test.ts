import { getUtcHours, getMoscowHours } from "./moscowTime";

describe("sendHttpsReq", () => {
  test("We send request to google", async () => {
    const date = new Date();

    const dateOffset = date.getTimezoneOffset() / 60; // -3

    let res = getUtcHours(2, -3);

    expect(res).toEqual(23);

    res = getUtcHours(22, 6);

    expect(res).toEqual(4);

    res = getUtcHours(23, 1);

    expect(res).toEqual(0);

    res = getUtcHours(2, -3);

    expect(res).toEqual(23);

    const hours = getMoscowHours();

    expect(hours).toEqual(new Date().getHours());
  });
});
