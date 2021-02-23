import React from "react";
//import { action } from "@storybook/addon-actions";
import Spinner from ".";
import Modal from "../Modal/Modal";

export default {
  component: Spinner,
  title: "Progress/Spinner",
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

const Template = (args: any) => <Spinner {...args} />;

Modal;

export const Default = Template.bind({});

export const Loadable = () => {
  return (
    <Modal type="slider" onClose={() => {}}>
      <Spinner />
    </Modal>
  );
};

/* (Default as any).args = {
  variant: "rect",
}; */
