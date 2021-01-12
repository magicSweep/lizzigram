import React from "react";
//import { action } from "@storybook/addon-actions";
import HelperText, { IHelperTextProps } from ".";

export default {
  component: HelperText,
  title: "Form_Elements/HelperText",
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

const Template = (args: IHelperTextProps) => <HelperText {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  text: "All ok",
  error: false,
  disabled: false,
};
