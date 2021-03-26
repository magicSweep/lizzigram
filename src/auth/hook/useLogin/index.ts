import { useEffect } from "react";
import { useDispatch } from "react-redux";
import LoginReqManager from "../../requests/LoginFirestore/LoginReqManger";

let reqManager: LoginReqManager | undefined = undefined;

export const useLogin = () => {
  const dispatch = useDispatch();

  if (reqManager === undefined) reqManager = new LoginReqManager();

  reqManager.dispatch = dispatch;

  return {
    login: reqManager.startNew,
  };
};

/* import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../useAuth";
import { useEditorReq } from "../requests/useEditorReq";
import { onUseEffect } from "./controller";

export const useEditor = () => {
  const dispatch = useDispatch();

  const { start: startReq, cancel: cancelReq } = useEditorReq();

  const { user, loading } = useAuth();

  useEffect(() => {
    onUseEffect(user, dispatch, startReq);
  }, [user]);

  return {
    user,
    loading,
  };
}; */
