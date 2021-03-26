import ARequest from "./../../../requests/ARequest";

import firebase from "firebase/app";
import "firebase/auth";

export const request = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(provider);
};

class LoginReq extends ARequest<void, firebase.auth.UserCredential> {
  type: TRequestType = "AUTH_LOGIN";

  request = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider);
  };
}

export default LoginReq;
