import random from "lodash.random";
import AddPhotoFirestoreReq from "./AddPhotoFirestoreReq";
import AddPhotoWorkerReq from "./AddPhotoWorkerReq";
import {
  addPhotoStartRequestAC,
  addPhotoRequestErrorAC,
  addPhotoRequestSuccessAC,
  addPhotoAC,
} from "../../store/action/photos";
import { batch } from "react-redux";
import { hideAddFormAC, showAlertAC } from "../../../store";
import GetAddedPhotoReq from "./GetAddedPhotoReq";
import { generatePhotoId } from "../helper/DataHelper";

class AddPhotoReqManager {
  dispatch: any;
  anotherForm: boolean = false;
  requests: Map<string, any> = new Map();

  // FIRST - SEND REQUEST TO FIRESTORE
  // SECOND - ON SUCCESS SEND REQUEST TO WORKER SERVER
  // THIRD - ON SUCCESS SEND REQUEST TO FIRESTORE FOR NEW PHOTO
  startNew = async (iData: TCreatePhotoData) => {
    const photoId = generatePhotoId(iData.photoFormData.date);

    const data: IPhotoFirestoreData<IAddPhotoFormData> = {
      photoId,
      ...iData,
    };

    try {
      // FIRST REQUEST - CREATE PHOTO RECORD ON FIRESTORE
      let addPhotoFirestoreReq: AddPhotoFirestoreReq = new AddPhotoFirestoreReq(
        true
      );

      this.beforeAddPhotoFirestoreReq(addPhotoFirestoreReq, photoId);

      await addPhotoFirestoreReq.fetchSync(data);

      // SECOND REQUEST -  SEND REQUEST TO WORKER SERVER
      let addPhotoWorkerReq: AddPhotoWorkerReq = new AddPhotoWorkerReq(true);

      this.requests.set(photoId, addPhotoWorkerReq);

      await addPhotoWorkerReq.fetchSync(data);

      // remove request from list
      this.requests.delete(photoId);

      // THIRD REQUEST - SEND REQUEST FOR NEW ADDED PHOTO INFO
      this.sendGetAddedPhotoReq(photoId);
      ////////////////////////////

      // make state changes
      this.stateChangesOnSuccess();
    } catch (err) {
      this.onError(photoId);
    }
  };

  sendGetAddedPhotoReq = (photoId: string) => {
    let getAddedPhotoReq: GetAddedPhotoReq = new GetAddedPhotoReq(true);

    getAddedPhotoReq.addOnSuccess((photoData) =>
      this.dispatch(addPhotoAC(photoData))
    );

    getAddedPhotoReq.fetch(photoId);
  };

  stateChangesOnSuccess = () => {
    batch(() => {
      if (this.requests.size === 0) {
        this.dispatch(addPhotoRequestSuccessAC());
        if (!this.anotherForm) this.dispatch(hideAddFormAC());
      }

      this.dispatch(showAlertAC("Фото успешно добавлено.", "success"));
    });
  };

  beforeAddPhotoFirestoreReq = (
    addPhotoFirestoreReq: AddPhotoFirestoreReq,
    photoId: string
  ) => {
    //let id = random(9999);

    this.requests.set(photoId, addPhotoFirestoreReq);

    if (!this.dispatch) throw new Error("No dispatch in AddPhotoReqManager");

    this.dispatch(addPhotoStartRequestAC());

    //return id;
  };

  onError = (id: string) => {
    if (!this.dispatch) throw new Error("No dispatch in AddPhotoReqManager");

    this.requests.delete(id);

    batch(() => {
      if (this.requests.size === 0) this.dispatch(addPhotoRequestErrorAC());

      this.dispatch(
        showAlertAC("К сожалению, мы не смогли сохранить фото", "error")
      );
    });
  };

  cancel(id: string) {
    this.requests.get(id).cancel();
  }
}

export default AddPhotoReqManager;

/* import random from "lodash.random";
import AddPhotoFirestoreReq from "./AddPhotoFirestoreReq";
import AddPhotoWorkerReq from "./AddPhotoWorkerReq";
import {
  addPhotoStartRequestAC,
  addPhotoRequestErrorAC,
  addPhotoRequestSuccessAC,
  addPhotoAC,
} from "../../photos/store/action/photos";
import { batch } from "react-redux";
import { hideAddFormAC, showAlertAC } from "../../store";
import GetAddedPhotoReq from "./GetAddedPhotoReq";

class AddPhotoReqManager {
  dispatch: any;
  anotherForm: boolean = false;
  requests: Map<number, any> = new Map();

  // FIRST - SEND REQUEST TO FIRESTORE
  // SECOND - ON SUCCESS SEND REQUEST TO WORKER SERVER
  // THIRD - ON SUCCESS SEND REQUEST TO FIRESTORE FOR NEW PHOTO
  startNew = (data: TCreatePhotoFirestoreData) => {
    let id = random(9999);

    let addPhotoFirestoreReq: AddPhotoFirestoreReq = new AddPhotoFirestoreReq(
      true
    );

    this.requests.set(id, addPhotoFirestoreReq);

    addPhotoFirestoreReq.addOnStart(() => {
      if (!this.dispatch) throw new Error("No dispatch in AddPhotoReqManager");

      this.dispatch(addPhotoStartRequestAC());
    });

    addPhotoFirestoreReq.addOnSuccess(() => {
      // SEND REQUEST TO EXPRESS WORKER
      let addPhotoWorkerReq: AddPhotoWorkerReq = new AddPhotoWorkerReq(true);

      this.requests.set(id, addPhotoWorkerReq);

      addPhotoWorkerReq.addOnSuccess(() => {
        this.onSuccessWorkerReq(data.photoId, id);
      });

      addPhotoWorkerReq.addOnError((err) => {
        this.onError(id);
      });

      addPhotoWorkerReq.fetch(data);
    });

    addPhotoFirestoreReq.addOnError((err) => {
      this.onError(id);
    });

    addPhotoFirestoreReq.fetch(data);
  };

  onError = (id: number) => {
    if (!this.dispatch) throw new Error("No dispatch in AddPhotoReqManager");

    this.requests.delete(id);

    batch(() => {
      if (this.requests.size === 0) this.dispatch(addPhotoRequestErrorAC());

      this.dispatch(
        showAlertAC("К сожалению, мы не смогли сохранить фото", "error")
      );
    });
  };

  onSuccessWorkerReq = (photoId: string, id: number) => {
    // REMOVE REQUEST FROM LIST
    this.requests.delete(id);

    // MAKE STATE CHANGES
    batch(() => {
      if (this.requests.size === 0) {
        this.dispatch(addPhotoRequestSuccessAC());
        if (!this.anotherForm) this.dispatch(hideAddFormAC());
      }

      this.dispatch(showAlertAC("Фото успешно добавлено.", "success"));
    });

    // SEND REQUEST FOR NEW ADDED PHOTO INFO
    let getAddedPhotoReq: GetAddedPhotoReq = new GetAddedPhotoReq(true);

    getAddedPhotoReq.addOnSuccess((photoData) =>
      this.dispatch(addPhotoAC(photoData))
    );

    getAddedPhotoReq.fetch(photoId);
  };

  cancel(id: number) {
    this.requests.get(id).cancel();
  }
}

export default AddPhotoReqManager;
 */
