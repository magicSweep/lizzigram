import { useEditor } from "../../../auth/hook/useEditor";
import { useLoginReq } from "../../hook/requests/useLoginReq";
import { useLogoutReq } from "../../hook/requests/useLogoutReq";

export const useHeader = () => {
  const { user, loading } = useEditor();

  const { start: startLoginReq } = useLoginReq();

  const { start: startLogoutReq } = useLogoutReq();

  return {
    user,
    loading,
    logout: startLogoutReq,
    login: startLoginReq,
  };
};
