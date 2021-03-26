interface IPhotosToolBtnsProps {
  isEditor: boolean | undefined;
  isSearch: boolean;
  showAddPhotoForm: () => void;
  showSearchPhotoForm: () => void;
  resetSearchState: () => void;
}

interface IPhotosToolBtnsWidgetProps extends IPhotosToolBtnsProps {
  isShow: boolean;
}
