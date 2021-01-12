import React from "react";
//import { action } from "@storybook/addon-actions";
import BtnWithMenu, { IBtnWithMenuProps } from ".";
import BtnWithIcon from "../BtnWithIcon";
import IconButton from "../IconButton";
import ArrowIcon from "../Icons/ArrowIcon";
import ExitIcon from "../Icons/ExitIcon";
import MoreIcon from "../Icons/MoreIcon";
import SmileIcon from "../Icons/SmileIcon";

export default {
  component: BtnWithMenu,
  title: "Components/BtnWithMenu",
  decorators: [
    (story: any) => (
      <div
        style={{
          width: "500px",
          height: "120vh",
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

const Template = (args: IBtnWithMenuProps) => (
  <BtnWithMenu {...args}>
    <BtnWithIcon
      iconStart={<ArrowIcon width={10} height={10} direction="right" />}
      label={"Влюбить"}
      ariaLabel={"Влюбить"}
      onClick={() => console.log("Logout")}
      disabled={false}
      fullWidth={true}
    />
    <BtnWithIcon
      iconStart={<ExitIcon width={14} height={14} />}
      label={"Выход"}
      ariaLabel={"Выход из аккаутна"}
      onClick={() => console.log("Logout")}
      disabled={false}
      fullWidth={true}
      color="secondary"
    />
  </BtnWithMenu>
);

export const Default = Template.bind({});

(Default as any).args = {
  menuButton: (
    <BtnWithIcon
      iconStart={<SmileIcon width={16} height={16} />}
      iconEnd={<ArrowIcon width={10} height={10} direction="down" />}
      label={"Тасик"}
      ariaLabel={"Меню пользователя"}
      onClick={undefined}
      disabled={false}
    />
  ),
  //type: "CONTAINED",
  disabled: false,
};

export const OnlyIcon = Template.bind({});

(OnlyIcon as any).args = {
  menuButton: (
    <IconButton
      icon={<MoreIcon width={20} height={20} />}
      ariaLabel={"Меню пользователя"}
      onClick={undefined}
      disabled={false}
    />
  ),
  //type: "CONTAINED",
  disabled: false,
};
