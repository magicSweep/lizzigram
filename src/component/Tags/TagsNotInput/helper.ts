interface ITagData extends ICheckboxItemData {
  id: string;
}

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
