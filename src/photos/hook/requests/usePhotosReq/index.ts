import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRequest } from "../../../../hooks/useRequest";
import {
  loadPhotos as fetchPhotos,
  loadMore as fetchMore,
  onStartLoadPhotos,
  onError,
  onSuccessLoadPhotos,
  onStartLoadMorePhotos,
  onSuccessLoadMorePhotos,
} from "./controller";

export const usePhotosReq = () => {
  const dispatch = useDispatch();

  const {
    loading,
    error,
    searchState,
    photos,
    hasNextPage,
    nextPageDocRef,
  } = useSelector<
    IGlobalState,
    {
      loading: boolean;
      error: boolean;
      searchState: ISearchState;
      photos: TPhotosData | undefined;
      hasNextPage: boolean;
      nextPageDocRef: any;
    }
  >(
    (state) => ({
      loading: state.photos.loading,
      error: state.photos.error,
      searchState: state.search,
      photos: state.photos.photos,
      hasNextPage: state.photos.hasNextPage,
      nextPageDocRef: state.photos.nextPageDocRef,
    }),
    shallowEqual
  );

  /* const {
    photoState,
    searchState,
  } = useSelector<
    IGlobalState,
    {
      photoState: IPhotosState;
      searchState: ISearchState;
    }
  >(
    (state) => ({
      photoState: state.photos,
      searchState: state.search,
    }),
    shallowEqual
  ); */

  /* console.log(
    "usePhotosReq",
    photos,
    nextPageDocRef ? nextPageDocRef.id : "NO nextPageDocRef"
  ); */

  const { start: iStart, cancel } = useRequest<undefined, TGetPhotosData>(
    "GET_ALL_PHOTOS",
    true
  );

  const loadPhotos = useCallback(() => {
    iStart(
      undefined,
      () => fetchPhotos(searchState),
      () => onStartLoadPhotos(dispatch),
      () => onError(dispatch),
      (data: TGetPhotosData) => onSuccessLoadPhotos(dispatch, data)
    );
  }, [searchState]);

  const loadMore = useCallback(() => {
    iStart(
      undefined,
      () => fetchMore(nextPageDocRef),
      () => onStartLoadMorePhotos(dispatch),
      () => onError(dispatch),
      (data: TGetPhotosData) => onSuccessLoadMorePhotos(dispatch, data)
    );
  }, [nextPageDocRef]);

  return {
    loading,
    error,
    searchState,
    photos,
    hasNextPage,
    nextPageDocRef,
    loadPhotos,
    loadMore,
    cancel,
  };
};
