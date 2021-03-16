import ARequest from "./../../../requests/ARequest";
import { getPhotosCollection } from "../../../firebase/initFirestore";
import { makeEditPhotoData } from "../helper/DataHelper";

class EditPhotoFirestoreReq extends ARequest<IEditPhotoFirestoreData, void> {
  type: TRequestType = "SEND_PHOTO_TO_FIRESTORE_ON_EDIT";

  request = (data: IEditPhotoFirestoreData) => {
    const photo = this.prepareDataToFirestoreReq(data);
    //photo.addedByUserUID = data.userUid;

    //SAVE PHOTO DATA TO FIRESTORE
    //const id = (data.photoFormData.date.getTime() + random(69999)).toString();
    return getPhotosCollection().doc(data.photoId).set(photo);
  };

  prepareDataToFirestoreReq = (
    data: IEditPhotoFirestoreData
  ): TEditPhotoFirestoreData => {
    const photo = makeEditPhotoData(data.photoFormData);

    return {
      photo,
      photoId: data.photoId,
    };
  };
}

export default EditPhotoFirestoreReq;
