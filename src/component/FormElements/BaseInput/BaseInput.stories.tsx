import React from "react";
//import { action } from "@storybook/addon-actions";
import BaseInput, { IBaseInputProps } from ".";

export default {
  component: BaseInput,
  title: "Form_Elements/BaseInput",
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

const Template = (args: IBaseInputProps) => <BaseInput {...args} />;

export const TextInput = Template.bind({});

(TextInput as any).args = {
  label: "Ваше имя:",
  id: "id1234",
  placeholder: "Миа Васиковски",
  name: "input",
  type: "text",
  inputRef: undefined,
  error: false,
  helperText: "",
  disabled: false,
};

export const DateInput = Template.bind({});

(DateInput as any).args = {
  label: "Когда сделан снимок:",
  id: "data1234",
  placeholder: "",
  name: "date-input",
  type: "date",
  inputRef: undefined,
  error: false,
  helperText: "Дата должна быть в формате гггг-мм-дд",
  disabled: false,
};

export const EmailInput = Template.bind({});

(EmailInput as any).args = {
  label: "Ваш электронный адрес:",
  id: "email1234",
  placeholder: "john-dow@mail.ru",
  name: "email-input",
  inputRef: undefined,
  type: "email",
  error: false,
  helperText: "",
  disabled: false,
};

export const PasswordInput = Template.bind({});

(PasswordInput as any).args = {
  label: "Пароль:",
  id: "password",
  placeholder: "**********",
  name: "pass-input",
  type: "password",
  inputRef: undefined,
  error: false,
  helperText: "",
  disabled: false,
};
