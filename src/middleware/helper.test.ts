import { getPhotoIdAndExtension, isValidPhotoId } from "./helper";

describe("Get id and extension", () => {
  test("", () => {
    const name = "12foDmCbGL8A0aY38mofeL9f6QwG8OjPc.jpg";

    const [id, extension] = name.split(".");

    expect(id).toEqual("12foDmCbGL8A0aY38mofeL9f6QwG8OjPc");
    expect(extension).toEqual("jpg");

    const res = "12foDmCbGL8A0aY38mofeL9f6QwG8OjPc".split(".");

    expect(res).toEqual(["12foDmCbGL8A0aY38mofeL9f6QwG8OjPc"]);
  });
});

describe("getPhotoIdAndExtension", () => {
  test("", () => {
    let res = getPhotoIdAndExtension("12foDmCbGL8A0aY38mofeL9f6QwG8OjPc.jpg");

    expect(res).toEqual({
      ext: "jpg",
      photoId: "12foDmCbGL8A0aY38mofeL9f6QwG8OjPc",
    });

    res = getPhotoIdAndExtension("12foDmCbGL8A0aY38mofeL9f6QwG8OjPc");

    expect(res).toEqual({
      ext: "",
      photoId: "12foDmCbGL8A0aY38mofeL9f6QwG8OjPc",
    });
  });
});

describe("isValidPhotoId", () => {
  test("", () => {
    let res = isValidPhotoId("12foDmCbGL8A0aY38mofeL9f6QwG8OjPc.jpg");
    expect(res).toEqual(true);

    res = isValidPhotoId("12foDmCbGL8A0aY38mofeL9f6QwG8OjPc");
    expect(res).toEqual(true);

    res = isValidPhotoId("12foDmCbGL8A0aY38mofeL9f6QwG8OjPc!>>");
    expect(res).toEqual(false);
  });
});
