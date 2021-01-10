export const PHOTOS_FIRESTORE_TEST_COLLECTION_NAME = "phototest";
import random from "lodash.random";

class AppTestHelper {
  photoId: string;

  photo = {
    _timestamp: Date.now(),
    description: "Super description",
    date: new Date(), // temporary
    yearsOld: 1,
    tags: {
      "123were": true,
    },

    isActive: false,

    addedByUserUID: "superuser12334",
  };

  db: FirebaseFirestore.Firestore;

  constructor(db: FirebaseFirestore.Firestore) {
    this.db = db;
    const d = new Date(2020, 6, 6).getTime() + random(1200);

    this.photoId = d.toString();
    this.photo.date = new Date(d);
  }

  createPhotoRecord = () => {
    return this.db
      .collection(PHOTOS_FIRESTORE_TEST_COLLECTION_NAME)
      .doc(this.photoId)
      .set(this.photo);
  };

  getPhotoRecordFromFirestore = () => {
    return this.db
      .collection(PHOTOS_FIRESTORE_TEST_COLLECTION_NAME)
      .doc(this.photoId)
      .get();
  };

  setExistedPhoto = async (photoId: string) => {
    const doc = await this.db
      .collection(PHOTOS_FIRESTORE_TEST_COLLECTION_NAME)
      .doc(photoId)
      .get();

    if (!doc.exists) throw new Error(`No photo with id - ${photoId}`);

    this.photoId = photoId;

    this.photo = doc.data() as any;
  };

  removePhotoRecord = () => {
    return this.db
      .collection(PHOTOS_FIRESTORE_TEST_COLLECTION_NAME)
      .doc(this.photoId)
      .delete();
  };
}

export default AppTestHelper;
