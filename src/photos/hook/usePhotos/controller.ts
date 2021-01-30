import { isEqualSearchState } from "../utils";

export let prevSearchState: ISearchState;

export const isNeedNewRequest = (
  searchState: ISearchState,
  photoStateLoading: boolean
) => {
  const isNeed =
    (prevSearchState === undefined ||
      !isEqualSearchState(prevSearchState, searchState)) &&
    photoStateLoading !== true;

  prevSearchState = searchState;

  return isNeed;
};
