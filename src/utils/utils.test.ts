import { getYearsOld } from ".";

describe("getYearsOld", () => {
  test("", () => {
    expect(getYearsOld(new Date("2018-07-11"))).toEqual(0);
  });
});
