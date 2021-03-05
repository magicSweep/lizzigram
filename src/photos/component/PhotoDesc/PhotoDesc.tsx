import React from "react";
import classes from "./PhotoDesc.module.scss";
//import { ITagsState } from "../../../store/types";
import { getDate, getFormatDate, getYearsOldFormated } from "./helper";
//import TagsSkeletons from "../../../fcomponent/TagsSkeletons";
import Button from "../../../component/Button";
import styles from "./../../../styles/classes.module.scss";
//import TagWidget from "../../../fcomponent/TagWidget";
//import { numberOfTagsByPhoto } from "../../../config";
import TagsNotInput from "../../../component/Tags/TagsNotInput";

interface PhotoDescProps {
  tags: TTagsData | undefined;
  error: boolean;
  loading: boolean;
  photo: TPhotoData | undefined;
  isEditable: boolean;
  //tagsState: ITagsState;
  showEditPhotoForm: (photo: TPhotoData) => void;
}

export const PhotoDesc = ({
  //photo,
  /* tags,
  error,
  loading, */
  photo,
  isEditable,
  //tagsState,
  showEditPhotoForm,
}: PhotoDescProps) => {
  //const classes = useStyles();

  if (photo === undefined) throw new Error("Bad, bad photo");

  const titleClasses = `${styles.titleFont} ${classes.title}`;

  const paragraphClasses = `${styles.paragraph} ${classes.paragraph}`;

  //console.log("[PRE RENDER PHOTO DESC] ", date, typeof date);
  //const tagsElements = getTags(tags, error, loading, photo.photo.tags, classes);

  const finalDate = getDate(photo.photo.date);

  const formatDate = getFormatDate(finalDate);

  const yearsOldFormated = getYearsOldFormated(finalDate);

  const onEdit = () => showEditPhotoForm(photo);

  console.log("[RENDER PHOTO DESC WIDGET] ", finalDate);

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <img className={classes.photo} src={photo.photo.iconSrc} />
      </div>

      <div className={classes.element}>
        <h4 className={titleClasses}>Дата:</h4>

        <p className={paragraphClasses}>{formatDate}</p>
      </div>

      <div className={classes.element}>
        <h4 className={titleClasses}>Возраст:</h4>

        <p className={paragraphClasses}>{yearsOldFormated}</p>
      </div>

      {photo.photo.description && (
        <>
          <h4 className={titleClasses}>Описание:</h4>

          <p className={`${paragraphClasses} ${styles.textIndent}`}>
            {photo.photo.description}
          </p>
          <br />
        </>
      )}

      <TagsNotInput />

      {isEditable && (
        <div className={classes.buttons}>
          <Button onClick={onEdit} label="Изменить" />
        </div>
      )}
    </div>
  );
};

/* const mapStateToProps = (state: IGlobalState) => {
  return {
    //photo: state.modal.photo,
    tags: state.tags.tags,
    tagsError: state.tags.error,
    tagsLoading: state.tags.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showEditPhotoForm: (photo: TPhotoData) => dispatch(showEditFormAC(photo)),
    /*  fetchData: () => {
      //console.log("onClick");
      dispatch(fetchTagsAC());
    }, /
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDesc); */

export default PhotoDesc;
