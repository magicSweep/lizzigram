import firebase from "firebase/app";
import ARequest from "../../../requests/ARequest";
import { photosCollectionName } from "../../../config";
/* import {
  allPhotosStartNewRequestAC,
  allPhotosRequestErrorAC,
  allPhotosRequestSuccessAC,
  allPhotosStartMoreRequestAC,
  fetchMorePhotosRequestSuccessAC,
} from "../../../store/action/photos"; */
import { makeNewPhotoStateItems } from "./../helper/DataHelper";
import { getFirestoreDb } from "../../../firebase/initFirestore";
import { makeQueryBySerchTerm, isInitState } from "./../helper/QueryHelper";
/* 
interface IPhotosReqData {
  isLoadMore: boolean;
  searchState: ISearchState;
  nextPageDocRef?: any;
} */

class PhotosRequest extends ARequest<IPhotosReqData, TGetPhotosData> {
  type: TRequestType = "GET_ALL_PHOTOS";

  query: firebase.firestore.Query | undefined;

  numberOfPhotosPerQuery: number;

  //prevSearchState: ISearchState | undefined;
  isInitSearchState: boolean = true;

  constructor(isLog: boolean, numberOfPhotosPerQuery: number) {
    super(isLog);

    this.numberOfPhotosPerQuery = numberOfPhotosPerQuery;
  }

  request = async (data: IPhotosReqData) => {
    if (!data.isLoadMore) {
      if (!data.searchState) throw new Error("Bad searchState");

      return this.loadPhotos(data.searchState);
    } else {
      if (!data.nextPageDocRef) throw new Error("Bad nextPageDocRef");

      return this.loadMore(data.nextPageDocRef, data.searchState);
    }
  };

  prepareQuery = (searchState: ISearchState) => {
    this.query = getFirestoreDb().collection(photosCollectionName);
    this.query = makeQueryBySerchTerm(
      this.query as firebase.firestore.Query,
      searchState
    );
  };

  prepare = (searchState: ISearchState) => {
    if (!searchState) throw new Error("Bad SearchState");

    if (this.numberOfPhotosPerQuery === undefined)
      throw new Error("Bad numberOfPhotosPerQuery");

    this.prepareQuery(searchState);

    this.isInitSearchState = isInitState(searchState);

    if (!this.query) throw new Error("Bad query");

    if (this.isInitSearchState)
      this.query = this.query.orderBy("_timestamp", "desc");
  };

  // LOAD PHOTOS
  loadPhotos = async (searchState: ISearchState) => {
    /* this.prepareQuery(searchState);

    this.isInitSearchState = isInitState(searchState);

     console.log(
      "------!!!!!!! IS INIT SEARCH STATE - LOAD PHOTOS",
      this.isInitSearchState
    ); 

    //this.prevSearchState = searchState;

    if (!this.query) throw new Error("Bad query");

    if (this.numberOfPhotosPerQuery === undefined)
      throw new Error("Bad numberOfPhotosPerQuery");

    if (this.isInitSearchState)
      this.query = this.query.orderBy("_timestamp", "desc"); */

    this.prepare(searchState);

    if (!this.query) throw new Error("Bad query");

    const querySnapshot = await this.query
      //.where("isActive", "==", true)
      .limit(this.numberOfPhotosPerQuery + 1)
      .get();

    return makeNewPhotoStateItems(querySnapshot, this.numberOfPhotosPerQuery);
  };

  // LOAD MORE
  loadMore = async (nextPageDocRef: any, searchState: ISearchState) => {
    if (!nextPageDocRef) throw new Error("No NEXT PAGE REF...");

    this.prepare(searchState);

    /*   if (!searchState) throw new Error("Bad SearchState");

    this.prepareQuery(searchState);

    this.isInitSearchState = isInitState(searchState);

    if (!this.query) throw new Error("Bad query");

    if (this.numberOfPhotosPerQuery === undefined)
      throw new Error("Bad numberOfPhotosPerQuery");

    if (this.isInitSearchState)
      this.query = this.query.orderBy("_timestamp", "desc");

    console.log(
      "------!!!!!!! IS INIT SEARCH STATE - LOAD MORE PHOTOS",
      this.isInitSearchState
    ); */

    if (!this.query) throw new Error("Bad query");

    const querySnapshot = await this.query
      //.where("isActive", "==", true)
      .startAt(nextPageDocRef)
      .limit(this.numberOfPhotosPerQuery + 1)
      .get();

    return makeNewPhotoStateItems(querySnapshot, this.numberOfPhotosPerQuery);
  };

  /*  onStartLoadMorePhotos = (dispatch: any) =>
    dispatch(allPhotosStartMoreRequestAC());

  onSuccessLoadMorePhotos = (dispatch: any, data: TGetPhotosData) => {
    dispatch(fetchMorePhotosRequestSuccessAC(data));
  }; */
}

export default PhotosRequest;
