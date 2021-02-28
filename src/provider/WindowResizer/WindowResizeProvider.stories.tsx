import React, { useContext } from "react";
//import { action } from "@storybook/addon-actions";
import { WindowResizeProvider, WindowResizeContext } from ".";

export default {
  component: WindowResizeProvider,
  title: "Provider/WindowResizeProvider",
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
  const resized = useContext(WindowResizeContext);

  console.log("RENDER CHILD", resized);

  return <p>Resized - {resized}</p>;
};

const Template = (args: any) => {
  return (
    <>
      <WindowResizeProvider>
        <Child />
        <Child />
      </WindowResizeProvider>
    </>
  );
};

export const Default = Template.bind({});
