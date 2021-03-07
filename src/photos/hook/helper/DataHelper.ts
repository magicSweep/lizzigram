//import { IAddEditPhotoPostRequest, IPhoto } from "./../../../../types";
import firebase from "firebase/app";
import { getYearsOld } from "../../../utils";
/* import {
  IAddPhotoFormData,
  IEditPhotoFormData,
  ISearchState,
  IEditPhotoData,
  TPhotosData,
} from "./../../../types"; */
//import { searchInitialState } from "../../store/reducer/search";
import random from "lodash.random";

export const generatePhotoId = (photoDate: string) => {
  const date = fromStrToDate(photoDate);

  return (date.getTime() + random(69999)).toString();
};

export const makePhotoFormData = (data: IAddEditPhotoPostRequest) => {
  const formData = new FormData();

  formData.append("id", data.id);
  formData.append("userUid", data.userUid);
  formData.append("file", data.file);

  return formData;
};

export const makeNewPhotoStateItems = (
  querySnapshot: firebase.firestore.QuerySnapshot,
  limit: number
): TGetPhotosData => {
  let hasNextPage = false;

  let nextPageDocRef = undefined;

  let count = 0;

  const photoData: TPhotosData = new Map();

  console.log("MAKE NEW PHOTO STATE ITEMS", limit);

  console.log(
    "MAKE NEW PHOTO STATE ITEMS",
    (() => {
      let ph: any = new Map();

      querySnapshot.forEach((photo) => {
        ph.set(photo.id, photo.data());
      });

      return ph;
    })()
  );

  querySnapshot.forEach((photo) => {
    if (count >= limit) {
      hasNextPage = true;
      nextPageDocRef = photo;
    } else {
      photoData.set(photo.id, photo.data() as IPhoto);
      count++;
    }
  });

  //console.log("makeNewPhotoStateItems", (nextPageDocRef as any).id, photoData);

  return {
    hasNextPage,
    nextPageDocRef,
    photos: photoData,
  };
};

export const getOnlyTrueTags = (tags: { [name: string]: boolean }) => {
  const result: { [id: string]: boolean } = {};
  for (let id in tags) {
    if (tags[id] === true) {
      result[id] = true;
    }
  }

  return result;
};

export const fromStrToDate = (strDate: string) => {
  const date = new Date(strDate);

  if (isNaN(date.getTime())) throw new Error(`We got bad date | ${strDate}`);

  return date;
};

export const makeAddPhotoData = (
  formData: IAddPhotoFormData
  //operationType: "edit" | "add"
): IPhoto => {
  const description = formData.desc ? formData.desc : "";

  const tags = getOnlyTrueTags(formData.tags);

  const photoDate = fromStrToDate(formData.date);

  console.log("!!! MAKE ADD PHOTO DATA | DATE", photoDate, formData.date);

  const yearsOld = getYearsOld(photoDate);

  console.log("!!! MAKE ADD PHOTO DATA | yearsOld", yearsOld);

  const _timestamp = new Date();

  return {
    date: photoDate,
    tags,
    yearsOld,
    description,
    base64: "",
    files: [],
    aspectRatio: 0,
    srcSet: "",
    iconSrc: "",
    src: "",
    _timestamp,
    googleDriveId: "",
    addedByUserUID: "",
    isActive: false,
    imageExtention: "jpeg",
  };
};

export const makeEditPhotoData = (
  formData: IEditPhotoFormData
  //operationType: "edit" | "add"
): IEditPhotoData => {
  const fieldsToUpdate: IEditPhotoData = {};

  if (formData.date) {
    const photoDate = fromStrToDate(formData.date);

    fieldsToUpdate.date = photoDate;

    console.log("!!! MAKE EDIT PHOTO DATA | DATE", photoDate, formData.date);

    fieldsToUpdate.yearsOld = getYearsOld(photoDate);

    console.log("!!! MAKE EDIT PHOTO DATA | yearsOld", fieldsToUpdate.yearsOld);
  }
  if (formData.tags) fieldsToUpdate.tags = getOnlyTrueTags(formData.tags);
  if (formData.desc) fieldsToUpdate.description = formData.desc;

  /* if (formData.photoFile && formData.photoFile.length > 0)
    fieldsToUpdate.isActive = false; */

  return fieldsToUpdate;
};

export const isInSearchTerms = (
  searchState: ISearchState,
  photo: IEditPhotoData
) => {
  if (photo.yearsOld) {
    if (searchState.yearsOld >= 0 && searchState.yearsOld !== photo.yearsOld)
      return false;
  }

  if (photo.tags) {
    if (searchState.tagsIds.length === 0) {
      return true;
    } else {
      let is = true;
      for (let tagId of searchState.tagsIds) {
        if (!photo.tags[tagId]) {
          return false;
        }
      }

      return is;
    }
  }

  return true;

  /*   if (searchState.yearsOld >= 0 && searchState.yearsOld !== photo.yearsOld)
    return false; */
};
