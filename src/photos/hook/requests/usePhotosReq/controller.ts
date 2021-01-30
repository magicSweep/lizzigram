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

export const prepareQuery = (searchState: ISearchState) => {
  query = getFirestoreDb().collection(photosCollectionName);
  query = makeQueryBySerchTerm(query, searchState);
};

/* export const request = async (nextPageDocRef?: any) => {
  let querySnapshot: firebase.firestore.QuerySnapshot;

  console.log("REQUEST", nextPageDocRef);

  if (nextPageDocRef) {
    console.log("REQUEST 223", nextPageDocRef);
    querySnapshot = await query
      .startAt(nextPageDocRef)
      //.limit(limitPhotosPerQuery + 1)
      .get();
  } else {
    querySnapshot = await query.get();
  }

  return makeNewPhotoStateItems(querySnapshot, limitPhotosPerQuery);
}; */

// LOAD PHOTOS
export const loadPhotos = async (searchState: ISearchState) => {
  prepareQuery(searchState);

  const querySnapshot = await query.limit(limitPhotosPerQuery + 1).get();

  return makeNewPhotoStateItems(querySnapshot, limitPhotosPerQuery);

  /* const querySnapshot = await query.get();

  return makeNewPhotoStateItems(querySnapshot, limitPhotosPerQuery); */
};

export const onStartLoadPhotos = (dispatch: any) =>
  dispatch(allPhotosStartNewRequestAC());

export const onError = (dispatch: any) => dispatch(allPhotosRequestErrorAC());

export const onSuccessLoadPhotos = (dispatch: any, data: TGetPhotosData) =>
  dispatch(allPhotosRequestSuccessAC(data));

// LOAD MORE
export const loadMore = async (nextPageDocRef: any) => {
  if (!nextPageDocRef) throw new Error("No NEXT PAGE REF...");

  if (!query) throw new Error("Bad firestore query ...");

  //query.startAt(nextPageDocRef);

  //return request(nextPageDocRef);

  const querySnapshot = await query.startAt(nextPageDocRef).get();

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

/* isNeedNewRequest = (searchState: ISearchState, photoStateLoading: boolean) => {
  const isNeed =
    (this.prevSearchState === undefined ||
      !isEqualSearchState(this.prevSearchState, searchState)) &&
    photoStateLoading !== true;

  this.prevSearchState = searchState;

  return isNeed;
};

fetchPhotos = async (dispatch: any, isFetchMore: boolean = false) => {
  try {
    if (!isFetchMore) dispatch(allPhotosStartNewRequestAC());
    else dispatch(allPhotosStartMoreRequestAC());

    if (!query) throw new Error("Bad firestore query ...");

    const querySnapshot = await this.firestoreReq.syncStart(this.query);

    const { hasNextPage, nextPageDocRef, photos } = makeNewPhotoStateItems(
      querySnapshot,
      limitPhotosPerQuery
    );

    if (isFetchMore)
      this.dispatch(
        fetchMorePhotosRequestSuccessAC(photos, nextPageDocRef, hasNextPage)
      );
    else
      this.dispatch(
        allPhotosRequestSuccessAC(photos, nextPageDocRef, hasNextPage)
      );
  } catch (err) {
    this.dispatch(allPhotosRequestErrorAC());
  }
};
 */
