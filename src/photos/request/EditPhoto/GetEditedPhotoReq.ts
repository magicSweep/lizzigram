import { getPhotosCollection } from "../../firebase/initFirestore";
import ARequest from "../ARequest";
import GetPhotoReq from "../GetPhotoReq";

class GetEditedPhotoReq extends GetPhotoReq {
  type: TRequestType = "GET_EDITED_PHOTO";
}

export default GetEditedPhotoReq;
