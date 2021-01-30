//import { IModalState, IAlertState, ITagsState } from "./types";
/* import { IPhotosState, ISearchState } from "./../photos/types";
import { Action, Reducer } from "redux";
import { Color } from "@material-ui/lab/Alert";
import { IAuthState } from "./../auth/types";
import { TPhotoData } from "./../photos/types";
import { ICheckboxItemData } from "./../component/FormElements/TagsCheckbox"; */

interface IGlobalState {
  modal: IModalState;
  alert: IAlertState;
  auth: IAuthState;
  tags: ITagsState;
  photos: IPhotosState;
  search: ISearchState;
}

// ACTIONS TYPES

type TAlertActionTypes = "SHOW_ALERT" | "HIDE_ALERT";

type TModalActionTypes =
  // | "SHOW_LOGIN_FORM"
  | "SHOW_ADD_FORM"
  | "SHOW_EDIT_FORM"
  | "SHOW_PHOTO_SLIDER"
  | "SHOW_SEARCH_FORM"
  // | "SHOW_FORGET_PASS_FORM"
  //  | "HIDE_LOGIN_FORM"
  | "HIDE_ADD_FORM"
  | "HIDE_EDIT_FORM"
  | "HIDE_PHOTO_SLIDER"
  | "HIDE_SEARCH_FORM";
// | "HIDE_FORGET_PASS_FORM"

type TTagsActionTypes =
  | "TAGS_REQUEST"
  | "TAGS_REQUEST_SUCCESS"
  | "TAGS_REQUEST_ERROR";

// STATE INTERFACE

interface IAlertState {
  isShow: boolean;
  type: TAlertType;
  message: string;
}

interface IModalState {
  openSlider: boolean;
  openEditForm: boolean;
  openAddForm: boolean;
  //openLoginForm: boolean;
  openSearch: boolean;
  // openForgetPassForm: boolean;
  initActiveIndex: number;
  photo: TPhotoData | undefined;
}

type TTagType = "where" | "withWho" | "feeling";

interface ICheckboxItemData {
  //_id: string;
  title: string;
  name: string;
  type: TTagType;
}

type TTagsData = Map<string, ICheckboxItemData>;

type TTagsFirestoreResponse = {
  data: () => ICheckboxItemData;
  id: string;
};

interface ITagsState {
  tags: TTagsData | undefined;
  loading: boolean;
  error: boolean;
}

// ACTIONS
type TAlertType = "error" | "success" | "info" | "warning";

interface IAlertAction extends Action<TAlertActionTypes> {
  type: TAlertActionTypes;
  alertType?: TAlertType;
  message?: string;
}

interface IModalAction extends Action<TModalActionTypes> {
  type: TModalActionTypes;
  photo?: TPhotoData;
  initActiveIndex?: number;
}

interface ITagsAction extends Action<TTagsActionTypes> {
  type: TTagsActionTypes;
  tags?: TTagsData;
}
