import firebase from "firebase/app";
import { photosCollectionName, limitPhotosPerQuery } from "../../../../config";
import {
  allPhotosStartNewRequestAC,
  allPhotosRequestErrorAC,
  allPhotosRequestSuccessAC,
  allPhotosStartMoreRequestAC,
  fetchMorePhotosRequestSuccessAC,
} from "../../../store/action/photos";
import { makeNewPhotoStateItems } from "../../helper/DataHelper";
import { getFirestoreDb } from "../../../../firebase/initFirestore";
import { makeQueryBySerchTerm, isInitState } from "../../helper/QueryHelper";

export let query: firebase.firestore.Query;

let prevSearchState: ISearchState;
let isInitSearchState: boolean;

export const prepareQuery = (searchState: ISearchState) => {
  query = getFirestoreDb().collection(photosCollectionName);
  query = makeQueryBySerchTerm(query, searchState);
};

// LOAD PHOTOS
export const loadPhotos = async (searchState: ISearchState) => {
  /*  prepareQuery(searchState);

  const querySnapshot = await query.limit(limitPhotosPerQuery + 1).get();

  return makeNewPhotoStateItems(querySnapshot, limitPhotosPerQuery); */

  prepareQuery(searchState);

  isInitSearchState = isInitState(searchState);

  prevSearchState = searchState;

  if (isInitSearchState) query = query.orderBy("_timestamp", "desc");

  const querySnapshot = await query
    .where("isActive", "==", true)
    .limit(limitPhotosPerQuery + 1)
    .get();

  return makeNewPhotoStateItems(querySnapshot, limitPhotosPerQuery);

  /* const q = getFirestoreDb().collection(photosCollectionName);

  const querySnapshot = await q.get();

  return makeNewPhotoStateItems(querySnapshot, 25); */
};

export const onStartLoadPhotos = (dispatch: any) =>
  dispatch(allPhotosStartNewRequestAC());

export const onError = (dispatch: any) => dispatch(allPhotosRequestErrorAC());

export const onSuccessLoadPhotos = (dispatch: any, data: TGetPhotosData) =>
  dispatch(allPhotosRequestSuccessAC(data));

// LOAD MORE
export const loadMore = async (nextPageDocRef: any) => {
  if (!nextPageDocRef) throw new Error("No NEXT PAGE REF...");

  //if (!query) throw new Error("Bad firestore query ...");

  prepareQuery(prevSearchState);

  if (isInitSearchState) query = query.orderBy("_timestamp", "desc");

  const querySnapshot = await query
    .where("isActive", "==", true)
    .startAt(nextPageDocRef)
    .limit(limitPhotosPerQuery + 1)
    .get();

  return makeNewPhotoStateItems(querySnapshot, limitPhotosPerQuery);
};

export const onStartLoadMorePhotos = (dispatch: any) =>
  dispatch(allPhotosStartMoreRequestAC());

export const onSuccessLoadMorePhotos = (
  dispatch: any,
  data: TGetPhotosData
) => {
  dispatch(fetchMorePhotosRequestSuccessAC(data));
};
