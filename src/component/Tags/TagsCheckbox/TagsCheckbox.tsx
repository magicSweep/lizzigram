import React, { FC } from "react";
import Skeleton from "../../Skeleton";
import Checkbox from "../Checkbox";
//import { ITagsState } from "../../../store/types";
import classes from "./TagsCheckbox.module.scss";
import styles from "./../../../styles/classes.module.scss";
import HelperText from "../../FormElements/HelperText";
import TagsSkeletons from "../TagsSkeletons";
import { numberOfTags } from "../../../config";
import commonClasses from "./../classes.module.scss";
import TagsError from "../TagsError";

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

export const getCheckboxes = (
  handleChange: (event: any) => void,
  state: { [name: string]: boolean },
  tagsState: ITagsState,
  //tagsState: any,
  error: boolean,
  disabled: boolean
) => {
  console.log("[getCheckboxes]");

  if (tagsState.error) {
    return <TagsError />;
  }

  if (
    tagsState.loading ||
    //tagsState.error ||
    !state ||
    !tagsState.tags
    //state[items.keys()[0]] === undefined
  ) {
    //console.log("[getCheckboxes]", items ? items.keys() : "No");
    return (
      <ul className={commonClasses.tagsContainer}>
        <TagsSkeletons type="checkbox" />
      </ul>
    );
  }

  if (tagsState.tags && tagsState.tags.size > 0) {
    const feelingTagsElements: any[] = [];
    const withWhoTagsElements: any[] = [];
    const whereTagsElements: any[] = [];

    tagsState.tags.forEach((data: ICheckboxItemData, id: string) => {
      let element = (
        <div key={commonClasses.tag + id} className={commonClasses.tag}>
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
      switch (data.type) {
        case "feeling":
          feelingTagsElements.push(element);
          break;
        case "where":
          whereTagsElements.push(element);
          break;
        case "withWho":
          withWhoTagsElements.push(element);
          break;

        default:
          throw new Error(`No implementation for tag type - ${data.type}`);
      }
    });

    console.log("[getCheckboxes]");

    let containerClasses = commonClasses.tagsContainer;

    if (error) {
      containerClasses += ` ${styles.errorBorder}`;
    }

    let titleClasses = `${classes.title}`;

    if (disabled) titleClasses += ` ${styles.disabledColor}`;

    return (
      <div className={containerClasses}>
        <h3 className={`${styles.primaryColor} ${titleClasses}`}>
          Настроение:
        </h3>
        <ul className={classes.container}>{feelingTagsElements}</ul>
        <h3 className={`${styles.secondaryColor} ${titleClasses}`}>С кем:</h3>
        <ul className={classes.container}>{withWhoTagsElements}</ul>
        <h3 className={`${styles.warningColor} ${titleClasses}`}>Где:</h3>
        <ul className={classes.container}>{whereTagsElements}</ul>
      </div>
    );
    //return tagsElements;
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
  let legendClasses = `${styles.labelFont} ${commonClasses.title}`;
  let fieldsetClasses = commonClasses.tagsWrapper;

  if (disabled) {
    legendClasses += ` ${styles.disabledColor}`;
    //fieldsetClasses += ` ${styles.disabledBorder}`;
  } else if (error) {
    legendClasses += ` ${styles.errorColor}`;
    //fieldsetClasses += ` ${styles.errorBorder}`;
  }

  const checkboxes = getCheckboxes(
    onChange,
    itemsState,
    tagsState,
    error ? true : false,
    disabled
  );

  console.log("[RENDER TAGS CHECKBOX WIDGET]", tagsState, itemsState);

  return (
    <div>
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
