import React, { FC } from "react";
import { IInputProps } from "./../BaseInput";
import classes from "./Select.module.scss";
import styles from "./../../../styles/classes.module.scss";

export interface IOption {
  value: string;
  label: string;
}

export interface ISelectProps extends IInputProps {
  options: IOption[];
  value: any;
  onChange: (event: any) => void;
}

const getOptions = (options: IOption[]) => {
  return options.map((option, index) => {
    //let selected = (value !== '') ? option.value === value : option.selected;

    return (
      <option value={option.value} key={option.value + index}>
        {option.label}
      </option>
    );
  });
};

const Select: FC<ISelectProps> = ({
  options,
  id,
  label,
  placeholder,
  name,
  inputRef,
  error,
  helperText,
  disabled,
  value,
  onChange,
}) => {
  //let selectClasses = `${styles.paragraph} ${classes.select}`;
  let selectClasses = classes.select;
  let labelClasses = `${styles.labelFont} ${classes.label}`;

  if (disabled) {
    selectClasses += ` ${styles.disabledBorder} ${styles.disabledColor} ${styles.disabledCursor}`;
    labelClasses += ` ${styles.disabledColor}`;
  }

  const optionsElements = getOptions(options);

  return (
    <div className={classes.root}>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>

      <select
        className={selectClasses}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {optionsElements}
      </select>
    </div>
  );
};

export default Select;
