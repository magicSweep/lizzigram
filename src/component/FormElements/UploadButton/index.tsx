import React, { FC } from "react";
import classes from "./UploadButton.module.scss";
import styles from "./../../../styles/classes.module.scss";
import HelperText from "./../HelperText";
import { IInputProps } from "./../BaseInput";

export interface IUploadButtonProps extends IInputProps {}

const UploadButton: FC<IUploadButtonProps> = ({
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
  let svgClasses = classes.svg;
  let buttonClasses = classes.button;

  if (disabled) {
    //labelClasses += ` ${classes["label--disabled"]}`;
    buttonClasses += ` ${classes["button--disabled"]}`;
    labelClasses += ` ${styles.disabledColor}`;
    svgClasses += ` ${classes["svg--disabled"]}`;
  } else if (error) {
    buttonClasses += ` ${styles.errorBorder}`;
    labelClasses += ` ${styles.errorColor}`;
    svgClasses += ` ${classes["svg--error"]}`;
  }

  console.log("[RENDER UPLOAD BUTTON]", error, disabled);

  return (
    <>
      <input
        accept="image/*"
        ref={inputRef}
        name={name}
        className={classes.input}
        id={id}
        type="file"
        disabled={disabled}
      />
      <label htmlFor={id} className={buttonClasses}>
        <svg className={svgClasses} width={22} height={22} viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
        </svg>

        <span className={labelClasses}>{label}</span>
      </label>

      <HelperText error={error} disabled={disabled} text={helperText} />
    </>
  );
};

export default UploadButton;
