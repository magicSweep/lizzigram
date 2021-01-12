import React from "react";
//import { action } from "@storybook/addon-actions";
import Skeleton from ".";

export default {
  component: Skeleton,
  title: "Progress/Skeleton",
  decorators: [
    (story: any) => (
      <div
        style={{
          width: "300px",
          margin: "auto",
          paddingTop: "30px",
          backgroundColor: "white",
        }}
      >
        {story()}
      </div>
    ),
  ],
  excludeStories: /.*Data$/,
};

const Template = (args: any) => (
  <div style={args.style}>
    <Skeleton {...args} />
  </div>
);

export const Rect = Template.bind({});

(Rect as any).args = {
  variant: "rect",
  style: {
    width: "100%",
    height: "14px",
  },
};

export const Circle = Template.bind({});

(Circle as any).args = {
  variant: "circle",
  style: {
    width: "30px",
    height: "30px",
  },
};

export const Tag = Template.bind({});

(Tag as any).args = {
  variant: "tag",
  style: {},
};
