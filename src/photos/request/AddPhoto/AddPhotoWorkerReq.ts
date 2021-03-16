import { addPhotoUrl } from "../../../config";
import PhotoWorkerReq from "../PhotoWorkerReq";

class AddPhotoWorkerReq extends PhotoWorkerReq<IAddPhotoFormData> {
  type: TRequestType = "SEND_PHOTO_TO_WORKER_ON_ADD";
  url: string = addPhotoUrl;
}

export default AddPhotoWorkerReq;

/* import ARequest from "./../ARequest";
import { post } from "../../utils/Fetch";
import { addPhotoUrl } from "../../config";
import { makePhotoFormData } from "../helper/DataHelper";

class AddPhotoWorkerReq extends ARequest<TCreatePhotoFirestoreData, void> {
  type: TRequestType = "SEND_PHOTO_TO_WORKER_ON_ADD";

  request = async (data: TCreatePhotoFirestoreData) => {
    /* const formData = makePhotoFormData({
      id: data.photoId,
      userUid: data.userUid,
      file: data.photoFormData.photoFile[0],
    }); /

    const formData = this.prepareDataToWorkerReq(data);

    const res = await post(addPhotoUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    //console.log("ADD RESPONSE", res);

    const resData = await res.json();

    if (resData.status === "error") {
      throw new Error(`Server return some error - ${resData.data}`);
    }
  };

  prepareDataToWorkerReq = (data: TCreatePhotoFirestoreData) => {
    return makePhotoFormData({
      id: data.photoId,
      userUid: data.userUid,
      file: data.photoFormData.photoFile[0],
    });
  };
}

export default AddPhotoWorkerReq;
 */
