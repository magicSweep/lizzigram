import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { isNeedNewRequest } from "../../request/PhotosRequest/helper";
import PhotosReqManager from "../../request/PhotosRequest/PhotosReqManager";

let reqManager: PhotosReqManager | undefined = undefined;

export const usePhotos = () => {
  const dispatch = useDispatch();

  if (reqManager === undefined) reqManager = new PhotosReqManager();

  reqManager.dispatch = dispatch;

  const {
    loading,
    //addPhotoLoading,
    error,
    searchState,
    photos,
    requests,
    hasNextPage,
    nextPageDocRef,
  } = useSelector<
    IGlobalState,
    {
      loading: boolean;
      //addPhotoLoading: boolean;
      error: boolean;
      searchState: ISearchState;
      photos: TPhotosData | undefined;
      requests: TPhotoReqs;
      hasNextPage: boolean;
      nextPageDocRef: any;
    }
  >(
    (state) => ({
      loading: state.photos.loading,
      //addPhotoLoading: state.photos.addLoading,
      error: state.photos.error,
      searchState: state.search,
      photos: state.photos.photos,
      requests: state.photos.requests,
      hasNextPage: state.photos.hasNextPage,
      nextPageDocRef: state.photos.nextPageDocRef,
    }),
    shallowEqual
  );

  const loadPhotos = () => {
    if (!reqManager) throw new Error("No reqManager on usePhotos");

    reqManager.startNew({
      isLoadMore: false,
      searchState,
    });
  };

  const loadMore = () => {
    if (!reqManager) throw new Error("No reqManager on usePhotos");

    reqManager.startNew({
      isLoadMore: true,
      searchState,
      nextPageDocRef,
    });
  };

  const cancel = () => {
    if (!reqManager) throw new Error("No reqManager on usePhotos");

    reqManager.cancel();
  };

  useEffect(() => {
    if (isNeedNewRequest(searchState, loading)) loadPhotos();
  }, [searchState]);

  return {
    loading,
    //addPhotoLoading,
    error,
    searchState,
    photos,
    requests,
    hasNextPage,
    nextPageDocRef,
    loadPhotos,
    loadMore,
    cancel,
  };
};
