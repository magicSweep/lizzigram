import React from "react";
import { useSelector } from "react-redux";
import { useAddPhoto } from "../../hook/useAddPhoto";
import AddPhotoFormWidget from "./AddPhotoForm";
//import { useAddPhotoForm } from "./hook";

export const AddPhotoForm = () => {
  const tagsData = useSelector<IGlobalState, TTagsData | undefined>(
    (state) => state.tags.tags
  );

  const { start: startReq, loading } = useAddPhoto();

  console.log("[RENDER ADD FORM]");

  return (
    <AddPhotoFormWidget
      uploadLoading={loading}
      addPhoto={startReq}
      tagsData={tagsData}
    />
  );
};

export default AddPhotoForm;
