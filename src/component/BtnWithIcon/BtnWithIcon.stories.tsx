import React from "react";
//import { action } from "@storybook/addon-actions";
import BtnWithIcon, { IBtnWithIconProps } from ".";
import ArrowIcon from "../Icons/ArrowIcon";
import DownloadIcon from "../Icons/DownloadIcon";
import ExitIcon from "../Icons/ExitIcon";
import SmileIcon from "../Icons/SmileIcon";

export default {
  component: BtnWithIcon,
  title: "Components/BtnWithIcon",
  decorators: [
    (story: any) => (
      <div
        style={{
          width: "500px",
          margin: "auto",
          padding: "30px",
          backgroundColor: "black",
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

const Template = (args: IBtnWithIconProps) => <BtnWithIcon {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  iconStart: <SmileIcon width={16} height={16} />,
  iconEnd: <ArrowIcon width={10} height={10} direction="down" />,
  label: "Тасик Власова",
  ariaLabel: "Меню пользователя",
  //type: "CONTAINED",
  disabled: false,
  onClick: () => console.log("Click"),
};

export const StartIcon = Template.bind({});

(StartIcon as any).args = {
  iconStart: <ExitIcon width={14} height={14} />,
  label: "Выход",
  ariaLabel: "Меню пользователя",
  //type: "CONTAINED",
  disabled: false,
  onClick: () => console.log("Click"),
  fullWidth: true,
  color: "secondary",
};

export const EndIcon = Template.bind({});

(EndIcon as any).args = {
  iconEnd: <ArrowIcon width={10} height={10} direction="down" />,
  label: "Тасик Власова",
  ariaLabel: "Меню пользователя",
  //type: "CONTAINED",
  disabled: true,
  onClick: () => console.log("Click"),
};

export const Link = Template.bind({});

(Link as any).args = {
  iconStart: <DownloadIcon width={20} height={20} />,
  label: "Скачать оригинальный файл",
  ariaLabel: "Скачать оригинальный файл фото",
  href: "https://google.com",
  //type: "CONTAINED",
};

export const InputLabel = () => {
  return (
    <>
      <input type="file" id="hello-file" style={{ display: "none" }} />
      <BtnWithIcon
        iconStart={<SmileIcon width={24} height={24} />}
        label="Добавить файл"
        ariaLabel="Меню пользователя"
        //type: "CONTAINED",
        disabled={false}
        onClick={() => console.log("Click")}
        htmlFor="hello-file"
      />
    </>
  );
};

/* import React from "react";
//import { action } from "@storybook/addon-actions";
import BtnWithIcon, { IBtnWithIconProps } from ".";
import smileIcon from "./../../static/smile.svg";

export default {
  component: BtnWithIcon,
  title: "Components/BtnWithIcon",
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
}); /

const Template = (args: IBtnWithIconProps) => <BtnWithIcon {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  iconStart: (
    <svg viewBox="0 0 24 24">
      <circle cx="15.5" cy="9.5" r="1.5"></circle>
      <circle cx="8.5" cy="9.5" r="1.5"></circle>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-4c-.73 0-1.38-.18-1.96-.52-.12.14-.86.98-1.01 1.15.86.55 1.87.87 2.97.87 1.11 0 2.12-.33 2.98-.88-.97-1.09-.01-.02-1.01-1.15-.59.35-1.24.53-1.97.53z"></path>
    </svg>
  ),
  iconEnd: (
    <svg viewBox="0 0 24 24">
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  ),
  label: "Тасик Власова",
  ariaLabel: "Меню пользователя",
  //type: "CONTAINED",
  disabled: false,
  onClick: () => console.log("Click"),
};

export const StartIcon = Template.bind({});

(StartIcon as any).args = {
  iconStart: (
    <svg viewBox="0 0 24 24">
      <circle cx="15.5" cy="9.5" r="1.5"></circle>
      <circle cx="8.5" cy="9.5" r="1.5"></circle>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-4c-.73 0-1.38-.18-1.96-.52-.12.14-.86.98-1.01 1.15.86.55 1.87.87 2.97.87 1.11 0 2.12-.33 2.98-.88-.97-1.09-.01-.02-1.01-1.15-.59.35-1.24.53-1.97.53z"></path>
    </svg>
  ),
  label: "Тасик Власова",
  ariaLabel: "Меню пользователя",
  //type: "CONTAINED",
  disabled: false,
  onClick: () => console.log("Click"),
};

export const EndIcon = Template.bind({});

(EndIcon as any).args = {
  iconEnd: (
    <svg viewBox="0 0 24 24">
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  ),
  label: "Тасик Власова",
  ariaLabel: "Меню пользователя",
  //type: "CONTAINED",
  disabled: false,
  onClick: () => console.log("Click"),
};
 */
