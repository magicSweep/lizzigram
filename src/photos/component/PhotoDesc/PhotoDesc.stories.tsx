import React from "react";
import { action } from "@storybook/addon-actions";
import PhotoDesc from "./PhotoDesc";
import { tagsData } from "../../../component/FormElements/TagsCheckbox/__mock";
import image from "./../../../static/ladki.jpg";

export default {
  component: PhotoDesc,
  title: "Photos/PhotoDesc",
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

const photo = {
  id: "123ic",
  iconSrc: image,
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

/* `Зали пробует землю на вкус... Зали пробует землю на вкус... Зали пробует
      землю на вкус... Зали пробует землю на вкус... Зали пробует землю на
      вкус... Зали пробует землю на вкус... Зали пробует землю на вкус... Зали
      пробует землю на вкус... Зали пробует землю на вкус... Зали пробует
      землю на вкус... Зали пробует землю на вкус... ` */

const Template = (args: any) => <PhotoDesc {...args} />;

export const Default = Template.bind({});
(Default as any).args = {
  tags: tagsData,
  error: false,
  loading: false,
  photo,
  isEditable: true,
  showEditPhotoForm: () => console.log("SHOW EDIT PHOTO FORM"),
};

export const NotEditable = Template.bind({});
(NotEditable as any).args = {
  tags: tagsData,
  error: false,
  loading: false,
  photo,
  isEditable: false,
  showEditPhotoForm: () => console.log("SHOW EDIT PHOTO FORM"),
};

export const WithDesc = Template.bind({});
(WithDesc as any).args = {
  tags: tagsData,
  error: false,
  loading: false,
  isEditable: true,
  photo: {
    id: "123ic",
    photo: {
      ...photo.photo,
      description: `Зали пробует землю на вкус... Зали пробует землю на вкус... Зали пробует
    землю на вкус... Зали пробует землю на вкус... Зали пробует землю на
    вкус... Зали пробует землю на вкус... Зали пробует землю на вкус... Зали
    пробует землю на вкус... Зали пробует землю на вкус... Зали пробует
    землю на вкус... Зали пробует землю на вкус... `,
    },
  },
  showEditPhotoForm: () => console.log("SHOW EDIT PHOTO FORM"),
};

export const LoadingTags = Template.bind({});
(LoadingTags as any).args = {
  tags: tagsData,
  error: false,
  loading: true,
  photo,
  isEditable: true,
  showEditPhotoForm: () => console.log("SHOW EDIT PHOTO FORM"),
};

export const ErrorTags = Template.bind({});
(ErrorTags as any).args = {
  tags: tagsData,
  error: true,
  loading: false,
  photo,
  isEditable: true,
  showEditPhotoForm: () => console.log("SHOW EDIT PHOTO FORM"),
};

/* export const Default = () => {
  return (
    <PhotoDesc
      photo={photo as any}
      tags={tagsData}
      tagsError={false}
      tagsLoading={false}
      showEditPhotoForm={() => console.log("On edit photo click")}
    />
  );
};
 */
/* export const LoadingTags = () => {
  return (
    <PhotoDesc
      photo={photo as any}
      tags={undefined}
      tagsError={false}
      tagsLoading={true}
      showEditPhotoForm={() => console.log("On edit photo click")}
    />
  );
};

export const ErrorTags = () => {
  return (
    <PhotoDesc
      photo={photo as any}
      tags={undefined}
      tagsError={true}
      tagsLoading={false}
      showEditPhotoForm={() => console.log("On edit photo click")}
    />
  );
}; */
