//import { ISearchState, ISearchAction } from "../../types";

export const setSearchStateAC = (state: ISearchState): ISearchAction => {
  return {
    type: "SET_SEARCH_STATE",
    state,
  };
};

export const resetSearchStateAC = (): ISearchAction => {
  return {
    type: "RESET_SEARCH_STATE",
  };
};
