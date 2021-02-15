import React from "react";
import ControlPanel from ".";

export default {
  component: ControlPanel,
  title: "Panel/ControlPanel",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const controller = {
  activeIndex: 1,
  itemsLength: 3,
  onFetchMore: undefined,
  onMouseDown: () => {},
  onTouchStart: () => {},
  onTouchEnd: () => {},
  onIncreaseIndex: () => {},
  onDecreaseIndex: () => {},
};

const Template = (args: any) => {
  return (
    <div style={{ padding: "20px", backgroundColor: "black" }}>
      <ControlPanel {...args} />
    </div>
  );
};

export const Default = Template.bind({});
(Default as any).args = {
  controller,
};

export const PrevBtnDisabled = Template.bind({});
(PrevBtnDisabled as any).args = {
  controller: { ...controller, activeIndex: 0 },
};

export const NextBtnDisabled = Template.bind({});
(NextBtnDisabled as any).args = {
  controller: { ...controller, activeIndex: 2 },
};
