import React, { FC } from "react";
import TagsNotInputWidget from "./TagsNotInput";
import { useTagsElements } from "./hook";

const TagsNotInput: FC = () => {
  const props = useTagsElements();

  console.log("[RENDER PHOTO DESC TAGS]");

  return <TagsNotInputWidget {...props} />;
};

export default TagsNotInput;
