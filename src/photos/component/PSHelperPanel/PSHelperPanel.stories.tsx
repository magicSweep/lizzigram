import React from "react";
import PSHelperPanel from ".";
import { controller } from "./../../../component/ControlPanel/ControlPanel.stories";

export default {
  component: PSHelperPanel,
  title: "Panel/PSHelperPanel",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template = (args: any) => {
  return (
    <div style={{ position: "relative", width: "100%", height: "80vh" }}>
      <PSHelperPanel {...args} />
    </div>
  );
};

export const Default = Template.bind({});
(Default as any).args = {
  controller,
  onShowDesc: () => {},
  onZoomIn: () => {},
  onZoomOut: () => {},
  onCancel: () => {},
  maxZoom: 3,
  minZoom: 1,
  zoom: 2,
};
