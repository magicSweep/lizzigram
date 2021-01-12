import React from "react";
//import { action } from "@storybook/addon-actions";
import CloseButton from ".";

export default {
  component: CloseButton,
  title: "Components/CloseButton",
  decorators: [
    (story: any) => (
      <div
        style={{
          width: "500px",
          height: "100px",
          margin: "auto",
          //paddingTop: "30px",
          backgroundColor: "cyan",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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

const Template = (args: any) => <CloseButton {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  ariaLabel: "Close something",
  //type: "CONTAINED",
  disabled: false,
  onClick: () => console.log("Click"),
};
