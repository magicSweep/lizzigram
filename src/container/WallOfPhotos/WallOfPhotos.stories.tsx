import React from "react";
import WallOfPhotos, { IWallOfPhotosProps } from "./WallOfPhotos";
import { photosData } from "./../../photos/__mock/data";

export default {
  component: WallOfPhotos,
  title: "Photos/WallOfPhotos",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template = (args: IWallOfPhotosProps) => <WallOfPhotos {...args} />;

/* photos,
  loadMorePhotos,
  reLoadPhotos,
  hasNextPage,
  loading,
  error, */

type D<T> = {
  args: T;
};

export const Default: D<IWallOfPhotosProps> = Template.bind({}) as any;
Default.args = {
  photos: photosData,
  loading: false,
  hasNextPage: false,
  isSearch: false,
  loadMorePhotos: () => {},
  reLoadPhotos: () => {},
  error: false,
  showPhotoSlider: () => console.log("showPhotoSlider"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  showPhotoDesc: () => console.log("showPhotoDesc"),
  userUID: "user13",
};

export const Loading: D<IWallOfPhotosProps> = Template.bind({}) as any;
Loading.args = {
  photos: undefined,
  loading: true,
  isSearch: false,
  hasNextPage: false,
  loadMorePhotos: () => {},
  reLoadPhotos: () => {},
  error: false,
  showPhotoSlider: () => console.log("showPhotoSlider"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  showPhotoDesc: () => console.log("showPhotoDesc"),
  userUID: "",
};

export const Error: D<IWallOfPhotosProps> = Template.bind({}) as any;
Error.args = {
  photos: undefined,
  loading: true,
  isSearch: false,
  hasNextPage: true,
  loadMorePhotos: () => {},
  reLoadPhotos: () => {},
  error: true,
  showPhotoSlider: () => console.log("showPhotoSlider"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  showPhotoDesc: () => console.log("showPhotoDesc"),
  userUID: "",
};

export const NoPhoto: D<IWallOfPhotosProps> = Template.bind({}) as any;
NoPhoto.args = {
  photos: new Map(),
  loading: false,
  hasNextPage: false,
  isSearch: false,
  loadMorePhotos: () => {},
  reLoadPhotos: () => {},
  error: false,
  showPhotoSlider: () => console.log("showPhotoSlider"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  showPhotoDesc: () => console.log("showPhotoDesc"),
  userUID: "",
};

export const NoPhotoOnSearch: D<IWallOfPhotosProps> = Template.bind({}) as any;
NoPhotoOnSearch.args = {
  photos: new Map(),
  loading: false,
  hasNextPage: false,
  isSearch: true,
  loadMorePhotos: () => {},
  reLoadPhotos: () => {},
  error: false,
  showPhotoSlider: () => console.log("showPhotoSlider"),
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  showPhotoDesc: () => console.log("showPhotoDesc"),
  userUID: "",
};
