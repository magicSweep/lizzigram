import { getPhotosCollection } from "../../../../firebase/initFirestore";
import { makeAddPhotoData } from "../../helper/DataHelper";
//import random from "lodash.random";

export const prepareDataToFirestoreReq = (data: TCreatePhotoFirestoreData) => {
  const photo = makeAddPhotoData(data.photoFormData);
  photo.addedByUserUID = data.userUid;

  //SAVE PHOTO DATA TO FIRESTORE
  //const photoId = (photoFormData.date.getTime() + random(69999)).toString();

  return photo;
};

export const request = (data: TCreatePhotoFirestoreData) => {
  const photo = prepareDataToFirestoreReq(data);
  //photo.addedByUserUID = data.userUid;

  //SAVE PHOTO DATA TO FIRESTORE
  //const id = (data.photoFormData.date.getTime() + random(69999)).toString();
  return getPhotosCollection().doc(data.photoId).set(photo);
};
