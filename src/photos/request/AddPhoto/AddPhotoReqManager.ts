import random from "lodash.random";
import AddPhotoFirestoreReq from "./AddPhotoFirestoreReq";
import AddPhotoWorkerReq from "./AddPhotoWorkerReq";
import {
  addPhotoStartRequestAC,
  addPhotoRequestErrorAC,
  addPhotoRequestSuccessAC,
  getAddedPhotoSuccessAC,
  getAddedPhotoErrorAC,
  //removePhotoReqAC,
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

      this.beforeAddPhotoFirestoreReq(
        addPhotoFirestoreReq,
        photoId,
        iData.photoFormData
      );

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
      this.stateChangesOnSuccess(photoId);
    } catch (err) {
      this.onError(photoId);
    }
  };

  sendGetAddedPhotoReq = (photoId: string) => {
    let getAddedPhotoReq: GetAddedPhotoReq = new GetAddedPhotoReq(true);

    getAddedPhotoReq.addOnSuccess((photoData) => {
      this.dispatch(getAddedPhotoSuccessAC(photoData, photoId));
      //this.removeReqFromState(photoId);
    });

    //getAddedPhotoErrorAC
    getAddedPhotoReq.addOnError(() => {
      this.dispatch(getAddedPhotoErrorAC(photoId));
      //this.removeReqFromState(photoId);
    });

    getAddedPhotoReq.fetch(photoId);
  };

  stateChangesOnSuccess = (photoId: string) => {
    batch(() => {
      const isLastReq = this.requests.size === 0;
      this.dispatch(addPhotoRequestSuccessAC(isLastReq, photoId));

      if (isLastReq && !this.anotherForm) this.dispatch(hideAddFormAC());

      this.dispatch(showAlertAC("Фото успешно добавлено.", "success"));
    });
  };

  /* removeReqFromState = (photoId: string) => {
    setTimeout(() => {
      this.dispatch(removePhotoReqAC(photoId));
    }, 3000);
  }; */

  beforeAddPhotoFirestoreReq = (
    addPhotoFirestoreReq: AddPhotoFirestoreReq,
    photoId: string,
    photoFormData: IAddPhotoFormData
  ) => {
    //let id = random(9999);

    this.requests.set(photoId, addPhotoFirestoreReq);

    if (!this.dispatch) throw new Error("No dispatch in AddPhotoReqManager");

    const reqInfo = this.makeReqInfoForState(photoId, photoFormData);

    this.dispatch(addPhotoStartRequestAC(reqInfo.reqId, reqInfo.photoReq));

    //return id;
  };

  makeReqInfoForState = (photoId: string, photoFormData: any) => {
    const photoReq: IPhotoReq = {
      type: "add",
      info: {
        photoId: photoId,
        photoFormData,
      },
      status: {
        stage: "firestore|worker",
        type: "loading",
        // error or result message
        data: undefined,
      },
    };

    return {
      reqId: photoId,
      photoReq,
    };
  };

  onError = (photoId: string) => {
    if (!this.dispatch) throw new Error("No dispatch in AddPhotoReqManager");

    this.requests.delete(photoId);

    batch(() => {
      this.dispatch(addPhotoRequestErrorAC(this.requests.size === 0, photoId));

      this.dispatch(
        showAlertAC("К сожалению, мы не смогли сохранить фото", "error")
      );
    });

    //this.removeReqFromState(photoId);
  };

  cancel(id: string) {
    this.requests.get(id).cancel();
  }
}

export default AddPhotoReqManager;
