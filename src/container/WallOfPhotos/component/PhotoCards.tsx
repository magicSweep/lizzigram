import React, { FC, MouseEvent } from "react";
import PhotoCard from "../../../photos/component/PhotoCard";
import PhotoSkeletons, {
  getPhotoCardSkeleton,
} from "../../../fcomponent/PhotoSkeletons";

const PhotoCards: FC<IPhotoCardsProps> = ({
  photos,
  showPhotoSlider,
  showEditPhotoForm,
  showPhotoDesc,
  userUID,
  editedPhotoIds,
  numberOfAddedPhotos,
}) => {
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

  return (
    <>
      {numberOfAddedPhotos > 0 && (
        <PhotoSkeletons numberOfSkeletons={numberOfAddedPhotos} />
      )}
      {elements}
    </>
  );
};

export default PhotoCards;
