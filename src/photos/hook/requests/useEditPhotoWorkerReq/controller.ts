import { getPhotosCollection } from "../../../../firebase/initFirestore";
import {
  makePhotoFormData,
  makeEditPhotoData,
  isInSearchTerms,
} from "../../helper/DataHelper";
import { post } from "../../../../utils/Fetch";
import { editPhotoUrl } from "../../../../config";

export const request = async (formData: FormData) => {
  const res = await post(editPhotoUrl, formData, {
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

export const getIsNeedRequest = (photoFormData: IEditPhotoFormData) =>
  photoFormData.photoFile ? photoFormData.photoFile.length > 0 : false;

export const prepareDataToWorkerReq = (
  photoFormData: IEditPhotoFormData,
  userUid: string,
  photoId: string
) => {
  if (!photoFormData.photoFile) throw new Error("No photo file");

  return makePhotoFormData({
    id: photoId,
    userUid,
    file: photoFormData.photoFile[0],
  });
};
