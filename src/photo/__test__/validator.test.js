import { isValidFile, isValidID } from "../validator";

describe("isValidFile", () => {
  test("", () => {
    const file = {
      mimetype: "image/jpeg",
    };

    expect(isValidFile(file)).toEqual(true);

    file.mimetype = "text/py";

    expect(isValidFile(file)).toEqual(false);
  });
});

describe("isValidID", () => {
  test("", () => {
    let id = "1234asdfgvcdf";

    expect(isValidID(id)).toEqual(false);

    expect(isValidID(undefined)).toEqual(false);

    id = "1234567890123aaaa";

    expect(isValidID(id)).toEqual(false);

    id = "aaaa1234567890123";

    expect(isValidID(id)).toEqual(false);

    id = "123456aaa7890123";

    expect(isValidID(id)).toEqual(false);

    id = "1234567890123";

    expect(isValidID(id)).toEqual(true);
  });
});
