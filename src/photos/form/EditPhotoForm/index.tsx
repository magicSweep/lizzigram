import React from "react";
import EditPhotoFormWidget from "./EditPhotoForm";
import { useEditPhotoForm } from "./hook";
import { useEditPhoto } from "../../hook/useEditPhoto";

export const EditPhotoForm = () => {
  const { prevPhoto, tagsData } = useEditPhotoForm();

  const { start: startReq, loading } = useEditPhoto();

  console.log("[RENDER EDIT FORM]");

  return (
    <EditPhotoFormWidget
      prevPhoto={prevPhoto}
      uploadLoading={loading}
      editPhoto={startReq}
      tagsData={tagsData}
    />
  );
};

export default EditPhotoForm;
