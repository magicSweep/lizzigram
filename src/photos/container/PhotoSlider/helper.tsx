import React, { FC } from "react";
import FullScreenImage from "../../../component/ImageSharp/FullScreenImage";

export const getImageSharp = (photo: IPhoto, zoom: number) => {
  return (
    <FullScreenImage
      zoom={zoom}
      photo={photo}
      isActive={true}
      alt="Зали что-то делает..."
    />
  );
};

export const getCarouselItems = (
  ISpinner: FC,
  zoom: number,
  photos: TPhotosData,
  loading: boolean,
  error: boolean,
  activeIndex: number,
  classes: any
) => {
  console.log("[PHOTO SLIDER] GET CAROUSEL ITEMS", activeIndex);

  //if data === undefined and loading - show loading
  //if data === undefined and error - show null
  //else - show items

  if (!photos && loading) {
    return [
      <div className={classes.itemContainer} key="loading">
        <ISpinner />
      </div>,
    ];
  }

  if (!photos && error) {
    return [<div key="error"></div>];
  }

  if (photos && loading) {
    const iPhotos = [...photos.values()];

    return iPhotos.map((photo, index) => {
      const image = getImageSharp(photo, zoom);
      if (index === activeIndex) {
        return (
          <div
            key={classes.root + photo.aspectRatio + index}
            className={classes.itemContainer}
          >
            {image}
            <div className={classes.loading}>
              <ISpinner />
            </div>
          </div>
        );
      }
      return (
        <div
          key={classes.root + photo.aspectRatio + index}
          className={classes.itemContainer}
        >
          {image}
        </div>
      );
    });
  }

  const iPhotos = [...photos.values()];

  return iPhotos.map((photo, index) => {
    const image = getImageSharp(photo, zoom);
    return (
      <div
        key={classes.root + photo.aspectRatio + index}
        className={classes.itemContainer}
      >
        {image}
      </div>
    );
  });
};
