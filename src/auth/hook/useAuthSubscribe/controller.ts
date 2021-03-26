import firebase from "firebase/app";
import "firebase/auth";
import { authAC } from "./../../store/action";

export const makeSubscribe = (
  dispatch: any,
  onError?: Function,
  onSuccess?: Function
) => {
  return firebase.auth().onAuthStateChanged(
    async (user) => {
      if (user) {
        //console.log("AUTH SUCCESS", user);

        const newUser: IAuthUser = {
          name: user.displayName ? user.displayName : "",
          email: user.email ? user.email : "",
          uid: user.uid,
          isEditor: undefined,
        };

        console.log("AUTH SUCCESS new user", newUser);

        dispatch(authAC(newUser));

        if (onSuccess) onSuccess();
        // ...
      } else {
        console.log("NOT AUTH");
        // User is signed out.
        // ...
        dispatch(authAC(undefined));
      }
    },
    (err) => {
      dispatch(authAC(undefined));
      console.log("AUTH SUBSCRIBE ERROR", err);
      if (onError) onError(err.message);
      throw err;
    }
  );
};
