import { isSameArrayValues } from "../../../utils";

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

export const isEqualSearchState = (
  prevState: ISearchState,
  state: ISearchState
) => {
  if (prevState.yearsOld !== state.yearsOld) return false;

  if (!isSameArrayValues(prevState.tagsIds, state.tagsIds)) return false;

  return true;
};
