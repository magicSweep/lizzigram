import React, { FC } from "react";
import classes from "./BaseInput.module.scss";
import styles from "./../../../styles/classes.module.scss";
import HelperText from "./../HelperText";

export interface IInputProps {
  id: string;
  label: any;
  placeholder?: string;

  inputRef?: any;
  name: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export interface IBaseInputProps extends IInputProps {
  type: "date" | "text" | "password" | "email";
}

const BaseInput: FC<IBaseInputProps> = ({
  type,
  id,
  label,
  placeholder,
  name,
  inputRef,
  error,
  helperText,
  disabled,
}) => {
  //let helperClasses = "";
  let inputClasses = `${styles.paragraph} ${classes.input}`;
  let borderBottomClasses = classes.borderBottom;
  let labelClasses = `${styles.labelFont} ${classes.label}`;

  /* if (helperText) {
    if (error) {
      helperClasses = `${classes.message} ${classes.error}`;
    } else {
      helperClasses = `${classes.message} ${classes.helper}`;
    }
  } */

  if (disabled) {
    borderBottomClasses += ` ${styles.disabledBorderBottom}`;
    labelClasses += ` ${styles.disabledColor}`;
  } else if (error) {
    borderBottomClasses += ` ${styles.errorBorderBottom}`;
    labelClasses += ` ${styles.errorColor}`;
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <label className={labelClasses} htmlFor={id}>
          {label}
        </label>
        {/* <div className={classes.wrapper}> */}
        <input
          className={inputClasses}
          ref={inputRef}
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
        />
        <div className={borderBottomClasses}></div>
        {/*  </div> */}
      </div>

      <HelperText error={error} disabled={disabled} text={helperText} />
      {/* <div className={classes.description}>
        {helperText && (
          <div role="alert">
            <p className={helperClasses}>
              <span>{helperText}</span>
            </p>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default BaseInput;

/* const Input = () => {
  const onDateChange = (event: any) => {
    console.log("onDateChange", event.target.value);
  };

  return (
    <>
      <label htmlFor="input1">Date</label>
      <input
        id="input1"
        onChange={onDateChange}
        type="date"
        max="2020-12-23"
        min="2018-07-08"
      />
      <br />

      <label htmlFor="input4">Color</label>
      <input id="input4" type="color" />
      <br />

      <label htmlFor="input5">Range</label>
      <input id="input5" type="range" />
      <br />
    </>
  );
};

export default Input;
 */
