import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { showPhotoDescAC } from "../../../store";
import PSHelperPanelWidget, { IPSHelperPanelProps } from "./PSHelperPanel";

const PSHelperPanel: FC<IPSHelperPanelProps> = (props) => {
  const dispatch = useDispatch();

  const showDesc = () => dispatch(showPhotoDescAC(props.activePhoto));

  return <PSHelperPanelWidget showDesc={showDesc} {...props} />;
};

export default PSHelperPanel;
