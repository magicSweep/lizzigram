import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRequest } from "../useRequest";
import {
  tagsRequestAC,
  tagsRequestSuccessAC,
  tagsRequestErrorAC,
} from "../../store/action/tags";
import { request } from "./controller";

export const useTagsReq = () => {
  const dispatch = useDispatch();

  const { start: iStart, cancel } = useRequest<undefined, TTagsData>(
    "GET_ALL_TAGS",
    true
  );

  const start = useCallback(() => {
    iStart(
      undefined,
      request,
      () => dispatch(tagsRequestAC()),
      () => dispatch(tagsRequestErrorAC()),
      (data: TTagsData) => dispatch(tagsRequestSuccessAC(data))
    );
  }, []);

  return {
    start,
    cancel,
  };
};
