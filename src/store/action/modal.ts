//import { TPhotoData } from "./../../photos/types";
//import { IModalAction } from "../types";

//SHOW
/* export const showLoginFormAC = (): IModalAction => {
  return {
    type: "SHOW_LOGIN_FORM",
  };
}; */

export const showAddFormAC = (): IModalAction => {
  return {
    type: "SHOW_ADD_FORM",
  };
};

export const showPhotoDescAC = (
  photo: TPhotoData | undefined
): IModalAction => {
  return {
    type: "SHOW_PHOTO_DESC",
    photo,
  };
};

export const showEditFormAC = (photo: TPhotoData | undefined): IModalAction => {
  return {
    type: "SHOW_EDIT_FORM",
    photo,
  };
};

export const showSearchFormAC = (): IModalAction => {
  return {
    type: "SHOW_SEARCH_FORM",
  };
};

export const showPhotoSliderAC = (
  photo: TPhotoData,
  initActiveIndex: number
): IModalAction => {
  return {
    type: "SHOW_PHOTO_SLIDER",
    photo,
    initActiveIndex,
  };
};

/* export const showForgetPassFormAC = (): IModalAction => {
  return {
    type: "SHOW_FORGET_PASS_FORM",
  };
}; */

//HIDE
/* export const hideLoginFormAC = (): IModalAction => {
  return {
    type: "HIDE_LOGIN_FORM",
  };
}; */

export const hidePhotoDescAC = (): IModalAction => {
  return {
    type: "HIDE_PHOTO_DESC",
  };
};

export const hideAddFormAC = (): IModalAction => {
  return {
    type: "HIDE_ADD_FORM",
  };
};

export const hideEditFormAC = (): IModalAction => {
  return {
    type: "HIDE_EDIT_FORM",
  };
};

export const hideSearchFormAC = (): IModalAction => {
  return {
    type: "HIDE_SEARCH_FORM",
  };
};

export const hidePhotoSliderAC = (): IModalAction => {
  return {
    type: "HIDE_PHOTO_SLIDER",
  };
};

/* export const hideForgetPassFormAC = (): IModalAction => {
  return {
    type: "HIDE_FORGET_PASS_FORM",
  };
};
 */
