import React, { FC, MouseEvent } from "react";
//import { TTagsData } from "../../store/types";
//import { TPhotosData } from "./../../photos/types";
import classes from "./WallOfPhotos.module.scss";
import { limitPhotosPerQuery as limit } from "../../config";
import PhotoCard from "./../../photos/component/PhotoCard";
import PhotoSkeletons, {
  getPhotoCardSkeleton,
} from "../../fcomponent/PhotoSkeletons";

//import styles from "./../../../styles/classes.module.scss";
import Button from "../../component/Button";

export interface IWallOfPhotosProps {
  photos: TPhotosData | undefined;
  loadMorePhotos: () => void;
  reLoadPhotos: () => void;
  hasNextPage: boolean;
  loading: boolean;
  //addPhotoLoading: boolean;
  // requests - photos that is changing at this time
  editedPhotoIds: string[];
  // requests - photos that been added at this time
  numberOfAddedPhotos: number;
  error: boolean;
  isSearch: boolean;
  showPhotoSlider: (event: any) => void;
  showEditPhotoForm: (photo: TPhotoData) => void;
  showPhotoDesc: (photo: TPhotoData) => void;
  userUID: string;
}

const getPhotosElements = (
  photos: TPhotosData,
  showPhotoSlider: (event: MouseEvent<any>) => void,
  showEditPhotoForm: (photo: TPhotoData) => void,
  showPhotoDesc: (photo: TPhotoData) => void,
  userUID: string,
  editedPhotoIds: string[]
) => {
  const elements: any[] = [];
  let index = 0;

  photos.forEach((photo, id) => {
    if (editedPhotoIds.length > 0 && editedPhotoIds.includes(id)) {
      let skel = getPhotoCardSkeleton();
      elements.push(skel);
    } else {
      elements.push(
        <PhotoCard
          key={id}
          isEditable={userUID === photo.addedByUserUID}
          photo={{ id, photo }}
          onImageClick={showPhotoSlider}
          showEditPhotoForm={showEditPhotoForm}
          showPhotoDesc={showPhotoDesc}
          index={index}
          alt="Лиза что-то делает"
        />
      );
    }

    index++;
  });

  return elements;
};

const getLoadMoreButton = (
  photos: TPhotosData | undefined,
  hasNextPage: boolean,
  onLoadMore: any,
  error: any,
  loading: boolean
) => {
  if (error || loading) return null;

  if (!photos && !loading) return null;

  if (photos && !hasNextPage) return null;

  return (
    <div className={classes.fetchMore}>
      <Button onClick={onLoadMore} label="Загрузить еще..." />
    </div>
  );
};

export const WallOfPhotos: FC<IWallOfPhotosProps> = ({
  photos,
  loadMorePhotos,
  reLoadPhotos,
  hasNextPage,
  loading,
  //addPhotoLoading,
  editedPhotoIds,
  numberOfAddedPhotos,
  error,
  isSearch,
  showEditPhotoForm,
  showPhotoDesc,
  showPhotoSlider,
  userUID,
}) => {
  //const classes = useStyles();

  let content = undefined;

  console.log(
    "[RENDER WALL_OF_PHOTS WIDGET]",
    photos,
    isSearch,
    loading,
    error
  );

  if (error) {
    content = (
      <div className={classes.error}>
        <p className={classes.msg}>Какая-то ошибка при загрузке фото...</p>
        <Button onClick={reLoadPhotos} label="Попробовать еще раз" />
      </div>
    );
  } else if (loading) {
    if (photos) {
      //const skeletons = getSkeletons(limit);
      const photosElements = getPhotosElements(
        photos,
        showPhotoSlider,
        showEditPhotoForm,
        showPhotoDesc,
        userUID,
        editedPhotoIds
      );

      //content = photosElements.concat(skeletons);
      content = (
        <>
          {photosElements}
          <PhotoSkeletons numberOfSkeletons={limit} />
        </>
      );
    } else {
      content = <PhotoSkeletons numberOfSkeletons={limit} />;
      //content = getSkeletons(limit);
    }
  } else {
    if (photos === undefined) {
      return null;
    } else if (photos.size > 0) {
      content = getPhotosElements(
        photos,
        showPhotoSlider,
        showEditPhotoForm,
        showPhotoDesc,
        userUID,
        editedPhotoIds
      );
    } else {
      if (isSearch) {
        content = (
          <>
            <p className={classes.message}>
              Нет ни одной фоты, подходящей под такие параметры поиска...
            </p>
          </>
        );
      } else {
        content = (
          <>
            <p className={classes.message}>У нас пока нет ни одной фоты...</p>
          </>
        );
      }
    }
  }

  const loadMoreButton = getLoadMoreButton(
    photos,
    hasNextPage,
    loadMorePhotos,
    error,
    loading
  );

  //const photoElements = getPhotos(photos, loading, error, onImgClick, limit);

  if (numberOfAddedPhotos > 0 && Array.isArray(content)) {
    const skel = getPhotoCardSkeleton();
    for (let i = 0; i < numberOfAddedPhotos; i++) content.unshift(skel);
  }

  return (
    <>
      <div className={classes.root}>{content}</div>
      {loadMoreButton}
    </>
  );
};

export default WallOfPhotos;
