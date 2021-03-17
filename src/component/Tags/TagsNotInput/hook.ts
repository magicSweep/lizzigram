import { useSelector } from "react-redux";
import { useTags } from "../../../hooks/useTags";

export const useTagsElements = () => {
  const { tags, error, loading } = useTags();

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

  if (photo === undefined) throw new Error("No photo ");

  return {
    photoTags: photo.photo.tags,
    tags,
    error,
    loading,
  };
};
