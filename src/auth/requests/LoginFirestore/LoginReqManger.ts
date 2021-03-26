import LoginReq from "./LoginReq";
import {
  loginRequestSuccessAC,
  loginRequestErrorAC,
  loginRequestAC,
} from "../../store/action";

class LoginReqManager {
  dispatch: any;

  request: LoginReq | undefined;

  startNew = async () => {
    if (this.request !== undefined) return;

    if (!this.dispatch) throw new Error("No dispatch in PhotosReqManager");

    this.request = new LoginReq(true);

    try {
      this.dispatch(loginRequestAC());

      await this.request.fetchSync();

      //localStorage.setItem(authLocalStorageKey, JSON.stringify(user));

      this.dispatch(loginRequestSuccessAC());
    } catch (err) {
      //
      this.dispatch(loginRequestErrorAC());
    } finally {
      this.request = undefined;
    }
  };

  cancel() {
    //if (this.request) this.request.cancel();
    throw new Error("Cancel mechanizm not implemented");
  }
}

export default LoginReqManager;
