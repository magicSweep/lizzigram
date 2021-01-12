import React from "react";
import WallOfPhotos from "./WallOfPhotos";
import { photosData } from "./../../photos/__mock/data";

export default {
  component: WallOfPhotos,
  title: "Photos/WallOfPhotos",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template = (args: any) => <WallOfPhotos {...args} />;

/* photos,
  loadMorePhotos,
  reLoadPhotos,
  hasNextPage,
  loading,
  error, */

export const Default = Template.bind({});
(Default as any).args = {
  photos: photosData,
  loading: false,
  hasNextPage: false,
  isSearch: false,
  loadMorePhotos: () => {},
  reLoadPhotos: () => {},
  error: false,
  showPhotoSlider: () => console.log("showPhotoSlider"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  userUID: "user13",
};

export const Loading = Template.bind({});
(Loading as any).args = {
  photos: undefined,
  loading: true,
  isSearch: false,
  hasNextPage: false,
  loadMorePhotos: () => {},
  reLoadPhotos: () => {},
  error: false,
  showPhotoSlider: () => console.log("showPhotoSlider"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
};

export const Error = Template.bind({});
(Error as any).args = {
  photos: undefined,
  loading: true,
  isSearch: false,
  hasNextPage: true,
  loadMorePhotos: () => {},
  reLoadPhotos: () => {},
  error: true,
  showPhotoSlider: () => console.log("showPhotoSlider"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
};

export const NoPhoto = Template.bind({});
(NoPhoto as any).args = {
  photos: undefined,
  loading: false,
  hasNextPage: false,
  isSearch: false,
  loadMorePhotos: () => {},
  reLoadPhotos: () => {},
  error: false,
  showPhotoSlider: () => console.log("showPhotoSlider"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
};

export const NoPhotoOnSearch = Template.bind({});
(NoPhotoOnSearch as any).args = {
  photos: undefined,
  loading: false,
  hasNextPage: false,
  isSearch: true,
  loadMorePhotos: () => {},
  reLoadPhotos: () => {},
  error: false,
  showPhotoSlider: () => console.log("showPhotoSlider"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
};
