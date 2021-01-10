import PhotoModel from "./PhotoModel";

const pathsByWidths = new Map([
  [400, "http://cloudinary.com/img_400.jpg"],
  [800, "http://cloudinary.com/img_800.jpg"],
  [1200, "http://cloudinary.com/img_1200.jpg"],
  [1900, "http://cloudinary.com/img_1900.jpg"],
  [3840, "http://cloudinary.com/img_3840.jpg"],
]);

const photo = {
  //_id: any;
  /*  base64: "",
  files: [],
  aspectRatio: 0, //1.6
  srcSet: "",
  iconSrc: "",
  src: "", */

  _timestamp: Date.now(),
  description: "Hello",
  date: Date.now(),
  yearsOld: 2,
  tags: {
    sfa3243: true,
  },

  //googleDriveId: "",
  // do we make changes by express
  isActive: false,

  addedByUserUID: "user1234",
};

const dbMock = {
  collection: () => dbMock,
  doc: () => dbMock,
  get: () =>
    Promise.resolve({
      data: () => photo,
      id: "photoId123",
      exists: true,
    }),
};

/*  .collection(PHOTOS_FIRESTORE_COLLECTION_NAME)
      .doc(this.photoId)
      .get(); */

const photoModel = new PhotoModel(dbMock, "photoId123", "user1234");

describe("PhotoModel", () => {
  describe("validate", () => {
    test("validateFirestoreRecord", async () => {
      await photoModel.validateFirestoreRecord();

      expect(photoModel.prevPhoto.description).toEqual("Hello");
      expect(photoModel.prevPhoto.isActive).toEqual(false);
    });

    test("validateAddFirestoreRecord", async () => {
      photo.isActive = true;

      try {
        await photoModel.validateAddFirestoreRecord();
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message.includes("Photo to add is activated")).toEqual(true);
      }
    });

    test("validateEditFirestoreRecord", async () => {
      photo.isActive = false;

      try {
        await photoModel.validateEditFirestoreRecord();
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message.includes("Photo to edit is not activated")).toEqual(
          true
        );
      }
    });
  });

  test("setImageSrcAttrs", () => {
    photoModel.setImageSrcAttrs(pathsByWidths);

    expect(photoModel.photo.src).toEqual(pathsByWidths.get(800));
    expect(photoModel.photo.iconSrc).toEqual(pathsByWidths.get(400));

    expect(photoModel.photo.srcSet).toEqual(
      "http://cloudinary.com/img_400.jpg 400w, http://cloudinary.com/img_800.jpg 600w, http://cloudinary.com/img_1200.jpg 1000w, http://cloudinary.com/img_1900.jpg 1500w, http://cloudinary.com/img_3840.jpg 2200w"
    );
  });

  test("makeUpdatedProperties", () => {
    photoModel.setAspectRatio(1.5);
    photoModel.setBase64String("string64");
    photoModel.setImageSrcAttrs(pathsByWidths);
    photoModel.setFiles(["ID234", "ID234"]);

    const updProps = photoModel.makeUpdatedProperties();

    expect(updProps).toEqual({
      aspectRatio: 1.5,
      base64: "string64",
      files: ["ID234", "ID234"],
      iconSrc: "http://cloudinary.com/img_400.jpg",
      isActive: true,
      src: "http://cloudinary.com/img_800.jpg",
      srcSet:
        "http://cloudinary.com/img_400.jpg 400w, http://cloudinary.com/img_800.jpg 600w, http://cloudinary.com/img_1200.jpg 1000w, http://cloudinary.com/img_1900.jpg 1500w, http://cloudinary.com/img_3840.jpg 2200w",
    });
  });
});
