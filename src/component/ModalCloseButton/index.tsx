import React from "react";
import IconButton from "../IconButton";
import CloseIcon from "../Icons/CloseIcon";
import classes from "./ModalCloseButton.module.scss";

interface ModalCloseButtonProps {
  onClick: (event: any) => void | undefined;
  color: TColorProp;
  ariaLabel: string;
}

/* const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "0",
    right: "0",
    zIndex: 1315,
  },
}); */

const ModalCloseButton = ({
  onClick,
  color,
  ariaLabel,
}: ModalCloseButtonProps) => {
  //const classes = useStyles();
  return (
    <div className={classes.root}>
      <IconButton
        icon={<CloseIcon width={16} height={16} color={color} />}
        onClick={onClick}
        ariaLabel={ariaLabel}
      />
    </div>
  );
};

export default ModalCloseButton;
