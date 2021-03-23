import ARequest from "./../../requests/ARequest";
import { post } from "../../utils/Fetch";
//import { addPhotoUrl } from "../../config";
import { makePhotoFormData } from "./helper/DataHelper";

class PhotoWorkerReq<T> extends ARequest<IPhotoFirestoreData<T>, void> {
  //type: TRequestType = "SEND_PHOTO_TO_WORKER_ON_ADD";
  url: string = "";

  request = async (data: IPhotoFirestoreData<T>) => {
    /* const formData = makePhotoFormData({
      id: data.photoId,
      userUid: data.userUid,
      file: data.photoFormData.photoFile[0],
    }); */

    const formData = this.prepareDataToWorkerReq(data);

    const res = await post(this.url, formData, {
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

  prepareDataToWorkerReq = (data: IPhotoFirestoreData<T>) => {
    return makePhotoFormData({
      id: data.photoId,
      userUid: data.userUid,
      file: (data.photoFormData as any).photoFile[0],
    });
  };
}

export default PhotoWorkerReq;
