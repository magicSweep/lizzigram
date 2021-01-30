import React, { FC } from "react";
import classes from "./Checkbox.module.scss";

export interface ICheckboxProps {
  id: string;
  label: string;
  type: TTagType;
  checked: boolean;
  inputRef?: any;
  name: string;
  disabled?: boolean;
  onChange: (event: any) => void;
}

const Checkbox: FC<ICheckboxProps> = ({
  id,
  label,
  name,
  type,
  checked,
  disabled,
  inputRef,
  onChange,
}) => {
  let labelClasses = classes.label;

  if (disabled) labelClasses += ` ${classes["label--disabled"]}`;
  else if (checked) {
    switch (type) {
      case "feeling":
        labelClasses += ` ${classes["label-info--checked"]}`;
        break;
      case "where":
        labelClasses += ` ${classes["label-warning--checked"]}`;
        break;
      case "withWho":
        labelClasses += ` ${classes["label-secondary--checked"]}`;
        break;

      default:
        throw new Error(`No implementation for type - ${type}`);
    }
  }

  return (
    <>
      <label className={labelClasses} htmlFor={id}>
        {`#${label}`}
      </label>
      <input
        className={classes.input}
        ref={inputRef}
        id={id}
        type={"checkbox"}
        onChange={onChange}
        name={name}
        checked={checked}
        disabled={disabled}
      />
    </>
  );
};

export default Checkbox;
