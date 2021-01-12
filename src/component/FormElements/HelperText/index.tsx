import React, { FC } from "react";
import classes from "./HelperText.module.scss";
import styles from "./../../../styles/classes.module.scss";

export interface IHelperTextProps {
  error?: boolean;
  text?: string;
  disabled?: boolean;
}

const HelperText: FC<IHelperTextProps> = ({ error, text, disabled }) => {
  let helperClasses = "";

  if (text) {
    if (disabled) {
      helperClasses = `${classes.message} ${styles.disabledColor}`;
    } else if (error) {
      helperClasses = `${classes.message} ${styles.errorColor}`;
    } else {
      helperClasses = `${classes.message} ${classes.helper}`;
    }
  }

  return (
    <div className={classes.root}>
      {text && (
        <div role="alert">
          <p className={helperClasses}>
            <span>{text}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default HelperText;
