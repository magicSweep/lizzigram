import {
  isInSearchTerms,
  generatePhotoId,
  makePhotoFormData,
  makeNewPhotoStateItems,
  getOnlyTrueTags,
  fromStrToDate,
  makeAddPhotoData,
  makeEditPhotoData,
} from "./DataHelper";

/* class FormData {
  data = new Map();
  append = (id, data) => {
    this.data.set(id, data);
  };
}

global.FormData = FormData; */

describe("isInSearchTerms", () => {
  test("", () => {
    const search = {
      yearsOld: -1,
      tagsIds: [],
    };

    const photoData = {
      yearsOld: 2,
      tags: { by: true },
    };

    let result = isInSearchTerms(search, photoData);

    expect(result).toEqual(true);

    search.yearsOld = 2;

    result = isInSearchTerms(search, photoData);

    expect(result).toEqual(true);

    search.yearsOld = 1;

    result = isInSearchTerms(search, photoData);

    expect(result).toEqual(false);

    search.tagsIds = ["by"];

    result = isInSearchTerms(search, photoData);

    expect(result).toEqual(false);

    search.yearsOld = 2;

    result = isInSearchTerms(search, photoData);

    expect(result).toEqual(true);

    search.tagsIds = ["by", "three", "your"];

    result = isInSearchTerms(search, photoData);

    expect(result).toEqual(false);

    photoData.tags.three = true;
    photoData.tags.your = true;
    photoData.tags.blue = true;

    result = isInSearchTerms(search, photoData);

    expect(result).toEqual(true);

    result = isInSearchTerms(search, {});

    expect(result).toEqual(true);
  });
});

describe("fromStrToDate", () => {
  test("From date string make Date obj", () => {
    const date = fromStrToDate("2017-06-05");

    expect(date.getTime()).toEqual(1496620800000);
  });
  test("If bad date string - Error", () => {
    try {
      const date = fromStrToDate("Hello");

      expect(true).toEqual(false);
    } catch (err) {
      expect(err.message).toEqual("We got bad date | Hello");
    }
  });
});

test("generatePhotoId", () => {
  const id = generatePhotoId("2017-06-05");

  expect(id.length).toEqual(13);
});

test("makePhotoFormData - it add props from IAddEditPhotoPostRequest to FormData", () => {
  const addEditPhotoPostRequest = {
    file: {},
    id: "someId",
    userUid: "userUid",
  };

  const formData = makePhotoFormData(addEditPhotoPostRequest);

  expect(formData.data.get("userUid")).toEqual("userUid");
  expect(formData.data.size).toEqual(3);
});

test("getOnlyTrueTags", () => {
  const res = getOnlyTrueTags({
    h12: false,
    er3: true,
    "22w": false,
    r34: true,
  });

  expect(res).toEqual({ er3: true, r34: true });
});

describe("makeAddPhotoData", () => {
  test("", () => {
    const addPhotoFormData = {
      desc: "hello desc",
      date: "2020-05-05",
      photoFile: {},
      tags: {
        h12: false,
        er3: true,
        "22w": false,
        r34: true,
      },
    };

    const data = makeAddPhotoData(addPhotoFormData);

    expect(data.addedByUserUID).toEqual("");
    expect(data.aspectRatio).toEqual(0);
    expect(data.base64).toEqual("");
    expect(data.tags).toEqual({ er3: true, r34: true });
    expect(data.isActive).toEqual(false);
    expect(data.imageExtention).toEqual("jpeg");
    expect(data.description).toEqual("hello desc");
    expect(data.files).toEqual([]);
    expect(data.googleDriveId).toEqual("");
    expect(data.iconSrc).toEqual("");
    expect(data.src).toEqual("");
    expect(data.srcSet).toEqual("");
    expect(data.yearsOld).toEqual(1);
    //expect(data._timestamp).toEqual(1);
    expect(data.date.toString()).toEqual(
      "Tue May 05 2020 03:00:00 GMT+0300 (Moscow Standard Time)"
    );
  });
});

describe("makeEditPhotoData - depends on what fields on form fill user - what change in photo", () => {
  const editPhotoFormData = {
    desc: "hello desc",
    date: "2020-05-05",
    photoFile: {},
    tags: {
      h12: false,
      er3: true,
      "22w": false,
      r34: true,
    },
  };

  test("If we set empty data - we got nothing to change", () => {
    const fieldsToUpdate = makeEditPhotoData({});

    expect(fieldsToUpdate).toEqual({});
  });

  test("", () => {
    const fieldsToUpdate = makeEditPhotoData(editPhotoFormData);

    expect(fieldsToUpdate.date.toString()).toEqual(
      "Tue May 05 2020 03:00:00 GMT+0300 (Moscow Standard Time)"
    );
    expect(fieldsToUpdate.description).toEqual("hello desc");
    expect(fieldsToUpdate.yearsOld).toEqual(1);
    expect(fieldsToUpdate.tags).toEqual({ er3: true, r34: true });
  });
});
