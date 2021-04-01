import { useDispatch, useSelector, shallowEqual, batch } from "react-redux";
import { resetSearchStateAC } from "../../store/action/search";
import {
  addPhotoAnotherFormAC,
  editPhotoAnotherFormAC,
} from "../../store/action/photos";
//import { IGlobalState } from "./../../../store/types";
import {
  showAddFormAC,
  hideAddFormAC,
  hideEditFormAC,
  hidePhotoSliderAC,
  showSearchFormAC,
  hideSearchFormAC,
  hidePhotoDescAC,
} from "./../../../store";

//import { IAuthUser } from "./../../../types";
//import { TPhotoData } from "./../../types";

/* const mapStateToProps = (state: IGlobalState) => {
  return {
    authUser: state.auth.user,
    authLoading: state.auth.loading,
    isShowAddPhotoForm: state.modal.openAddForm,
    isShowEditPhotoForm: state.modal.openEditForm,
    isShowSearchPhotoForm: state.modal.openSearch,
  };
};

 */

export const usePhotoContainer = () => {
  const dispatch = useDispatch();

  const {
    //authUser,
    //authLoading,
    isShowSlider,
    isSearch,
    isShowAddPhotoForm,
    isShowEditPhotoForm,
    isShowSearchPhotoForm,
    isShowPhotoSlider,
    isShowPhotoDesc,
  } = useSelector<
    IGlobalState,
    {
      //authUser: IAuthUser;
      //authLoading: boolean;
      isShowSlider: boolean;
      isSearch: boolean;
      isShowAddPhotoForm: boolean;
      isShowEditPhotoForm: boolean;
      isShowSearchPhotoForm: boolean;
      isShowPhotoSlider: boolean;
      isShowPhotoDesc: boolean;
    }
  >(
    (state) => ({
      //authUser: state.auth.user,
      //authLoading: state.auth.loading,
      isShowSlider: state.modal.openSlider,
      isSearch: state.search.isSearch,
      isShowAddPhotoForm: state.modal.openAddForm,
      isShowEditPhotoForm: state.modal.openEditForm,
      isShowSearchPhotoForm: state.modal.openSearch,
      isShowPhotoSlider: state.modal.openSlider,
      isShowPhotoDesc: state.modal.openDescPhoto,
    }),
    shallowEqual
  );

  const showAddPhotoForm = () => {
    dispatch(showAddFormAC());
  };
  /* const showEditPhotoForm = (photo: TPhotoData) =>
    dispatch(showEditFormAC(photo)); */
  const showSearchPhotoForm = () => {
    dispatch(showSearchFormAC());
  };

  const hideAddPhotoForm = () => {
    batch(() => {
      dispatch(addPhotoAnotherFormAC());
      dispatch(hideAddFormAC());
    });
  };
  const hideEditPhotoForm = () => {
    batch(() => {
      dispatch(editPhotoAnotherFormAC());
      dispatch(hideEditFormAC());
    });
  };
  //hidePhotoSliderAC
  const hideSearchPhotoForm = () => {
    dispatch(hideSearchFormAC());
  };
  const hidePhotoSlider = () => {
    dispatch(hidePhotoSliderAC());
  };

  const hidePhotoDesc = () => {
    dispatch(hidePhotoDescAC());
  };

  const resetSearchState = () => {
    dispatch(resetSearchStateAC());
  };

  return {
    //authUser,
    //authLoading,
    isSearch,
    isShowAddPhotoForm,
    isShowEditPhotoForm,
    isShowSearchPhotoForm,
    isShowPhotoSlider,
    isShowPhotoDesc,
    isShowSlider,

    showAddPhotoForm,
    //showEditPhotoForm,
    showSearchPhotoForm,
    hideAddPhotoForm,
    hideEditPhotoForm,
    hideSearchPhotoForm,
    hidePhotoSlider,
    hidePhotoDesc,
    resetSearchState,
  };
};
