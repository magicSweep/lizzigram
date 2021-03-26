//import { useEditor } from "../../../auth/hook/useEditor";
import { useLogin } from "../../hook/useLogin";
import { useLogout } from "../../hook/useLogout";
import { useAuth } from "../../hook/useAuth";

export const useHeader = () => {
  const { user, loading } = useAuth();

  const { login } = useLogin();

  const { logout } = useLogout();

  return {
    user,
    loading,
    logout,
    login,
  };
};
