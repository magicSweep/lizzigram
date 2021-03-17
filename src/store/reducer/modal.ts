import { Reducer } from "redux";
//import { IModalState, IModalAction } from "./../types";

const modalInitialState: IModalState = {
  openSlider: false,
  openEditForm: false,
  openAddForm: false,
  openDescPhoto: false,
  //openLoginForm: false,
  openSearch: false,
  //openForgetPassForm: false,
  initActiveIndex: 0,
  photoId: "",
  //photo: undefined,
};

const reducer: Reducer<IModalState, IModalAction> = (
  state = modalInitialState,
  action: IModalAction
) => {
  switch (action.type) {
    case "SHOW_PHOTO_SLIDER":
      if (action.initActiveIndex === undefined)
        throw new Error("No initActiveIndex on SHOW_PHOTO_SLIDER");
      return {
        ...state,
        openSlider: true,
        //photo: action.photo,
        //photoId: action.photoId,
        initActiveIndex: action.initActiveIndex,
      };

    case "HIDE_PHOTO_SLIDER":
      return {
        ...state,
        openSlider: false,
      };

    case "SHOW_PHOTO_DESC":
      if (!action.photoId) throw new Error("No photoId on SHOW_PHOTO_DESC");
      return {
        ...state,
        openDescPhoto: true,
        //photo: action.photo,
        photoId: action.photoId,
      };

    case "HIDE_PHOTO_DESC":
      return {
        ...state,
        openDescPhoto: false,
      };

    /*  case "SHOW_LOGIN_FORM":
      return {
        ...state,
        openLoginForm: true,
      };

    case "HIDE_LOGIN_FORM":
      return {
        ...state,
        openLoginForm: false,
      }; */

    case "SHOW_ADD_FORM":
      return {
        ...state,
        openAddForm: true,
      };

    case "HIDE_ADD_FORM":
      return {
        ...state,
        openAddForm: false,
      };

    case "SHOW_EDIT_FORM":
      if (!action.photoId) throw new Error("No photoId on SHOW_PHOTO_DESC");

      return {
        ...state,
        //photo: action.photo,
        photoId: action.photoId,
        openEditForm: true,
      };

    case "HIDE_EDIT_FORM":
      return {
        ...state,
        openEditForm: false,
      };

    case "SHOW_SEARCH_FORM":
      return {
        ...state,
        openSearch: true,
      };

    case "HIDE_SEARCH_FORM":
      return {
        ...state,
        openSearch: false,
      };

    default:
      return state;
  }
};

export default reducer;
