import { useEffect } from "react";
import { useDispatch } from "react-redux";
import IsEditorReqManager from "../../requests/IsEditorFirestore/IsEditorReqManger";
import { useAuth } from "../useAuth";

let reqManager: IsEditorReqManager | undefined = undefined;

export const useEditor = () => {
  const dispatch = useDispatch();

  if (reqManager === undefined) reqManager = new IsEditorReqManager();

  reqManager.dispatch = dispatch;

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!reqManager) throw new Error("No reqManager at useEditor");

    if (user && user.isEditor === undefined) reqManager.startNew(user);
  }, [user]);

  return {
    user,
    loading,
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
