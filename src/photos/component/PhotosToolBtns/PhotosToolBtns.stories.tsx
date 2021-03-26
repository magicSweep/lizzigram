import React, { useState } from "react";
import PhotosToolBtns from "./PhotosToolBtns";

export default {
  component: PhotosToolBtns,
  title: "Photos/PhotosToolBtns",
  decorators: [
    (story: any) => (
      <div
        style={{
          paddingTop: "50px",
          width: "800px",
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

const Template = (args: any) => <PhotosToolBtns {...args} />;

const baseArgs = {
  isShow: true,
  isEditor: true,
  isSearch: false,
  showAddPhotoForm: () => console.log("showAddPhotoForm"),
  showSearchPhotoForm: () => console.log("showSearchPhotoForm"),
  resetSearchState: () => console.log("resetSearchState"),
};

export const Default = Template.bind({});
(Default as any).args = {
  ...baseArgs,
};

export const NotEditor = Template.bind({});
(NotEditor as any).args = {
  ...baseArgs,
  isEditor: false,
};

export const Search = Template.bind({});
(Search as any).args = {
  ...baseArgs,
  isSearch: true,
};

export const Visibility = () => {
  const [show, setShow] = useState(true);

  const args = {
    ...baseArgs,
    isShow: show,
  };

  return (
    <>
      <PhotosToolBtns {...args} />
      <button onClick={() => setShow((prevShow) => !prevShow)}>
        Switch view
      </button>
    </>
  );
};
