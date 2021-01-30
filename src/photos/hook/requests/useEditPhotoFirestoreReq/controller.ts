import { getPhotosCollection } from "../../../../firebase/initFirestore";
import {
  makePhotoFormData,
  makeEditPhotoData,
  isInSearchTerms,
} from "../../helper/DataHelper";

export const request = (data: TEditPhotoFirestoreData) => {
  return getPhotosCollection().doc(data.photoId).update(data.photo);
};

export const getPhotoFirestoreData = (photoFormData: IEditPhotoFormData) =>
  makeEditPhotoData(photoFormData);

export const isPhotoInSearchTerms = (
  searchState: ISearchState,
  photo: IEditPhotoData
) => {
  isInSearchTerms(searchState, photo);
};

export const prepareDataToFirestoreReq = (
  photoFormData: IEditPhotoFormData,
  photoId: string
): TEditPhotoFirestoreData => {
  const photo = makeEditPhotoData(photoFormData);

  return {
    photo,
    photoId,
  };
};
