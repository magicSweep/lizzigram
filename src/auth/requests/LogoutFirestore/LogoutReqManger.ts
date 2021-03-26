//import { authLocalStorageKey } from "../../../config";
import LogoutReq from "./LogoutReq";
import {
  logoutRequestSuccessAC,
  logoutRequestErrorAC,
  logoutRequestAC,
} from "../../store/action";

class LogoutReqManager {
  dispatch: any;

  request: LogoutReq | undefined;

  startNew = async () => {
    if (this.request !== undefined) return;

    if (!this.dispatch) throw new Error("No dispatch in PhotosReqManager");

    this.request = new LogoutReq(true);

    try {
      this.dispatch(logoutRequestAC());

      await this.request.fetchSync();

      //localStorage.setItem(authLocalStorageKey, JSON.stringify(user));

      this.dispatch(logoutRequestSuccessAC());
    } catch (err) {
      //
      this.dispatch(logoutRequestErrorAC());
    } finally {
      this.request = undefined;
    }
  };

  cancel() {
    //if (this.request) this.request.cancel();
    throw new Error("Cancel mechanizm not implemented");
  }
}

export default LogoutReqManager;
