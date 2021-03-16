import random from "lodash.random";
import EditPhotoFirestoreReq from "./EditPhotoFirestoreReq";
import EditPhotoWorkerReq from "./EditPhotoWorkerReq";
import {
  editPhotoStartRequestAC,
  editPhotoRequestErrorAC,
  editPhotoRequestSuccessAC,
  editPhotoAC,
} from "../../store/action/photos";
import { batch } from "react-redux";
import { hideEditFormAC, showAlertAC } from "../../../store";
import GetEditedPhotoReq from "./GetEditedPhotoReq";
import { makeEditPhotoData, isInSearchTerms } from "../helper/DataHelper";

type TReqInfo = {
  workerReq: EditPhotoWorkerReq | undefined;
  firestoreReq: EditPhotoFirestoreReq | undefined;
};

class EditPhotoReqManager {
  dispatch: any;
  anotherForm: boolean = false;
  searchState: ISearchState | undefined;
  requests: Map<string, TReqInfo> = new Map();

  // FIRST - SEND REQUEST TO FIRESTORE
  // SECOND - ON SUCCESS SEND REQUEST TO WORKER SERVER
  // THIRD - ON SUCCESS SEND REQUEST TO FIRESTORE FOR NEW PHOTO
  startNew = async (data: IPhotoFirestoreData<IEditPhotoFormData>) => {
    const reqPromises: Promise<any>[] = [];

    const requests: TReqInfo = {
      workerReq: undefined,
      firestoreReq: undefined,
    };

    try {
      if (!this.dispatch) throw new Error("No dispatch on EditPhotoReqManager");

      // check if we already edit this photo
      if (this.requests.has(data.photoId)) {
        this.dispatch(
          showAlertAC("Данное фото уже в процессе изменения.", "error")
        );
        return;
      }

      // WE CHECK WHAT TYPE OF REQUESTS WE NEED
      const photoFirestoreData: IEditPhotoData = makeEditPhotoData(
        data.photoFormData
      );

      const isNeedFirestoreReq = Object.keys(photoFirestoreData).length > 0;

      const isNeedWorkerReq = data.photoFormData.photoFile
        ? data.photoFormData.photoFile.length > 0
        : false;

      if (!isNeedFirestoreReq && !isNeedWorkerReq) {
        //show nothing to chagne alert
        this.dispatch(showAlertAC("Вы ничего не изменили.", "error"));
        return;
      } else {
        this.dispatch(editPhotoStartRequestAC());

        // PREPARE FIRESTORE REQUEST IF NEEDED
        if (isNeedFirestoreReq) {
          let editPhotoFirestoreReq: EditPhotoFirestoreReq = new EditPhotoFirestoreReq(
            true
          );

          reqPromises.push(editPhotoFirestoreReq.fetchSync(data));
          requests.firestoreReq = editPhotoFirestoreReq;
        }

        // PREPARE WORKER REQUEST IF NEEDED
        if (isNeedWorkerReq) {
          let editPhotoWorkerReq: EditPhotoWorkerReq = new EditPhotoWorkerReq(
            true
          );

          reqPromises.push(editPhotoWorkerReq.fetchSync(data));
          requests.workerReq = editPhotoWorkerReq;
        }

        this.requests.set(data.photoId, requests);

        // SEND REQUESTS
        await Promise.all(reqPromises);

        const isLastReq = this.requests.size === 1;

        // CHANGE GLOBAL STATE ON SUCCESS
        this.stateChangesOnSuccess(photoFirestoreData, data.photoId, isLastReq);
      }
    } catch (err) {
      this.onError(data.photoId);
    } finally {
      if (this.requests.has(data.photoId)) this.requests.delete(data.photoId);
    }
  };

  stateChangesOnSuccess = (
    photoFirestoreData: IEditPhotoData,
    photoId: string,
    isLastReq: boolean
  ) => {
    batch(() => {
      if (!this.searchState)
        throw new Error("No search state in EditPhotoReqManager");
      if (
        //isNeedFirestoreReq &&
        isInSearchTerms(this.searchState, photoFirestoreData)
      ) {
        this.dispatch(editPhotoRequestSuccessAC(undefined, isLastReq));
        // GET EDITED PHOTO FROM FIRESTORE
        this.sendGetEditedPhotoReq(photoId);
      } else {
        // If edited photo not in search term we send its id
        // to remove it from state
        this.dispatch(editPhotoRequestSuccessAC(photoId, isLastReq));
      }

      //console.log("Hide edit form", anotherForm);
      if (!this.anotherForm && isLastReq) this.dispatch(hideEditFormAC());

      this.dispatch(showAlertAC("Фото успешно изменено.", "success"));
    });
  };

  sendGetEditedPhotoReq = (photoId: string) => {
    let getEditedPhotoReq: GetEditedPhotoReq = new GetEditedPhotoReq(true);

    getEditedPhotoReq.addOnSuccess((photoData) =>
      this.dispatch(editPhotoAC(photoData))
    );

    getEditedPhotoReq.fetch(photoId);
  };

  onError = (id: string) => {
    if (!this.dispatch) throw new Error("No dispatch in EditPhotoReqManager");

    //this.requests.delete(id);

    batch(() => {
      if (this.requests.size === 1) this.dispatch(editPhotoRequestErrorAC());

      this.dispatch(
        showAlertAC("К сожалению, мы не смогли сохранить изменения", "error")
      );
    });
  };

  cancel(id: string) {
    throw new Error("Not Implemented cancel in EditPhotoReqManager");
  }
}

export default EditPhotoReqManager;
