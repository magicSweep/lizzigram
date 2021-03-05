import React from "react";
import TagsNotInput from "./TagsNotInput";
import { tagsData } from "../TagsCheckbox/__mock";

const photo = {
  id: "123ic",
  iconSrc: "",
  photo: {
    tags: {
      vekwWqVY1yYRd3XeERmd: true,
      WX6CY5kGx4FXvdZR6g8E: true,
      //fYZ3uqG1vBLFH75Y0rjM: true,
      //bCcRcxADj2xP9fkSXNpH: false,
    },
    date: new Date("2018-11-23"),
    description: "",
  },
};

export default {
  component: TagsNotInput,
  title: "Tags/TagsNotInput",
  decorators: [
    (story: any) => (
      <div
        style={{
          padding: "50px",
          maxWidth: "600px",
          margin: "auto",
        }}
      >
        {story()}
      </div>
    ),
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template = (args: any) => <TagsNotInput {...args} />;

export const Default = Template.bind({});
(Default as any).args = {
  tags: tagsData,
  error: false,
  loading: false,
  photoTags: photo.photo.tags,
};

export const LoadingTags = Template.bind({});
(LoadingTags as any).args = {
  tags: tagsData,
  error: false,
  loading: true,
  photo,
};

export const ErrorTags = Template.bind({});
(ErrorTags as any).args = {
  tags: tagsData,
  error: true,
  loading: false,
  photo,
};
