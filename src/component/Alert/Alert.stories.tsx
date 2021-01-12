import { relative } from "path";
import React, { useState } from "react";
//import { action } from "@storybook/addon-actions";
import Alert from "./Alert";

export default {
  component: Alert,
  title: "Portals/Alert",
  /*  decorators: [
    (story: any) => (
      <div
        style={{
          width: "300px",
          margin: "auto",
          paddingTop: "30px",
          backgroundColor: "white",
        }}
      >
        {story()}
      </div>
    ),
  ], */
  excludeStories: /.*Data$/,
};

const Template = (props: any) => {
  const [show, setShow] = useState(false);

  console.log("[RENDER TEMPLATE]", props);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "300px",
          margin: "auto",
          paddingTop: "30px",
          backgroundColor: "white",
        }}
      >
        <button onClick={() => setShow(true)}>Show alert</button>
      </div>

      <div style={{ height: "120vh" }}></div>
      {show && (
        <div
          style={{
            position: "fixed",
            top: "50px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Alert
            type={props.type}
            onClose={() => setShow(false)}
            message={props.message}
          />
        </div>
      )}
    </div>
  );
};

export const Success = Template.bind({});

(Success as any).args = {
  type: "success",
  message: "Привет от алерта. Как поживаешь друг? Все ли у тебя хорошо?",
};

export const Error = Template.bind({});

(Error as any).args = {
  type: "error",
  message: "Большая жирная ошибка.",
};

export const Info = Template.bind({});

(Info as any).args = {
  type: "info",
  message: "Завтрак уже готов.",
};

export const Warning = Template.bind({});

(Warning as any).args = {
  type: "warning",
  message: "Не подходи.",
};

/* export const Scrollable = Template.bind({});

(Scrollable as any).args = {
  children: (
    <div style={{ height: "120vh" }}>
      <h4>Hello from modal.</h4>
    </div>
  ),
}; */
