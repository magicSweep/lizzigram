import React from "react";
import MoreActionsBtn, { IMoreActionsBtnProps } from ".";

export default {
  component: MoreActionsBtn,
  title: "Buttons/MoreActionsBtn",
  decorators: [
    (story: any) => (
      <div
        style={{
          paddingTop: "50px",
          width: "200px",
          margin: "auto",
          display: "flex",
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
  id: "id",
  photo: {
    googleDriveId: "googleDriveId",
  },
};

const Template = (args: IMoreActionsBtnProps) => <MoreActionsBtn {...args} />;

/* photos,
  loadMorePhotos,
  reLoadPhotos,
  hasNextPage,
  loading,
  error, */

type D<T> = {
  args: T;
};

export const Default: D<IMoreActionsBtnProps> = Template.bind({}) as any;
Default.args = {
  photo: photo as any,
  isEditable: true,
  showEditPhotoForm: () => {},
  showPhotoDesc: () => {},
};

export const NotEditable: D<IMoreActionsBtnProps> = Template.bind({}) as any;
NotEditable.args = {
  photo: photo as any,
  isEditable: false,
  showEditPhotoForm: () => {},
  showPhotoDesc: () => {},
};
