import { getFileNameWithoutExtension } from ".";

describe("getFileNameWithoutExtension", () => {
  test("", () => {
    let filename = "hello.txt";

    expect(getFileNameWithoutExtension(filename)).toEqual("hello");

    filename = "hello";

    expect(getFileNameWithoutExtension(filename)).toEqual("hello");

    filename = "hello.bye.jpg";

    expect(getFileNameWithoutExtension(filename)).toEqual("hello.bye");

    filename = "hello.two..jpg";

    expect(getFileNameWithoutExtension(filename)).toEqual("hello.two");
  });
});
