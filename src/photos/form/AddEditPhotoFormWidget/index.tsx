import React from "react";
import classes from "./AddEditPhotoFormWidget.module.scss";
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
//import { MuiPickersUtilsProvider } from "@material-ui/pickers";
//import DateFnsUtils from "@date-io/date-fns";

//import LinearProgress from "@material-ui/core/LinearProgress";

//import Button from "@material-ui/core/Button";

import UploadButton from "../../../component/FormElements/UploadButton";
import TagsCheckbox from "../../../component/Tags/TagsCheckbox";
//import { Typography } from "@material-ui/core";

//import TextField from "@material-ui/core/TextField";
//import DatePicker from "../../../component/FormElements/DatePicker";
import { IUseUploadPhotoFormReturn } from "../hook";
import ProgressIndicator from "../../../component/ProgressIndicator";
import Button from "../../../component/Button";
import BaseInput from "../../../component/FormElements/BaseInput";
import Textarea from "../../../component/FormElements/Textarea";

//import { photoFileRules, descRules } from "./../Photo.rules";

interface IAddEditPhotoFormWidgetProps {
  title?: string;
  photoFileRules: any;
  descRules: any;
  onSubmit: (...args: any) => void;
  uploadLoading?: boolean;
  //defaultTagsIds?: string[];
  uploadPhotoFormData: IUseUploadPhotoFormReturn;
}

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

const getTitle = (title?: string) => {
  if (!title) return null;

  return (
    <div className={classes.title}>
      <h4>{title}</h4>
    </div>
  );
};

const AddEditPhotoFormWidget = ({
  title,
  photoFileRules,
  descRules,
  onSubmit,
  uploadLoading,
  //defaultTagsIds,
  uploadPhotoFormData,
}: IAddEditPhotoFormWidgetProps) => {
  //const classes = useStyles();
  const titleElement = getTitle(title);

  const { formErrors, register, tagsProps, dateProps } = uploadPhotoFormData;
  /* const {
    onTagsCheckboxChange,
    tagsData,
    tagsLoading,
    tagsState,
    queryError: tagsQueryError,
  } = controller.tagsDependencies;
 */
  return (
    <form className={classes.root} onSubmit={onSubmit}>
      {titleElement}
      <div className={classes.element}>
        <UploadButton
          id="upload_photo_1234"
          name="photoFile"
          label="Добавить фоту"
          inputRef={register(photoFileRules)}
          error={formErrors.photoFile ? true : false}
          helperText={formErrors.photoFile && formErrors.photoFile.message}
          disabled={uploadLoading}
        />
      </div>

      <div className={classes.element}>
        <BaseInput
          label="Когда сделан снимок(примерно)."
          id="date-picker-id1234"
          name="date"
          type="date"
          inputRef={register(photoFileRules)}
          error={formErrors.date ? true : false}
          helperText={formErrors.date && formErrors.date.message}
          disabled={uploadLoading}
        />
      </div>

      <div className={classes.element}>
        <TagsCheckbox
          label={"Добавьте тэги к фоте:"}
          onChange={tagsProps.onTagsCheckboxChange}
          //setInitState={tagsProps.setTagsInitState}
          itemsState={tagsProps.tagsState}
          //defaultTagsIds={defaultTagsIds}
          error={formErrors.tags}
          disabled={uploadLoading as any}
        />
      </div>

      <div className={classes.element}>
        <Textarea
          name="desc"
          inputRef={register(descRules) as any}
          id="outlined-multiline-static"
          label="Небольшое необязательное описание."
          error={formErrors.desc ? true : false}
          helperText={formErrors.desc && formErrors.desc.message}
          disabled={uploadLoading}
        />

        {/*   <TextField
          name="desc"
          inputRef={register(descRules) as any}
          id="outlined-multiline-static"
          label="Небольшое необязательное описание."
          error={formErrors.desc ? true : false}
          helperText={formErrors.desc && formErrors.desc.message}
          fullWidth
          multiline
          disabled={uploadLoading}
          rows={3}
          variant="outlined"
        /> */}
      </div>

      {uploadLoading && (
        <div className={classes.linearProgress}>
          <ProgressIndicator />
        </div>
      )}

      <div className={classes.submitButton}>
        <Button disabled={uploadLoading} label="Отправить" />
      </div>
    </form>
  );
};

export default AddEditPhotoFormWidget;
