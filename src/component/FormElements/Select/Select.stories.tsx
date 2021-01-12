import React from "react";
//import { action } from "@storybook/addon-actions";
import Select, { ISelectProps } from ".";

export default {
  component: Select,
  title: "Form_Elements/Select",
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

const Template = (args: ISelectProps) => <Select {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  label: "Возраст:",
  id: "select1234",
  value: "-1",
  onChange: (event: any) => console.log("change", event.target.value),
  name: "select-input",
  disabled: false,
  options: [
    { value: "-1", label: "Любой" },
    { value: "1", label: "1 год" },
    { value: "2", label: "2 года" },
  ],
};
