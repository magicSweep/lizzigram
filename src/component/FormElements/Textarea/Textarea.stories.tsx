import React from "react";
//import { action } from "@storybook/addon-actions";
import Textarea, { ITextareaProps } from ".";

export default {
  component: Textarea,
  title: "Form_Elements/Textarea",
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
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

/* const Link = React.forwardRef((props, ref) => {
  return (
    <a href={props.to} ref={ref}>
      {props.children}
    </a>
  );
}); */

const Template = (args: ITextareaProps) => <Textarea {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  label: "Небольшое необязательное описание:",
  id: "id1234",
  placeholder: "Жили были у бабуси...",
  name: "textarea",
  inputRef: undefined,
  error: false,
  helperText: "",
  disabled: false,
};
