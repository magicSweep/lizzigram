import styles from "./../../styles/classes.module.scss";

export const getRootClassesByColor = (color: TColorProp) => {
  let rootClasses = "";

  switch (color) {
    case "noncolor":
      //flabelClasses += ` ${styles.primaryColor}`;
      rootClasses += ` ${styles.nonColorBorder} ${styles.nonColor}`;
      break;
    case "primary":
      //flabelClasses += ` ${styles.primaryColor}`;
      rootClasses += ` ${styles.primaryColorBorder} ${styles.primaryColor}`;
      break;

    case "secondary":
      //flabelClasses += ` ${styles.secondaryColor}`;
      rootClasses += ` ${styles.secondaryColorBorder} ${styles.secondaryColor}`;
      break;

    case "warning":
      //flabelClasses += ` ${styles.warningColor}`;
      rootClasses += ` ${styles.warningColorBorder}  ${styles.warningColor}`;
      break;

    case "info":
      //flabelClasses += ` ${styles.infoColor}`;
      rootClasses += ` ${styles.infoColorBorder} ${styles.infoColor}`;
      break;

    case "disabled":
      //flabelClasses += ` ${styles.disabledColor}`;
      rootClasses += ` ${styles.disabledBorder} ${styles.disabledColor}`;
      break;

    default:
      throw new Error(`No implementation for color - ${color}`);
  }

  return rootClasses;
};

export const tagTypeToColor = (tagType: TTagType): TColorProp => {
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

export const getPhotoTags = (
  tagsData: TTagsData,
  photoTags: { [id: string]: boolean }
): ITagData[] => {
  const res = [];

  for (let tagId in photoTags) {
    if (photoTags[tagId] === true && tagsData.has(tagId)) {
      const data = tagsData.get(tagId);
      res.push({
        id: tagId,
        ...data,
      });
    }
  }

  return res as any;
};
