import React from "react";
//import { action } from "@storybook/addon-actions";
import ProgressIndicator from ".";

export default {
  component: ProgressIndicator,
  title: "Progress/ProgressIndicator",
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

const Template = (args: any) => <ProgressIndicator {...args} />;

export const Default = Template.bind({});

/* (Default as any).args = {
  variant: "rect",
}; */
