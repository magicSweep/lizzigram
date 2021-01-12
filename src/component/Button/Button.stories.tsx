import React from "react";
//import { action } from "@storybook/addon-actions";
import Button, { IButtonProps } from ".";

export default {
  component: Button,
  title: "Components/Button",
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

const Template = (args: IButtonProps) => <Button {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  label: "Привет кнопка",
  ariaLabel: "Do something",
  //type: "CONTAINED",
  disabled: false,
  onClick: () => console.log("Click"),
};
