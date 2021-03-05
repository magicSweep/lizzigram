import React, { useState } from "react";
import TagsSkeletons from ".";

export default {
  component: TagsSkeletons,
  title: "Tags/TagsSkeletons",
  decorators: [
    (story: any) => (
      <div
        style={{
          width: "600px",
          margin: "auto",
          paddingTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {story()}
      </div>
    ),
  ],
  excludeStories: /.*Data$/,
};

const Template = (args: any) => <TagsSkeletons {...args} />;

export const Desc = Template.bind({});
(Desc as any).args = {
  type: "desc",
};

export const Checkbox = Template.bind({});
(Checkbox as any).args = {
  type: "checkbox",
};
