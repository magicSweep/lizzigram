import React, { FC } from "react";
//import classes from './EditPhotoForm.module.scss';
//import { makeStyles } from "@material-ui/core/styles";
import { useUploadPhotoForm } from "../hook";
import IAddEditPhotoFormWidget from "../AddEditPhotoFormWidget";
//import { TPhotoData } from "../../types";
import {
  //photoFileRules,
  descRules,
  dateRules,
  tagsRules,
} from "../Photo.rules";
import { getDefaultTagsIds, getDefaultPhotoDate } from "./helper";
//import { connect } from "react-redux";
//import { saveEditedPhoto } from "../../controller";
//import { IGlobalState } from "../../../store/types";
//import { TTagsData } from "../../../store/types";
//import { Color } from "@material-ui/lab/Alert";
//import { showAlertAC } from "../../../store";
//import { ISearchState } from "../../types";
//import { useEditPhoto } from "../../store/hook";
import { editPhotoFormTitle } from "../../../config";
import classes from "./EditPhotoForm.module.scss";
import { getDate } from "../../helper/date";

/* export interface IEditPhotoFormData {
  desc?: string;
  date?: Date;
  photoFile?: FileList;
  tags?: { [name: string]: boolean };
} */

interface EditPhotoFormProps {
  prevPhoto: TPhotoData | undefined;
  //userUID: string;
  //editPhotoLoading?: boolean;

  //searchState?: ISearchState;
  uploadLoading: boolean;
  editPhoto: (formData: IEditPhotoFormData) => void;
  /* onSuccessUpload?: (
    editPhotoData: any //IEditPhotoResponseToClient
  ) => void | undefined;
  onUploadError?: () => void | undefined; */
  tagsData?: TTagsData;
}

/* const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    justifyContent: "center",
  },
}); */

const registerInfo = [
  { name: "tags", rules: tagsRules },
  //{ name: "date", rules: { validate: dateRules.validate } },
];

export const EditPhotoForm: FC<EditPhotoFormProps> = ({
  prevPhoto,
  //fetchPhoto,
  //searchState,
  ///userUID,
  editPhoto,
  uploadLoading,
  /*  onSuccessUpload,
  onUploadError, */
  tagsData,
}) => {
  //const classes = useStyles();

  if (prevPhoto === undefined) throw new Error("No prev photo in state");

  const defaultTagsIds = getDefaultTagsIds(prevPhoto.photo);

  const submit = (formData: IEditPhotoFormData) => {
    console.log("SUBMIT");

    editPhoto(formData);
  };

  /* const defaultPhotoDate = getDefaultPhotoDate(
    (prevPhoto.photo.date as any).toDate()
  ); */

  const defaultPhotoDate = getDefaultPhotoDate(getDate(prevPhoto.photo.date));

  const uploadPhotoFormData = useUploadPhotoForm<IEditPhotoFormData>(
    tagsData,
    registerInfo,
    defaultTagsIds,
    {
      defaultValues: {
        date: defaultPhotoDate,
        //date: (prevPhoto.photo.date as any).toDate(),
        desc: prevPhoto.photo.description,
      },
    }
  );

  console.log("[RENDER EDIT FORM WIDGET]", defaultPhotoDate);

  return (
    <>
      <div className={classes.wrapper}>
        <img className={classes.photo} src={prevPhoto.photo.iconSrc} />
      </div>

      <IAddEditPhotoFormWidget
        title={editPhotoFormTitle}
        photoFileRules={undefined}
        descRules={descRules}
        dateRules={dateRules}
        uploadLoading={uploadLoading}
        onSubmit={uploadPhotoFormData.handleSubmit(submit)}
        uploadPhotoFormData={uploadPhotoFormData}
      />
    </>
  );
};

export default EditPhotoForm;
