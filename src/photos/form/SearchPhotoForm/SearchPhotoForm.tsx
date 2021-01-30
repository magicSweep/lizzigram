import React from "react";
//import classes from './SearchPhotoForm.module.scss';
//import { makeStyles } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
/* import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";*/
//import Typography from "@material-ui/core/Typography";
import TagsCheckbox from "../../../component/FormElements/TagsCheckbox";
import { useSearchForm } from "./hook";
//import { IGlobalState, TTagsData } from "./../../../store/types";
//import { connect } from "react-redux";
//import { ISearchState } from "../../types";
//import AgeSlider from "../../../component/FormElements/AgeSlider";
//import AgeSelect from "../../../component/FormElements/AgeSelect";
import { searchPhotoFormTitle } from "../../../config";
//import { setSearchStateAC } from "../../store/action/search";
import { fromFormDataToState, makeOptionsForAgeSelect } from "./helper";
import classes from "./SearchPhotoForm.module.scss";
import Button from "../../../component/Button";
import Select from "../../../component/FormElements/Select";

interface SearchPhotoFormProps {
  state: ISearchState;
  tagsData: TTagsData | undefined;
  //onSetSearchState: Function;
  setSearchState: (state: ISearchState) => void | undefined;
}

const optionsInfo = makeOptionsForAgeSelect();

export const SearchPhotoForm = ({
  state,
  tagsData,
  setSearchState,
}: SearchPhotoFormProps) => {
  //const classes = useStyles();

  const {
    tagsProps,
    onAgeSelectChange,
    agesValue,
    handleSubmit,
    formErrors,
  } = useSearchForm(state, tagsData);

  const submit = handleSubmit((formData) => {
    const newSearchState = fromFormDataToState(formData);

    console.log("SUBMIT", newSearchState);

    setSearchState(newSearchState);
  });

  return (
    <form className={classes.root} onSubmit={submit}>
      {/* <h5 className={classes.title}>Поиск фотос по тэгам</h5> */}
      <h4 className={classes.title}>{searchPhotoFormTitle}</h4>

      <div className={classes.ages}>
        <Select
          label="Возраст Лизы на фото:"
          id="select-age-1234"
          value={agesValue}
          onChange={onAgeSelectChange}
          name="age"
          disabled={false}
          options={optionsInfo}
        />
      </div>

      <div className={classes.tags}>
        <TagsCheckbox
          label={"Выберите тэги:"}
          itemsState={tagsProps.tagsState}
          onChange={tagsProps.onTagsCheckboxChange}
          error={formErrors.tags}
          disabled={false}
        />
      </div>

      <div className={classes.submit}>
        <Button disabled={false} label="Искать" />
      </div>
    </form>
  );
};

export default SearchPhotoForm;
