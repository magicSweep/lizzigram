import { authLocalStorageKey } from "../../../config";
import { authAC } from "../../store/action";
import IsEditorReq from "./IsEditorReq";

class IsEditorReqManager {
  dispatch: any;

  request: IsEditorReq | undefined;

  startNew = async (user: IAuthUser | undefined) => {
    if (this.request !== undefined) return;

    if (!this.dispatch) throw new Error("No dispatch in PhotosReqManager");

    if (!user) return;

    // On init user.isEditor == undefined - not boolean
    if (!this.isUserEditorUnknown(user)) return;

    try {
      const prevUser = this.getSavedUser();

      if (
        prevUser &&
        prevUser.isEditor !== undefined &&
        this.isSameUser(prevUser, user)
      ) {
        ///console.log("USE EDITOR | USE EFFECT | DISPATCH", user, prevUser);

        this.dispatch(
          authAC({
            ...user,
            isEditor: prevUser.isEditor,
          })
        );
      } else {
        //console.log("USE EDITOR | USE EFFECT | START REQ");

        this.request = new IsEditorReq(true);

        const newUser = await this.request.fetchSync(user);

        localStorage.setItem(authLocalStorageKey, JSON.stringify(newUser));

        this.dispatch(authAC(newUser));
      }
    } catch (err) {
      //
    } finally {
      this.request = undefined;
    }
  };

  isUserEditorUnknown = (user: IAuthUser) => {
    return user && user.isEditor === undefined;
  };

  isSameUser = (prevUser: IAuthUser, user: IAuthUser) =>
    prevUser.uid === user.uid;

  getSavedUser = (): IAuthUser | null => {
    try {
      const savedUser: string | null = localStorage.getItem(
        authLocalStorageKey
      );

      if (savedUser) {
        return JSON.parse(savedUser);
      }

      return null;
    } catch (err) {
      console.error(err);

      return null;
    }
  };

  cancel() {
    //if (this.request) this.request.cancel();
    throw new Error("Cancel mechanizm not implemented");
  }
}

export default IsEditorReqManager;
