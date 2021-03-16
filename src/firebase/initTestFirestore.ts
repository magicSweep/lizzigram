import { photos as photosData, addedPhoto } from "./../photos/__mock/data";
import random from "lodash.random";
import wait from "waait";
import { photosCollectionName, tagsCollectionName } from "../config";
import { tagsData } from "../component/Tags/TagsCheckbox/__mock";

// ONLY FOR TESTS

// PHOTOS
//this.query = getFirestoreDb().collection(photosCollectionName);
// where, limit, orderBy

let db: any;

export const getFirestoreDb = () => {
  /* if (typeof window !== "undefined") {
      db = firebase.firestore();
    } */

  if (!db) {
    db = new DB();
  }

  return db;
};

export const getPhotosCollection = () => {
  return getFirestoreDb().collection(photosCollectionName);
};

export const getTagsCollection = () => {
  return getFirestoreDb().collection(tagsCollectionName);
};

class DB {
  collection = (name: string) => {
    if (name === photosCollectionName) return new PhotosQuery();

    if (name === tagsCollectionName) return new TagssQuery();

    throw new Error(`No implementation for collection named - ${name}`);
  };
}

abstract class AQuery {
  iStartAt: string = "";
  iLimit: number = 3;
  docId: string = "";

  doc = (docId?: string) => {
    if(docId) this.docId = docId;
    return this;
  };

  where = () => {
    return this;
  };

  limit = () => {
    return this;
  };

  orderBy = () => {
    return this;
  };

  startAt = () => {
    this.iStartAt = "hello";
    return this;
  };

  abstract set(): Promise<any>;
  abstract get(): Promise<any>;
}

class TagssQuery extends AQuery {
  set = async () => {
    return Promise.reject("WHAT THE FUCK SET TAGS????");
  };

  get = async () => {
    await wait(3000);

    let res: FirestoreData<ICheckboxItemData>[] = [];

    tagsData.forEach((tagData, id) => {
      let data = new FirestoreData(id, tagData);
      res.push(data);
    });

    return res;
  };
}

class PhotosQuery extends AQuery {
  set = async () => {
    if (this.docId)  this.docId = "";

    await wait(3000);
    
    return null;
  };

  get = async () => {
    if (this.docId) {
      this.docId = "";

      await wait(3000);

      return new FirestoreData(`${random(2000000)}`, addedPhoto);
    }
    else if (this.iStartAt) {
      this.iStartAt = "";

      const photos = photosData.slice(3);

      let res = photos.map((photo, index) => {
        return new FirestoreData(`${random(2000000)}`, photo);
      });

      await wait(3000);

      return res;
    } else {
      const photos = photosData.slice(0, 4);

      let res = photos.map((photo, index) => {
        return new FirestoreData(`${random(2000000)}`, photo);
      });

      await wait(3000);

      return res;
    }
  };
}

class FirestoreData<T> {
  id: string;
  iData: T;

  constructor(id: string, iData: T) {
    this.id = id;
    this.iData = iData;
  }

  data = () => this.iData;
}
