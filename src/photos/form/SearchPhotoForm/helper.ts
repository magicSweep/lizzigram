import { lizzyYearsOld } from "../../../config";
//import { ISearchFormData, ISearchState } from "./../../types";
import { millisecondsToYears } from "./../../../utils";
import { IOption } from "./../../../component/FormElements/Select";

let birthday = new Date(2018, 7, 8);

export const fromFormDataToState = (
  formData: ISearchFormData
): ISearchState => {
  // get tagsIds
  const tagsIds = [];

  for (let id in formData.tags) {
    if (formData.tags[id] === true) {
      tagsIds.push(id);
    }
  }

  const state: ISearchState = {
    tagsIds,
    yearsOld: formData.ages,
    isSearch: false,
  };

  return state;
};

export const makeOptionsForAgeSelect = () => {
  const options: IOption[] = [{ value: "-1", label: "Любой" }];

  for (let i = 0; i <= lizzyYearsOld; i++) {
    switch (i) {
      case 0:
        options.push({ value: "0", label: "Меньше года" });
        break;
      case 1:
        options.push({ value: "1", label: "1 год" });
        break;
      case 2:
        options.push({ value: "2", label: "2 года" });
        break;
      case 3:
        options.push({ value: "3", label: "3 года" });
        break;
      case 4:
        options.push({ value: "4", label: "4 года" });
        break;
      case 5:
        options.push({ value: "5", label: "5 лет" });
        break;
      case 6:
        options.push({ value: "6", label: "6 лет" });
        break;
      case 7:
        options.push({ value: "7", label: "7 лет" });
        break;
      case 8:
        options.push({ value: "8", label: "8 лет" });
        break;
      case 9:
        options.push({ value: "9", label: "9 лет" });
        break;
      case 10:
        options.push({ value: "10", label: "10 лет" });
        break;
      case 11:
        options.push({ value: "11", label: "11 лет" });
        break;
      case 12:
        options.push({ value: "12", label: "12 лет" });
        break;
      case 13:
        options.push({ value: "13", label: "13 лет" });
        break;
      case 14:
        options.push({ value: "14", label: "14 лет" });
        break;
      case 15:
        options.push({ value: "15", label: "15 лет" });
        break;
      case 16:
        options.push({ value: "16", label: "16 лет" });
        break;

      default:
        throw new Error(`No implementation or bad data | ${i}`);
    }
  }

  return options;
};

/* export const fromFormDataToState = (
  formData: ISearchFormData
): ISearchState => {
  // get tagsIds
  const tagsIds = [];

  for (let id in formData.tags) {
    if (formData.tags[id] === true) {
      tagsIds.push(id);
    }
  }

  // get minDate
  let minDate = undefined;
  if (formData.ages[0] === 0) minDate = undefined;
  else {
    minDate = new Date(birthday);
    minDate = new Date(
      minDate.setFullYear(minDate.getFullYear() + formData.ages[0])
    );
  }

  // get maxDate
  let maxDate = undefined;
  if (formData.ages[1] === lizzyYearsOld) maxDate = undefined;
  else {
    maxDate = new Date(birthday);
    maxDate = new Date(
      maxDate.setFullYear(maxDate.getFullYear() + formData.ages[1] + 1)
    );
  }

  const state: ISearchState = {
    tagsIds,
    minDate,
    maxDate,
    orderBy: formData.isSortDesc ? "desc" : "",
  };

  return state;
};

export const fromStateToFormData = (
  state: ISearchState
): { ages: number[]; isSortDesc: boolean } => {
  // get minAge
  let minAge = 0;
  if (state.minDate === undefined) minAge = 0;
  else {
    minAge = millisecondsToYears(state.minDate.getTime() - birthday.getTime());
  }

  // get maxAge
  let maxAge = 0;
  if (state.maxDate === undefined) maxAge = lizzyYearsOld;
  else {
    maxAge =
      millisecondsToYears(state.maxDate.getTime() - birthday.getTime()) - 1;
  }

  if (minAge > maxAge || maxAge > lizzyYearsOld)
    throw new Error(`Bad ages - ${minAge}, ${maxAge}`);

  return {
    ages: [minAge, maxAge],
    isSortDesc: state.orderBy === "desc" ? true : false,
  };
};
 */
