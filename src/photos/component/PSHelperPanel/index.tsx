import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { showPhotoDescAC } from "../../../store";
import PSHelperPanelWidget, { IPSHelperPanelProps } from "./PSHelperPanel";

const PSHelperPanel: FC<IPSHelperPanelProps> = (props) => {
  const dispatch = useDispatch();

  const showDesc = (event: any) => {
    event.stopPropagation();
    dispatch(showPhotoDescAC(props.activePhoto.id));
  };

  return <PSHelperPanelWidget showDesc={showDesc} {...props} />;
};

export default PSHelperPanel;
