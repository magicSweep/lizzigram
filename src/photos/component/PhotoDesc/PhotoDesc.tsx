import React from "react";
import classes from "./PhotoDesc.module.scss";
//import { ITagsState } from "../../../store/types";
import { getDate, getFormatDate, getPhotoTags } from "./helper";
import TagsSkeletons from "../../../fcomponent/TagsSkeletons";
import Button from "../../../component/Button";
import styles from "./../../../styles/classes.module.scss";
import TagWidget from "../../../fcomponent/TagWidget";

interface PhotoDescProps {
  /* 
  tags?: TTagsData;
  tagsError?: boolean;
  tagsLoading?: boolean; */
  photo: TPhotoData;
  tagsState: ITagsState;
  showEditPhotoForm: (photo: TPhotoData) => void;
}

export const getTags = (
  tagsState: ITagsState,
  photoTags: { [id: string]: boolean },

  classes: any
) => {
  let content = null;

  if (tagsState.loading) {
    content = (
      <ul className={classes.tagsContainer}>
        <TagsSkeletons numberOfSkeletons={4} />
      </ul>
    );
    /* content = (
      <div className={classes.sceletons}>
        <TagsSkeletons numberOfSkeletons={4} />
      </div>
    ); */
  } else if (tagsState.error) {
    //content = <p className={classes.error}> Упс, тэги не загрузились...</p>;
    content = (
      <ul className={classes.tagsContainer}>
        <li>
          <p className={classes.error}> Упс, тэги не загрузились...</p>
        </li>
      </ul>
    );
  } else {
    let tags = getPhotoTags(
      tagsState.tags ? tagsState.tags : new Map(),
      photoTags
    );

    const tagsElements = tags.map((tag, index) => {
      return (
        <li key={`${tag.id}_${index}`} className={classes.tags}>
          <TagWidget label={tag.title} color="secondary" />
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
  /*  tags,
  tagsError,
  tagsLoading, */
  photo,
  tagsState,
  showEditPhotoForm,
}: PhotoDescProps) => {
  //const classes = useStyles();

  const titleClasses = `${styles.titleFont} ${classes.title}`;

  const paragraphClasses = `${styles.paragraphFont} ${classes.paragraph}`;

  //console.log("[PRE RENDER PHOTO DESC] ", date, typeof date);
  const tagsElements = getTags(tagsState, photo.photo.tags, classes);

  const finalDate = getDate(photo.photo.date);

  const formatDate = getFormatDate(finalDate);

  const onEdit = () => showEditPhotoForm(photo);

  console.log("[RENDER PHOTO DESC WIDGET] ", finalDate);

  return (
    <div className={classes.root}>
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

      <div className={classes.buttons}>
        <Button onClick={onEdit} label="Изменить" />
      </div>
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
