import { wakeUpDyno } from ".";

//const offset = new Date().getTimezoneOffset() / 60;
const getUtcHours = (hours: number, offset: number) => {
  let result = 0;

  result = hours + offset;

  if (result > 23) return result - 24;

  if (result < 0) return 24 + result;
};

const getMoscowHours = () => {
  const date = new Date();

  const hours = date.getHours();

  const hoursOffset = date.getTimezoneOffset() / 60;

  const utcHours = getUtcHours(hours, hoursOffset);

  let moscowTime = utcHours + 3;

  if (moscowTime > 23) return moscowTime - 24;

  return moscowTime;
};

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
