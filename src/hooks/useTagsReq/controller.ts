import { tagsCollectionName } from "../../config";
import { getFirestoreDb } from "../../firebase/initFirestore";

export const request = async (data: undefined, abortSignal: AbortSignal) => {
  const tags: TTagsData = new Map();

  const snap = await getFirestoreDb().collection(tagsCollectionName).get();

  snap.forEach((tag: any) => {
    tags.set(tag.id, tag.data() as any);
  });

  return tags;
};
