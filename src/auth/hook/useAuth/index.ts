import { useEffect } from "react";
//import { IAuthUser } from "../../types";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { makeSubscribe } from "./controller";
//import { IGlobalState } from "../../store/types";

let unsubscribe: any = undefined;

export const useAuth = (
  //auth: (user: IAuthUser) => void,
  onError?: Function,
  onSuccess?: Function
) => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector<
    IGlobalState,
    {
      user: IAuthUser | undefined;
      loading: boolean;
    }
  >(
    (state) => ({
      user: state.auth.user,
      loading: state.auth.loading,
    }),
    shallowEqual
  );

  useEffect(() => {
    console.log("USE AUTH SUBSCRIBE");

    if (unsubscribe === undefined) {
      console.log("MAKE AUTH SUBSCRIBE");
      unsubscribe = makeSubscribe(dispatch, onError, onSuccess);
    }

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
  };
};
