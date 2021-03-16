import { editPhotoUrl } from "../../../config";
import PhotoWorkerReq from "../PhotoWorkerReq";

class EditPhotoWorkerReq extends PhotoWorkerReq<IEditPhotoFormData> {
  type: TRequestType = "SEND_PHOTO_TO_WORKER_ON_EDIT";
  url: string = editPhotoUrl;
}

export default EditPhotoWorkerReq;
