import { authAC } from "../../../store/action";
import { authLocalStorageKey, usersCollectionName } from "../../../../config";
import { getFirestoreDb } from "../../../../firebase/initFirestore";

export const request = async (user: IAuthUser) => {
  const res = await getFirestoreDb()
    .collection(usersCollectionName)
    .doc(user.uid)
    .get();

  const isEditor = res.exists;

  //if (refNewUser.isEditor !== prevIsEditor) dispatch(authAC(refNewUser));

  const newUser = {
    ...user,
    isEditor,
  };

  return newUser;
};

export const onSuccess = (dispatch: any, user: IAuthUser) => {
  dispatch(authAC(user));

  localStorage.setItem(authLocalStorageKey, JSON.stringify(user));
};
