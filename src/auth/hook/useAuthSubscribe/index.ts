import { useEffect } from "react";
//import { IAuthUser } from "../../types";
import { useDispatch } from "react-redux";
import { makeSubscribe } from "./controller";
//import { IGlobalState } from "../../store/types";
import { initApp } from "./../../../firebase/initApp";

initApp();

let unsubscribe: any = undefined;

export const useAuthSubscribe = (
  //auth: (user: IAuthUser) => void,
  onError?: Function,
  onSuccess?: Function
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("USE AUTH SUBSCRIBE");

    if (unsubscribe === undefined) {
      console.log("MAKE AUTH SUBSCRIBE");
      unsubscribe = makeSubscribe(dispatch, onError, onSuccess);
    }

    return () => {
      console.log("MAKE AUTH UNSUBSCRIBE");
      unsubscribe();
    };
  }, []);
};
