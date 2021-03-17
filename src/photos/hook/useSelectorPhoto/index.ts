import { useSelector } from "react-redux";

export const useSelectorPhoto = () => {
  const photo = useSelector<IGlobalState, TPhotoData | undefined>((state) => {
    const photoId = state.modal.photoId;
    const photos = state.photos.photos;
    if (photos && photos.has(photoId)) {
      return {
        id: photoId,
        photo: photos.get(photoId) as IPhoto,
      };
    }
    return undefined;
  });

  return photo;
};
