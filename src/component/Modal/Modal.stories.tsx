import React, { useState } from "react";
//import { action } from "@storybook/addon-actions";
import Modal from ".";
import Spinner from "../Spinner";

export default {
  component: Modal,
  title: "Portals/Modal",
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

const Template = (args: any) => {
  const [show, setShow] = useState(false);

  console.log("[RENDER MODAL TEMPLATE]", args);

  return (
    <div>
      <button onClick={() => setShow(true)}>Show modal</button>
      <div style={{ height: "120vh" }}></div>
      {show && (
        <Modal onClose={() => setShow(false)} type={args.type}>
          {args.children}
        </Modal>
      )}
    </div>
  );
};

export const Centered = Template.bind({});

(Centered as any).args = {
  type: "form",
  children: (
    <div>
      <h4>Hello from Centered modal.</h4>
    </div>
  ),
};

export const Scrollable = Template.bind({});

(Scrollable as any).args = {
  type: "form",
  children: (
    <div style={{ height: "120vh" }}>
      <h4>Hello from Scrollable modal.</h4>
    </div>
  ),
};

export const SliderType = Template.bind({});

(SliderType as any).args = {
  type: "slider",
  children: (
    <div style={{ height: "100%", width: "100%", backgroundColor: "cyan" }}>
      <h4>Hello from SliderType modal.</h4>
    </div>
  ),
};

export const FormSpinnerType = Template.bind({});

(FormSpinnerType as any).args = {
  type: "form",
  children: (
    <div
      style={{
        position: "relative",
        padding: "25px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner />
    </div>
  ),
};

export const SliderSpinnerType = Template.bind({});

(SliderSpinnerType as any).args = {
  type: "slider",
  children: (
    <div
      style={{
        position: "relative",
        padding: "25px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner />
    </div>
  ),
};
