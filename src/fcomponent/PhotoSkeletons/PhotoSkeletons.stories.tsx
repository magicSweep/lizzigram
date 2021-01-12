import React, { useState } from "react";
import PhotoSkeletons from ".";

export default {
  component: PhotoSkeletons,
  title: "Progress/PhotoSkeletons",
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

const Template = (args: any) => <PhotoSkeletons {...args} />;

export const Default = Template.bind({});
(Default as any).args = {
  numberOfSkeletons: 4,
};
