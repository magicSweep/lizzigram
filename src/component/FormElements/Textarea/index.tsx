import React, { FC } from "react";
import classes from "./Textarea.module.scss";
import { IInputProps } from "./../BaseInput";
import styles from "./../../../styles/classes.module.scss";

export interface ITextareaProps extends IInputProps {}

const Textarea: FC<ITextareaProps> = ({
  id,
  label,
  placeholder,
  name,
  inputRef,
  error,
  helperText,
  disabled,
}) => {
  let labelClasses = `${styles.labelFont} ${classes.label}`;
  let textareaClasses = `${styles.paragraph} ${classes.textarea}`;

  if (disabled) {
    labelClasses += ` ${styles.disabledColor}`;
    textareaClasses += ` ${styles.disabledBorder}`;
  }

  return (
    <div className={classes.root}>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>

      <textarea
        id={id}
        ref={inputRef}
        disabled={disabled}
        name={name}
        rows={3}
        placeholder={placeholder}
        className={textareaClasses}
      ></textarea>
    </div>
  );
};

export default Textarea;
