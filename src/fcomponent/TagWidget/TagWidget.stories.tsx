import React from "react";
//import { action } from "@storybook/addon-actions";
import TagWidget, { ITagWidgetProps } from ".";

export default {
  component: TagWidget,
  title: "Component/TagWidget",
  decorators: [
    (story: any) => (
      <div
        style={{
          width: "500px",
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

const Template = (args: ITagWidgetProps) => <TagWidget {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  label: "на природе",
  color: "secondary",
};
