import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useTagsReq } from "../useTagsReq";

let isInitReq = true;

export const useTags = () => {
  const { loading, error, tags } = useSelector<
    IGlobalState,
    {
      loading: boolean;
      error: boolean;
      tags: TTagsData | undefined;
    }
  >(
    (state) => ({
      loading: state.tags.loading,
      error: state.tags.error,
      tags: state.tags.tags,
    }),
    shallowEqual
  );

  const { start, cancel } = useTagsReq();

  useEffect(() => {
    if (isInitReq) {
      //console.log("useTags useEffect start request");
      start();
      isInitReq = false;
    }
  }, []);

  return {
    loading,
    error,
    tags,
    reLoad: start,
    cancel,
  };
};
