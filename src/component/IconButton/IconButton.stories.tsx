import React from "react";
//import { action } from "@storybook/addon-actions";
import IconButton, { IIconButtonProps } from ".";
import PlusIcon from "../Icons/PlusIcon";
import SearchIcon from "../Icons/SearchIcon";

export default {
  component: IconButton,
  title: "Components/IconButton",
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

const Template = (args: IIconButtonProps) => <IconButton {...args} />;

export const SearchIconBtn = Template.bind({});

(SearchIconBtn as any).args = {
  ariaLabel: "Do something",
  //type: "CONTAINED",
  disabled: false,
  onClick: () => console.log("Click"),
  icon: <SearchIcon width={32} height={32} color="primary" />,
};

export const PlusIconBtn = Template.bind({});

(PlusIconBtn as any).args = {
  ariaLabel: "Do something",
  //type: "CONTAINED",
  disabled: false,
  onClick: () => console.log("Click"),
  icon: <PlusIcon width={32} height={32} color="primary" />,
};
