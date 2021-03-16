import { getPhotosCollection } from "./../../firebase/initFirestore";
import ARequest from "./../../requests/ARequest";

class GetPhotoReq extends ARequest<string, TPhotoData> {
  //type: TRequestType = "GET_ADDED_PHOTO";

  request = async (photoId: string) => {
    //const photo = makeAddPhotoData(data.photoFormData);
    //photo.addedByUserUID = data.userUid;

    //SAVE PHOTO DATA TO FIRESTORE
    //const id = (data.photoFormData.date.getTime() + random(69999)).toString();
    const res = await getPhotosCollection().doc(photoId).get();

    const photo: TPhotoData = {
      id: photoId,
      photo: res.data() as IPhoto,
    };

    return photo;
  };
}

export default GetPhotoReq;
