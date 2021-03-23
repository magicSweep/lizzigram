import React, { FC } from "react";
import FullScreenImage from "../../../component/ImageSharp/FullScreenImage";
import Spinner from "../../../component/Spinner";

export const isEditedReq = (photoReq: IPhotoReq) => {
  return (
    photoReq.type === "edit" &&
    photoReq.isEditFile &&
    photoReq.status.stage !== "done"
  );
};

export const makeEditedPhotoIds = (requests: TPhotoReqs) => {
  const editedPhotoIds: string[] = [];

  if (requests.size === 0) return [];

  requests.forEach((photoReq, reqId) => {
    if (isEditedReq(photoReq)) {
      editedPhotoIds.push(reqId);
    }
  });

  //console.log("MAKE EDITED PHOTO IDS", editedPhotoIds);

  return editedPhotoIds;
};

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
  //console.log("[PHOTO SLIDER] GET IMAGE SHARP");
  return (
    <FullScreenImage
      zoom={zoom}
      photo={photo}
      isActive={true}
      alt="Зали что-то делает..."
    />
  );
};

export const getImageSharpElement = (
  photo: TPhotoData,
  zoom: number,
  classes: any,
  itemContainerClasses: any,
  isSpinner: boolean,
  isSpinnerText: boolean
) => {
  return (
    <div key={`${classes.root}_${photo.id}`} className={itemContainerClasses}>
      <FullScreenImage
        zoom={isSpinner ? 1 : zoom}
        photo={photo}
        isActive={true}
        alt="Зали что-то делает..."
      />
      {isSpinner && (
        <div className={classes.loading}>
          <Spinner />
          {isSpinnerText && <p className={classes.text}>Ждемс перемен...</p>}
        </div>
      )}
    </div>
  );
};

export const getCarouselItems = (
  //ISpinner: FC,
  zoom: number,
  photos: TPhotosData,
  loading: boolean,
  error: boolean,
  activeIndex: number,
  classes: any,
  editedPhotoIds: string[]
) => {
  //console.log("[PHOTO SLIDER] GET CAROUSEL ITEMS", activeIndex);

  //if data === undefined and loading - show loading
  //if data === undefined and error - show null
  //else - show items

  let itemContainerClasses = classes.itemContainer;
  if (zoom <= 1) itemContainerClasses += ` ${classes["itemContainer--flex"]}`;

  // IF INFO ABOUT PHOTOS DO NOT LOADING FROM SERVER WE SHOW SPINNER
  if (!photos && loading) {
    return [
      <div className={classes.itemContainer} key="loading">
        <Spinner />
      </div>,
    ];
  }

  // IF INFO ABOUT PHOTOS DO NOT LOADING CAUSE OF ERROR
  if (!photos && error) {
    return [<div key="error"></div>];
  }

  let elements: any = [];
  let i = 0;

  let imageElement: JSX.Element;

  // IF WE GET PHOTOS AND LOADING IT MEANS WE START LOAD MORE PHOTOS REQUEST
  if (photos && loading) {
    //const iPhotos = [...photos.values()];

    photos.forEach((photo, id) => {
      //const image = getImageSharp({ id, photo }, zoom);
      if (i === activeIndex) {
        //console.log("CLASS", itemContainerClasses);

        // USER CAN NOT USE ZOOM
        itemContainerClasses += ` ${classes["itemContainer--flex"]}`;

        imageElement = getImageSharpElement(
          { id, photo },
          zoom,
          classes,
          itemContainerClasses,
          true,
          false
        );

        //elements.push(imageElement);
      } else {
        imageElement = getImageSharpElement(
          { id, photo },
          zoom,
          classes,
          itemContainerClasses,
          false,
          false
        );

        //elements.push(imageElement);
      }

      elements.push(imageElement);

      i++;
    });
    // IF WE GET PHOTOS
  } else {
    photos.forEach((photo, id) => {
      //const image = getImageSharp({ id, photo }, zoom);

      //console.log("CLASS", itemContainerClasses);

      /*    elements.push(
        <div
          key={classes.root + photo.aspectRatio + i}
          className={itemContainerClasses}
        >
          {image}
        </div>
      ); */

      // IF WE GET PHOTOS THAT IS CHANGING AT THIS TIME WE SHOW SPINNER WITH TEXT ABOVE IT
      if (editedPhotoIds.length > 0 && editedPhotoIds.includes(id)) {
        // USER CAN NOT USE ZOOM
        itemContainerClasses += ` ${classes["itemContainer--flex"]}`;

        imageElement = getImageSharpElement(
          { id, photo },
          zoom,
          classes,
          itemContainerClasses,
          true,
          true
        );

        /*  elements.push(
          <div
            key={classes.root + photo.aspectRatio + i}
            className={itemContainerClasses}
          >
            {image}
            <div className={classes.loading}>
              <ISpinner />
              <p className={classes.text}>Ждемс перемен...</p>
            </div>
          </div>
        ); */
      } else {
        imageElement = getImageSharpElement(
          { id, photo },
          zoom,
          classes,
          itemContainerClasses,
          false,
          false
        );

        /*   elements.push(
          <div
            key={classes.root + photo.aspectRatio + i}
            className={itemContainerClasses}
          >
            {image}
          </div>
        ); */
      }

      elements.push(imageElement);

      i++;
    });
  }

  console.log("[PHOTO SLIDER] GET CAROUSEL ITEMS", elements);

  return elements;

  //const iPhotos = [...photos.values()];
};
