import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRequest } from "../../../../hooks/useRequest";
import { request, onSuccess, onError, onStart } from "./controller";

export const useLogoutReq = () => {
  const dispatch = useDispatch();

  const { start: iStart, cancel } = useRequest<void, void>("AUTH_LOGOUT", true);

  const start = useCallback(() => {
    iStart(
      undefined,
      request,
      () => onStart(dispatch),
      () => onError(dispatch),
      () => onSuccess(dispatch)
    );
  }, []);

  return {
    start,
    cancel,
  };
};
