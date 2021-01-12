import React from "react";

import Tabs from ".";

export default {
  component: Tabs,
  title: "Components/Tabs",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template = (args: any) => (
  <Tabs {...args}>
    <div>
      <p>Hello from first tab</p>
    </div>
    <div>
      <p>Hello from second tab</p>
    </div>
  </Tabs>
);

export const Default = Template.bind({});
(Default as any).args = {
  titles: ["Ras", "Dvas"],
};
