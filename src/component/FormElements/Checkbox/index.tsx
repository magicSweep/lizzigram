import React, { FC } from "react";
import classes from "./Checkbox.module.scss";

export interface ICheckboxProps {
  id: string;
  label: string;

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
  checked,
  disabled,
  inputRef,
  onChange,
}) => {
  let labelClasses = classes.label;

  if (disabled) labelClasses += ` ${classes["label--disabled"]}`;
  else if (checked) labelClasses += ` ${classes["label--checked"]}`;

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
