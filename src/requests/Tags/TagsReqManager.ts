import TagsRequest from "./TagsRequest";
import {
  tagsRequestAC,
  tagsRequestSuccessAC,
  tagsRequestErrorAC,
} from "../../store/action/tags";

class TagsReqManager {
  dispatch: any;

  request: TagsRequest | undefined;

  startNew = async () => {
    if (this.request !== undefined) return;

    if (!this.dispatch) throw new Error("No dispatch in PhotosReqManager");

    this.request = new TagsRequest(true);

    this.dispatch(tagsRequestAC());

    try {
      const tagsData = await this.request.fetchSync(undefined);

      this.dispatch(tagsRequestSuccessAC(tagsData));
    } catch (err) {
      this.dispatch(tagsRequestErrorAC());
    } finally {
      this.request = undefined;
    }
  };

  cancel() {
    if (this.request) this.request.cancel();
  }
}

export default TagsReqManager;

/* import PhotosRequest from "./PhotosRequest";
import {
  allPhotosStartNewRequestAC,
  allPhotosRequestErrorAC,
  allPhotosRequestSuccessAC,
  allPhotosStartMoreRequestAC,
  fetchMorePhotosRequestSuccessAC,
} from "../../photos/store/action/photos";

interface IReqInfo {
  cancel: any;
  reqStartData: any;
}

class PhotosReqManager {
  dispatch: any;

  request: PhotosRequest | undefined;

  startNew = (data: IPhotosReqData) => {
    if (this.request !== undefined) return;

    this.request = new PhotosRequest(true);

    this.request.addOnStart(this.onStart);

    this.request.addOnSuccess((data) => {
      if (!this.request) throw new Error("No request in PhotosReqManager");

      this.onSuccess(data, this.request.reqData);
      this.request = undefined;
    });

    this.request.addOnError((err) => {
      this.request = undefined;
    });

    this.request.fetch(data);
  };

  onStart = (reqData?: IPhotosReqData) => {
    if (!reqData) throw new Error("No data in PhotosReqManager");

    if (!this.dispatch) throw new Error("No dispatch in PhotosReqManager");

    if (!reqData.isLoadMore) {
      this.dispatch(allPhotosStartNewRequestAC());
    } else {
      this.dispatch(allPhotosStartMoreRequestAC());
    }
  };

  onSuccess = (data: TGetPhotosData, reqData?: IPhotosReqData) => {
    if (!reqData) throw new Error("No data in PhotosReqManager");

    if (!this.dispatch) throw new Error("No dispatch in PhotosReqManager");

    if (!reqData.isLoadMore) {
      this.dispatch(allPhotosRequestSuccessAC(data));
    } else {
      this.dispatch(fetchMorePhotosRequestSuccessAC(data));
    }
  };

  onError = () => {
    if (!this.dispatch) throw new Error("No dispatch in PhotosReqManager");

    this.dispatch(allPhotosRequestErrorAC());
  };

  cancel() {
    if (this.request) this.request.cancel();
  }
}

export default PhotosReqManager;
 */
