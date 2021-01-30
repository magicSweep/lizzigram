import React from "react";
import EditPhotoFormWidget from "./EditPhotoForm";
import { useEditPhotoForm } from "./hook";
import { useEditPhotoReqs } from "../../hook/requests/useEditPhotoReqs";

export const EditPhotoForm = () => {
  const { prevPhoto, tagsData } = useEditPhotoForm();

  const { start: startReq, loading } = useEditPhotoReqs();

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
