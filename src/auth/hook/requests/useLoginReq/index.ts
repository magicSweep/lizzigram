import firebase from "firebase/app";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRequest } from "../../../../hooks/useRequest";
import { request, onSuccess, onError, onStart } from "./controller";

export const useLoginReq = () => {
  const dispatch = useDispatch();

  const { start: iStart, cancel } = useRequest<
    void,
    firebase.auth.UserCredential
  >("AUTH_LOGIN", true);

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
