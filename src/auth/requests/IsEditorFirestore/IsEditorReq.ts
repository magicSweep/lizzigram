import { usersCollectionName } from "../../../config";
import { getFirestoreDb } from "../../../firebase/initFirestore";
import ARequest from "./../../../requests/ARequest";

class IsEditorReq extends ARequest<IAuthUser, IAuthUser> {
  type: TRequestType = "AUTH_IS_EDITOR_FIRESTORE";

  request = async (user: IAuthUser) => {
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
}

export default IsEditorReq;
