import ARequest from "./../../../requests/ARequest";
import { getPhotosCollection } from "../../../firebase/initFirestore";
import { makeAddPhotoData } from "../helper/DataHelper";

class AddPhotoFirestoreReq extends ARequest<
  IPhotoFirestoreData<IAddPhotoFormData>,
  void
> {
  type: TRequestType = "SEND_PHOTO_TO_FIRESTORE_ON_ADD";

  request = (data: IPhotoFirestoreData<IAddPhotoFormData>) => {
    const photo = this.prepareDataToFirestoreReq(data);
    //photo.addedByUserUID = data.userUid;

    //SAVE PHOTO DATA TO FIRESTORE
    //const id = (data.photoFormData.date.getTime() + random(69999)).toString();
    return getPhotosCollection().doc(data.photoId).set(photo);
  };

  prepareDataToFirestoreReq = (
    data: IPhotoFirestoreData<IAddPhotoFormData>
  ) => {
    const photo = makeAddPhotoData(data.photoFormData);
    photo.addedByUserUID = data.userUid;

    //SAVE PHOTO DATA TO FIRESTORE
    //const photoId = (photoFormData.date.getTime() + random(69999)).toString();

    return photo;
  };
}

export default AddPhotoFirestoreReq;
