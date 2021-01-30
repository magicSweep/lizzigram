import React from "react";
//import { action } from "@storybook/addon-actions";
import NotAuth from "./NotAuth";

export default {
  component: NotAuth,
  title: "Components/NotAuth",
  /* decorators: [
    (story: any) => (
      <div
        style={{
          width: "95%",
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

const Template = (args: any) => <NotAuth {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  isAuth: false,
  loading: false,
};

export const Loading = Template.bind({});

(Loading as any).args = {
  isAuth: false,
  loading: true,
};

export const Auth = Template.bind({});

(Auth as any).args = {
  isAuth: true,
  loading: true,
};
