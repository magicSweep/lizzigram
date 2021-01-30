import { useEffect } from "react";
import { usePhotosReq } from "../requests/usePhotosReq";
import { isNeedNewRequest } from "./controller";

export const usePhotos = () => {
  const {
    loading,
    error,
    searchState,
    photos,
    hasNextPage,
    nextPageDocRef,
    loadPhotos,
    loadMore,
    cancel,
  } = usePhotosReq();

  useEffect(() => {
    if (isNeedNewRequest(searchState, loading)) loadPhotos();
  }, [searchState]);

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
