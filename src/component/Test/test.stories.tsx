import React from "react";
//import { action } from "@storybook/addon-actions";
import Test from ".";

export default {
  component: Test,
  title: "Test/Test",
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

const Template = (args: any) => <Test {...args} />;

export const Default = Template.bind({});
