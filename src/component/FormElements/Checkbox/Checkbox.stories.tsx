import React from "react";
//import { action } from "@storybook/addon-actions";
import Checkbox, { ICheckboxProps } from ".";

export default {
  component: Checkbox,
  title: "Form_Elements/Checkbox",
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

const Template = (args: ICheckboxProps) => <Checkbox {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  label: "на природе",
  id: "checkbox1234",
  checked: false,
  onChange: (event: any) => console.log("change"),
  name: "checkbox-input",
  disabled: false,
};
