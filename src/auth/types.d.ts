//import { Action, Reducer } from "redux";
//import { IUserResponseToClient, IAuthUser } from "./../types";

// STORE
type TAuthActionTypes =
  | "AUTH"
  | "LOGIN_REQUEST"
  | "LOGIN_REQUEST_SUCCESS"
  | "LOGIN_REQUEST_ERROR"
  | "LOGOUT_REQUEST"
  | "LOGOUT_REQUEST_SUCCESS"
  | "LOGOUT_REQUEST_ERROR";

/*   | "FORGET_PASS_REQUEST"
  | "FORGET_PASS_SUCCESS"
  | "FORGET_PASS_ERROR" */

interface IAuthState {
  user: IAuthUser | undefined;
  loading: boolean;
  //logoutLoading: boolean;
  //forgetPassLoading: boolean;
  loginError: boolean;
  logoutError: boolean;
  //forgetPassError: boolean;
}

interface IAuthAction extends Action<TAuthActionTypes> {
  type: TAuthActionTypes;
  user?: IAuthUser;
  //isEditor?: boolean;
}

// FORM
interface ILoginFormData {
  email: string;
  password: string;
}

interface IForgetPassFormData {
  email: string;
}
