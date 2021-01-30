import React, { FC } from "react";
import Skeleton from "../../Skeleton";
import Checkbox from "../Checkbox";
//import { ITagsState } from "../../../store/types";
import classes from "./TagsCheckbox.module.scss";
import styles from "./../../../styles/classes.module.scss";
import HelperText from "../HelperText";
import TagsSkeletons from "../../../fcomponent/TagsSkeletons";
import { numberOfTags } from "../../../config";

export interface ITagsCheckboxProps {
  itemsState: any;
  onChange: any;
  disabled: boolean;
  error: any;
  label: string;
}

export interface ITagsCheckboxDataProps extends ITagsCheckboxProps {
  tagsState: ITagsState;
}

const _refSkeleton = <Skeleton variant="tag" />;

const TagSkeleton = () => _refSkeleton;

export const getCheckboxes = (
  handleChange: (event: any) => void,
  state: { [name: string]: boolean },
  tagsState: ITagsState,
  //tagsState: any,

  disabled: boolean
) => {
  console.log("[getCheckboxes]");
  if (
    tagsState.loading ||
    tagsState.error ||
    !state ||
    !tagsState.tags
    //state[items.keys()[0]] === undefined
  ) {
    //console.log("[getCheckboxes]", items ? items.keys() : "No");
    return <TagsSkeletons numberOfSkeletons={numberOfTags} />;
    /* return [1, 2, 3, 4, 5, 6, 7].map((value) => {
      return (
        <div key={classes.skeleton + value} className={classes.skeleton}>
          <TagSkeleton />
        </div>
      );
    }); */
  }

  if (tagsState.tags && tagsState.tags.size > 0) {
    const tagsElements: any[] = [];
    tagsState.tags.forEach((data: ICheckboxItemData, id: string) => {
      tagsElements.push(
        <div key={classes.container + id} className={classes.container}>
          <Checkbox
            label={data.title}
            id={id + data.name}
            type={data.type}
            checked={state[id]}
            onChange={handleChange}
            name={id}
            disabled={disabled}
          />
        </div>
      );
    });
    console.log("[getCheckboxes]", tagsElements.length);
    return tagsElements;
  }

  return undefined;
};

const TagsCheckbox: FC<ITagsCheckboxDataProps> = ({
  tagsState,
  itemsState,
  onChange,
  disabled,
  error,
  label,
}) => {
  let legendClasses = styles.labelFont;
  let fieldsetClasses = classes.fieldset;

  if (disabled) {
    legendClasses += ` ${styles.disabledColor}`;
    //fieldsetClasses += ` ${styles.disabledBorder}`;
  } else if (error) {
    legendClasses += ` ${styles.errorColor}`;
    fieldsetClasses += ` ${styles.errorBorder}`;
  }

  const checkboxes = getCheckboxes(onChange, itemsState, tagsState, disabled);

  console.log("[RENDER TAGS CHECKBOX WIDGET]", tagsState, itemsState);

  return (
    <div className={classes.root}>
      <fieldset className={fieldsetClasses}>
        <legend className={legendClasses}>{label}</legend>
        {checkboxes}
      </fieldset>
      <HelperText
        error={error ? true : false}
        disabled={disabled}
        text={error ? error.message : ""}
      />
    </div>
  );
};

export default TagsCheckbox;
