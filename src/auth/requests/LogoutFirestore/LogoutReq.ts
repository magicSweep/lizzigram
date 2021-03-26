import ARequest from "./../../../requests/ARequest";

import firebase from "firebase/app";
import "firebase/auth";

export const request = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(provider);
};

class LogoutReq extends ARequest<void, void> {
  type: TRequestType = "AUTH_LOGOUT";

  request = () => {
    return firebase.auth().signOut();
  };
}

export default LogoutReq;
