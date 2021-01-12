//import { TAGS_STATE } from "../../component/FormElements/TagsCheckbox/helper";

export const makeTagsFormProps = (
  setValue: any,
  clearError: any,
  watch: any
) => {
  // tagsState = { tag_id: boolean } - in input checkbox we use name={tag._id}

  const tagsState: { tag_id: boolean } = watch("tags");

  const onTagsCheckboxChange = (event: any) => {
    console.log("handleDateChange", event.target.name);
    const newState = {
      ...tagsState,
      [event.target.name]: event.target.checked,
    };
    clearError("tags");
    setValue("tags", newState);
  };

  /* const setTagsInitState = (initState: TAGS_STATE) =>
    setValue("tags", initState); */

  /* const { data: tagsData, loading: tagsLoading, error: queryError } = useTags(
      initState => setValue("tags", initState),
      defaultTagsIds
    ); */

  return {
    onTagsCheckboxChange,
    tagsState,
    //setTagsInitState,
    /*  tagsData, 
        tagsLoading, 
        queryError  */
  };
};

export const makeDatePickerFormProps = (
  setValue: any,
  clearError: any,
  watch: any
) => {
  const onDateChange = (date: Date) => {
    console.log("onDateChange", date);
    setValue("date", date);
    clearError("date");
  };

  const dateValue: Date = watch("date");

  return { onDateChange, dateValue };
};

export const getInitTagsState = (
  //setInitState: (initState: TTagsFormState) => void | undefined,
  tagsData?: TTagsData,
  defaultTagsIds?: string[]
) => {
  if (tagsData) {
    const initState: TTagsFormState = {};
    const length = defaultTagsIds ? defaultTagsIds.length : 0;
    let tagsMarked = 0;
    tagsData.forEach((tagData, id) => {
      if (length > 0 && tagsMarked < length) {
        if (defaultTagsIds && defaultTagsIds.includes(id)) {
          initState[id] = true;
          tagsMarked++;
        } else {
          initState[id] = false;
        }
      } else {
        initState[id] = false;
      }
    });
    //console.log("TAGS DEFAULT STATE", initState);
    //setInitState(initState);
    return initState;
  }
};
