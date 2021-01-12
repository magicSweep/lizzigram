import React from "react";
//import { action } from "@storybook/addon-actions";
import IShimmer from ".";

export default {
  component: IShimmer,
  title: "Components/IShimmer",
  decorators: [
    (story: any) => (
      <div
        style={{
          width: "95%",
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

const Template = (args: any) => <IShimmer {...args} />;

export const Default = Template.bind({});
/* 
(Default as any).args = {
  label: "Небольшое необязательное описание:",
  id: "id1234",
  placeholder: "Жили были у бабуси...",
  name: "textarea",
  inputRef: undefined,
  error: false,
  helperText: "",
  disabled: false,
}; */
