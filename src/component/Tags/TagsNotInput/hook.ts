import { useSelector } from "react-redux";
import { useTags } from "../../../hooks/useTags";

export const useTagsElements = () => {
  const { tags, error, loading } = useTags();

  const photo = useSelector<IGlobalState, TPhotoData | undefined>(
    (state) => state.modal.photo
  );

  if (photo === undefined) throw new Error("No photo ");

  return {
    photoTags: photo.photo.tags,
    tags,
    error,
    loading,
  };
};
