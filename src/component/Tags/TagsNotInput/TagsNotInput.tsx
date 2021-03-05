import React, { FC } from "react";
import TagsSkeletons from "../TagsSkeletons";
import TagWidget from "../TagWidget";
import classes from "./TagsNotInput.module.scss";
import styles from "./../../../styles/classes.module.scss";
import commonClasses from "./../classes.module.scss";
import { numberOfTagsByPhoto } from "../../../config";
import { getPhotoTags, tagTypeToColor } from "./helper";
import TagsError from "../TagsError";

interface ITagsNotInputProps {
  tags: TTagsData | undefined;
  error: boolean;
  loading: boolean;
  photoTags: { [id: string]: boolean };
}

const TagsNotInput: FC<ITagsNotInputProps> = ({
  tags,
  error,
  loading,
  photoTags,
}) => {
  let content = null;

  console.log("[RENDER PHOTO DESC TAGS WIDGET]");

  if (loading) {
    content = (
      <ul
        className={`${commonClasses.tagsContainer} ${commonClasses["tagsContainer--flex"]}`}
      >
        <TagsSkeletons type="desc" />
      </ul>
    );
    /* content = (
        <div className={classes.sceletons}>
          <TagsSkeletons numberOfSkeletons={4} />
        </div>
      ); */
  } else if (error) {
    //content = <p className={classes.error}> Упс, тэги не загрузились...</p>;

    content = <TagsError />;
  } else {
    console.log("getTags", loading, error, tags);
    if (tags === undefined) throw new Error("No tags");

    let tagsData = getPhotoTags(tags, photoTags);

    const tagsElements = tagsData.map((tag, index) => {
      const color = tagTypeToColor(tag.type);
      return (
        <li key={`${tag.id}_${index}`} className={commonClasses.tag}>
          <TagWidget label={tag.title} color={color} />
        </li>
      );
    });

    content = (
      <ul
        className={`${commonClasses.tagsContainer} ${commonClasses["tagsContainer--flex"]}`}
      >
        {tagsElements}
      </ul>
    );
  }

  return (
    <div className={commonClasses.tagsWrapper}>
      <h4 className={`${styles.labelFont} ${commonClasses.title}`}>Тэги:</h4>
      {content}
    </div>
  );
};

export default TagsNotInput;
