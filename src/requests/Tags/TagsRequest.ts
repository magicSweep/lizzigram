import ARequest from "../ARequest";
import { getFirestoreDb } from "../../firebase/initFirestore";
import { tagsCollectionName } from "../../config";

class TagsRequest extends ARequest<undefined, TTagsData> {
  type: TRequestType = "GET_ALL_TAGS";

  request = async () => {
    const tags: TTagsData = new Map();

    const snap = await getFirestoreDb().collection(tagsCollectionName).get();

    snap.forEach((tag: any) => {
      tags.set(tag.id, tag.data() as any);
    });

    return tags;
  };
}

export default TagsRequest;
