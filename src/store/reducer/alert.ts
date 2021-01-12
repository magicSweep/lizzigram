import { Action, Reducer } from "redux";
//import { IAlertState, IAlertAction } from "./../types";

const alertInitialState: IAlertState = {
  isShow: false,
  type: "info",
  message: "",
};

const reducer: Reducer<IAlertState, IAlertAction> = (
  state = alertInitialState,
  action: IAlertAction
) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return {
        isShow: true,
        type: action.alertType as TAlertType,
        message: action.message as string,
      };

    case "HIDE_ALERT":
      return {
        ...state,
        isShow: false,
      };
    default:
      return state;
  }
};

export default reducer;
