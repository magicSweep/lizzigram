import firebase from "firebase/app";
import "firebase/auth";
import {
  loginRequestSuccessAC,
  loginRequestErrorAC,
  loginRequestAC,
} from "../../../store/action";

export const request = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(provider);
};

export const onStart = (dispatch: any) => {
  dispatch(loginRequestAC());
};

export const onError = (dispatch: any) => {
  dispatch(loginRequestErrorAC());
};

export const onSuccess = (dispatch: any) => {
  dispatch(loginRequestSuccessAC());
};
