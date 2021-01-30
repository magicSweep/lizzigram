import { authLocalStorageKey, usersCollectionName } from "../../../config";
import { editPhotoStartRequestAC } from "../../../photos/store/action/photos";
import { authAC } from "../../store/action";

export let isWork = false;

export const onUseEffect = (
  user: IAuthUser | undefined,
  dispatch: any,
  startReq: (user: IAuthUser) => void
) => {
  //console.log("USE EDITOR | USE EFFECT", user, isWork);

  // IF WE MADE LOGOUT WE MUST RESET IS_WORK
  if (user === undefined) isWork = false;

  // WE NEED IS_WORK CAUSE OF
  if (user && user.isEditor === undefined && !isWork) {
    isWork = true;

    const prevUser = getSavedUser();

    //console.log("USE EDITOR | USE EFFECT | START", user, prevUser, isWork);

    if (prevUser && isSameUser(prevUser, user)) {
      ///console.log("USE EDITOR | USE EFFECT | DISPATCH", user, prevUser);

      dispatch(
        authAC({
          ...user,
          isEditor: prevUser.isEditor,
        })
      );
    } else {
      //console.log("USE EDITOR | USE EFFECT | START REQ");

      startReq(user);
    }
  }
};

export const getSavedUser = (): IAuthUser | null => {
  try {
    const savedUser: string | null = localStorage.getItem(authLocalStorageKey);

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  } catch (err) {
    console.error(err);

    return null;
  }
};

export const isSameUser = (prevUser: IAuthUser, user: IAuthUser) =>
  prevUser.uid === user.uid;

/* export const onUseEffect = (user: IAuthUser) => {

  if (user && user.isEditor === undefined) {
    const savedUser = localStorage.getItem(authLocalStorageKey);

    if (savedUser) {
      const prevUser = JSON.parse(savedUser);

      if (prevUser.uid === user.uid) {
        //user.isEditor = prevUser.isEditor;
        dispatch(
          authAC({
            ...user,
            isEditor: prevUser.isEditor,
          })
        );
      } else {
        request.start(user);
      }
    } else {
      request.start(user);
    }
  }
};
 */
