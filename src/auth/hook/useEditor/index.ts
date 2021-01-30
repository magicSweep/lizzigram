import { useEffect } from "react";
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
};
