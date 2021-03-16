import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import TagsReqManager from "../../requests/Tags/TagsReqManager";

let isInitReq = true;

let reqManager: TagsReqManager | undefined = undefined;

export const useTags = () => {
  const dispatch = useDispatch();

  if (reqManager === undefined) reqManager = new TagsReqManager();

  reqManager.dispatch = dispatch;

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

  //const { start, cancel } = useTagsReq();

  useEffect(() => {
    if (isInitReq) {
      //console.log("useTags useEffect start request");
      if (!reqManager) throw new Error("No reqManager on useTags");

      isInitReq = false;

      reqManager.startNew();
    }
  }, []);

  return {
    loading,
    error,
    tags,
    reLoad: reqManager.startNew,
    cancel: reqManager.cancel,
  };
};
