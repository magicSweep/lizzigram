interface ILoadMoreBtnProps {
  photos: TPhotosData | undefined;
  hasNextPage: boolean;
  onLoadMore: any;
  error: any;
  loading: boolean;
}

interface IPhotoCardsProps {
  photos: TPhotosData;
  showPhotoSlider: (event: MouseEvent<any>) => void;
  showEditPhotoForm: (photo: TPhotoData) => void;
  showPhotoDesc: (photo: TPhotoData) => void;
  userUID: string;
  editedPhotoIds: string[];
  numberOfAddedPhotos: number;
}
