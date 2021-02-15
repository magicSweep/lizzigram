import React from "react";
//import { action } from "@storybook/addon-actions";
import IconButton, { IIconButtonProps } from ".";
import ArrowIcon from "../Icons/ArrowIcon";
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

export const ContainedBtn = (args: IIconButtonProps) => {
  return (
    <div
      style={{
        backgroundColor: "#ffe8e1",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        border: "2px solid black",
      }}
    >
      <IconButton
        ariaLabel="Do something"
        type="circle"
        disabled={false}
        onClick={() => console.log("Click")}
        icon={<SearchIcon width={32} height={32} color="primary" />}
      />
    </div>
  );
};

export const OutlinedBtn = (args: IIconButtonProps) => {
  return (
    <div
      style={{
        backgroundColor: "violet",
        width: "52px",
        height: "52px",
        borderRadius: "50%",
      }}
    >
      <IconButton
        ariaLabel="Do something"
        type="circle"
        disabled={false}
        onClick={() => console.log("Click")}
        icon={<SearchIcon width={32} height={32} color="primary" />}
      />
    </div>
  );
};

export const ArrowIconBtn = (args: IIconButtonProps) => {
  return (
    <div
      style={{
        backgroundColor: "#ffd0ff",
        width: "48px",
        height: "38px",
        border: "1px solid black",
        borderRadius: "2px",
      }}
    >
      <IconButton
        ariaLabel="Do something"
        type="box"
        disabled={false}
        onClick={() => console.log("Click")}
        icon={
          <ArrowIcon width={16} height={16} color="primary" direction="right" />
        }
      />
    </div>
  );
};

const Template = (args: IIconButtonProps) => <IconButton {...args} />;

export const SearchIconBtn = Template.bind({});

(SearchIconBtn as any).args = {
  ariaLabel: "Do something",
  type: "circle",
  disabled: false,
  onClick: () => console.log("Click"),
  icon: <SearchIcon width={32} height={32} color="primary" />,
};

export const PlusIconBtn = Template.bind({});

(PlusIconBtn as any).args = {
  ariaLabel: "Do something",
  type: "circle",
  disabled: true,
  onClick: () => console.log("Click"),
  icon: <PlusIcon width={32} height={32} color="secondary" />,
};

/* export const ArrowIconBtn = Template.bind({});

(ArrowIconBtn as any).args = {
  ariaLabel: "Do something",
  type: "box",
  disabled: false,
  onClick: () => console.log("Click"),
  icon: <ArrowIcon width={16} height={16} color="primary" direction="right" />,
}; */
