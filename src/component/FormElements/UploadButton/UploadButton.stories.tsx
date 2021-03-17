import React, { MutableRefObject, useRef } from "react";
//import { action } from "@storybook/addon-actions";
import image3 from "./../../../static/ladki.jpg";
import UploadButton from ".";

export default {
  component: UploadButton,
  title: "Form_Elements/UploadButton",
  decorators: [
    (story: any) => (
      <div
        style={{
          position: "relative",
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

const dataTransfer = new DataTransfer();
const file = new File(["h", "e", "l"], "text.txt");
dataTransfer.items.add(file);

const fileList = dataTransfer.files;

const Template = (args: any) => <UploadButton {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  id: "uploadid123",
  label: "Добавить фото",
  name: "super-upload",
  error: false,
  helperText: "",
  disabled: false,
};

export const WithFileList = Template.bind({});

(WithFileList as any).args = {
  id: "uploadid123",
  label: "Добавить фото",
  name: "super-upload",
  fileList,
  error: false,
  helperText: "",
  disabled: false,
};

export const Error = Template.bind({});

(Error as any).args = {
  id: "uploadid123",
  label: "Добавить фото",
  name: "super-upload",
  error: true,
  helperText: "Big fat error",
  disabled: false,
};

export const Test = () => {
  const inputRef: MutableRefObject<any> = useRef();

  console.log("[RENDER TEST UPLOAD BTN]", inputRef);

  return (
    <div style={{ position: "relative" }}>
      <button
        style={{
          position: "relative",
          display: "block",
          width: "100px",
          height: "32px",
          backgroundColor: "cyan",
        }}
        onClick={() => console.log("button click")}
      >
        <label
          onClick={() => console.log("onClick")}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "block",
            width: "100%",
            height: "100%",
            opacity: 0,
            //backgroundColor: "cyan",
          }}
          htmlFor="input-file"
        >
          Label
        </label>
        Label
      </button>

      <input
        ref={(ref) => {
          inputRef.current = ref;
        }}
        style={{ display: "none" }}
        type="file"
        id="input-file"
      />
    </div>
  );
};
