import React, { useContext } from "react";
//import { action } from "@storybook/addon-actions";
import { WindowScrollProvider, WindowScrollContext } from ".";

export default {
  component: WindowScrollProvider,
  title: "Provider/WindowScrollProvider",
  decorators: [
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
  ],
  excludeStories: /.*Data$/,
};

const Child = () => {
  const isShow = useContext(WindowScrollContext);

  //console.log("RENDER CHILD", isShow);

  return (
    <>
      <p
        style={{
          display: "block",
          position: "fixed",
          top: "40px",
          left: "50px",
        }}
      >
        Is show - {isShow ? "true" : "false"}
      </p>
      <div style={{ width: "600px", height: "2000px" }}></div>
    </>
  );
};

const Template = (args: any) => {
  return (
    <>
      <WindowScrollProvider>
        <Child />
        <Child />
      </WindowScrollProvider>
    </>
  );
};

export const Default = Template.bind({});
