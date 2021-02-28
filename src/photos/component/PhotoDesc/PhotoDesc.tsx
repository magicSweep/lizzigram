import React from "react";
import classes from "./PhotoDesc.module.scss";
//import { ITagsState } from "../../../store/types";
import { getDate, getFormatDate, getPhotoTags } from "./helper";
import TagsSkeletons from "../../../fcomponent/TagsSkeletons";
import Button from "../../../component/Button";
import styles from "./../../../styles/classes.module.scss";
import TagWidget from "../../../fcomponent/TagWidget";
import { numberOfTagsByPhoto } from "../../../config";

interface PhotoDescProps {
  tags: TTagsData | undefined;
  error: boolean;
  loading: boolean;
  photo: TPhotoData | undefined;
  isEditable: boolean;
  //tagsState: ITagsState;
  showEditPhotoForm: (photo: TPhotoData) => void;
}

const tagTypeToColor = (tagType: TTagType): TColorProp => {
  switch (tagType) {
    case "withWho":
      return "secondary";
    case "where":
      return "warning";
    case "feeling":
      return "info";

    default:
      throw new Error(`No implementation for type - ${tagType}`);
  }
};

export const getTags = (
  tags: TTagsData | undefined,
  error: boolean,
  loading: boolean,
  photoTags: { [id: string]: boolean },
  classes: any
) => {
  let content = null;

  if (loading) {
    content = (
      <ul className={classes.tagsContainer}>
        <TagsSkeletons numberOfSkeletons={numberOfTagsByPhoto} />
      </ul>
    );
    /* content = (
      <div className={classes.sceletons}>
        <TagsSkeletons numberOfSkeletons={4} />
      </div>
    ); */
  } else if (error) {
    //content = <p className={classes.error}> Упс, тэги не загрузились...</p>;
    content = (
      <ul className={classes.tagsContainer}>
        <li>
          <p className={classes.error}> Упс, тэги не загрузились...</p>
        </li>
      </ul>
    );
  } else {
    console.log("getTags", loading, error, tags);
    if (tags === undefined) throw new Error("No tags");

    let tagsData = getPhotoTags(tags, photoTags);

    const tagsElements = tagsData.map((tag, index) => {
      const color = tagTypeToColor(tag.type);
      return (
        <li key={`${tag.id}_${index}`} className={classes.tags}>
          <TagWidget label={tag.title} color={color} />
        </li>
      );
    });

    content = <ul className={classes.tagsContainer}>{tagsElements}</ul>;
  }

  return (
    <div className={classes.tagsWrapper}>
      <h4 className={classes.tagsTitle}>Тэги:</h4>
      {content}
    </div>
  );
};

export const PhotoDesc = ({
  //photo,
  tags,
  error,
  loading,
  photo,
  isEditable,
  //tagsState,
  showEditPhotoForm,
}: PhotoDescProps) => {
  //const classes = useStyles();

  if (photo === undefined) throw new Error("Bad, bad photo");

  const titleClasses = `${styles.titleFont} ${classes.title}`;

  const paragraphClasses = `${styles.paragraphFont} ${classes.paragraph}`;

  //console.log("[PRE RENDER PHOTO DESC] ", date, typeof date);
  const tagsElements = getTags(tags, error, loading, photo.photo.tags, classes);

  const finalDate = getDate(photo.photo.date);

  const formatDate = getFormatDate(finalDate);

  const onEdit = () => showEditPhotoForm(photo);

  console.log("[RENDER PHOTO DESC WIDGET] ", finalDate);

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <img className={classes.photo} src={photo.photo.iconSrc} />
      </div>

      <h4 className={titleClasses}>Дата:</h4>

      <p className={paragraphClasses}>{formatDate}</p>

      <br />

      {photo.photo.description && (
        <>
          <h4 className={titleClasses}>Описание:</h4>

          <p className={`${paragraphClasses} ${styles.textIndent}`}>
            {photo.photo.description}
          </p>
          <br />
        </>
      )}

      {tagsElements}

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
