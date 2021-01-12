import React, { useState } from "react";
import TagsSkeletons from ".";

export default {
  component: TagsSkeletons,
  title: "Progress/TagsSkeletons",
  decorators: [
    (story: any) => (
      <div
        style={{
          width: "90%",
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

export const Default = Template.bind({});
(Default as any).args = {
  numberOfSkeletons: 4,
};
