import React, { useState } from "react";
//import { action } from "@storybook/addon-actions";
import Portal from ".";

export default {
  component: Portal,
  title: "Portals/Portal",
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

export const Default = () => {
  const [state, setState] = useState({ show: false, type: "alert" });

  return (
    <div>
      <button onClick={() => setState({ show: true, type: "alert" })}>
        Show portal alert
      </button>
      <button onClick={() => setState({ show: true, type: "modal" })}>
        Show portal modal
      </button>
      <div></div>
      {state.show && (
        <Portal type={state.type as any}>
          <div
            style={{
              padding: "10px",
              width: "300px",
              border: "2px solid gray",
              borderRadius: "2px",
            }}
          >
            <h4>Hello from {state.type} portal.</h4>
            <button onClick={() => setState({ show: true, type: "alert" })}>
              Show portal alert
            </button>
            <button onClick={() => setState({ show: true, type: "modal" })}>
              Show portal modal
            </button>
            <button onClick={() => setState({ show: false, type: "" })}>
              Close
            </button>
          </div>
        </Portal>
      )}
    </div>
  );
};
