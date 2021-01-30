import firebase from "firebase/app";
import "firebase/auth";
import {
  logoutRequestSuccessAC,
  logoutRequestErrorAC,
  logoutRequestAC,
} from "../../../store/action";
import { authLocalStorageKey } from "../../../../config";

export const request = () => {
  return firebase.auth().signOut();
};

export const onStart = (dispatch: any) => {
  dispatch(logoutRequestAC());
};

export const onError = (dispatch: any) => {
  dispatch(logoutRequestErrorAC());
};

export const onSuccess = (dispatch: any) => {
  dispatch(logoutRequestSuccessAC());

  localStorage.removeItem(authLocalStorageKey);
};
