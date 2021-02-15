import React from "react";
import ImgZoomControlPanel from ".";

export default {
  component: ImgZoomControlPanel,
  title: "Panel/ImgZoomControlPanel",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template = (args: any) => {
  return (
    <div style={{ padding: "20px", backgroundColor: "white" }}>
      <ImgZoomControlPanel {...args} />
    </div>
  );
};

export const Default = Template.bind({});
(Default as any).args = {
  onZoomIn: () => {},
  onZoomOut: () => {},
  onCancel: () => {},
  maxZoom: 3,
  minZoom: 1,
  zoom: 2,
};

export const Disabled = Template.bind({});
(Disabled as any).args = {
  onZoomIn: () => {},
  onZoomOut: () => {},
  onCancel: () => {},
  maxZoom: 1,
  minZoom: 1,
  zoom: 1,
};
