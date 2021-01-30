import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRequest } from "../../../../hooks/useRequest";
import { request, onSuccess } from "./controller";

export const useEditorReq = () => {
  const dispatch = useDispatch();

  const { start: iStart, cancel } = useRequest<IAuthUser, IAuthUser>(
    "AUTH_IS_EDITOR_FIRESTORE",
    true
  );

  const start = useCallback((user: IAuthUser) => {
    iStart(user, request, undefined, undefined, (newUser: IAuthUser) =>
      onSuccess(dispatch, newUser)
    );
  }, []);

  return {
    start,
    cancel,
  };
};
