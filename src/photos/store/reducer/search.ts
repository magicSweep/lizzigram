//import { ISearchState, ISearchAction } from "./../../types";
import { Reducer } from "redux";

export const searchInitialState: ISearchState = {
  tagsIds: [],
  yearsOld: -1,
  isSearch: false,
};

const isSearch = (state: ISearchState) => {
  return state.tagsIds.length > 0 || state.yearsOld !== -1;
};

const reducer: Reducer<ISearchState, ISearchAction> = (
  state = searchInitialState,
  action
) => {
  switch (action.type) {
    case "SET_SEARCH_STATE":
      if (!action.state) throw new Error("No search state on action");
      return {
        ...action.state,
        isSearch: isSearch(action.state),
      };

    case "RESET_SEARCH_STATE":
      return {
        ...searchInitialState,
      };

    default:
      return state;
  }
};

export default reducer;
