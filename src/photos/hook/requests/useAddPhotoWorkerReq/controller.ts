import { getPhotosCollection } from "../../../../firebase/initFirestore";
import { makeAddPhotoData, makePhotoFormData } from "../../helper/DataHelper";
import { post } from "../../../../utils/Fetch";
import { addPhotoUrl } from "../../../../config";

//import random from "lodash.random";

export const prepareDataToWorkerReq = (data: TCreatePhotoFirestoreData) => {
  return makePhotoFormData({
    id: data.photoId,
    userUid: data.userUid,
    file: data.photoFormData.photoFile[0],
  });
};

export const request = async (data: TCreatePhotoFirestoreData) => {
  /* const formData = makePhotoFormData({
    id: data.photoId,
    userUid: data.userUid,
    file: data.photoFormData.photoFile[0],
  }); */

  const formData = prepareDataToWorkerReq(data);

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
