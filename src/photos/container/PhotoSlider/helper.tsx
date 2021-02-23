import React, { FC } from "react";
import FullScreenImage from "../../../component/ImageSharp/FullScreenImage";

export const getActivePhotoAndId = (
  photos: TPhotosData | undefined,
  activeIndex: number
): TPhotoData => {
  if (photos === undefined) throw new Error("No photos in photo state...");

  const photoIds = [...photos.keys()];

  const id = photoIds[activeIndex];

  return {
    id,
    photo: photos.get(id) as IPhoto,
  };
};

export const getImageSharp = (photo: TPhotoData, zoom: number) => {
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

  let itemContainerClasses = classes.itemContainer;
  if (zoom <= 1) itemContainerClasses += ` ${classes["itemContainer--flex"]}`;

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

  let elements: any = [];
  let i = 0;

  if (photos && loading) {
    //const iPhotos = [...photos.values()];

    photos.forEach((photo, id) => {
      const image = getImageSharp({ id, photo }, zoom);
      if (i === activeIndex) {
        console.log("CLASS", itemContainerClasses);

        elements.push(
          <div
            key={classes.root + photo.googleDriveId + id}
            className={itemContainerClasses}
          >
            {image}
            <div className={classes.loading}>
              <ISpinner />
            </div>
          </div>
        );
      } else {
        elements.push(
          <div
            key={classes.root + photo.aspectRatio + i}
            className={classes.itemContainer}
          >
            {image}
          </div>
        );
      }

      i++;
    });
  } else {
    photos.forEach((photo, id) => {
      const image = getImageSharp({ id, photo }, zoom);

      console.log("CLASS", itemContainerClasses);

      elements.push(
        <div
          key={classes.root + photo.aspectRatio + i}
          className={itemContainerClasses}
        >
          {image}
        </div>
      );

      i++;
    });
  }

  return elements;

  //const iPhotos = [...photos.values()];
};

/* export const getCarouselItems = (
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

  let itemContainerClasses = classes.itemContainer;
  if (zoom <= 1) itemContainerClasses += ` ${classes["itemContainer--flex"]}`;

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
        console.log("CLASS", itemContainerClasses);

        return (
          <div
            key={classes.root + photo.aspectRatio + index}
            className={itemContainerClasses}
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

    console.log("CLASS", itemContainerClasses);

    return (
      <div
        key={classes.root + photo.aspectRatio + index}
        className={itemContainerClasses}
      >
        {image}
      </div>
    );
  });
};
 */
