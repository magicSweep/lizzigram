import React from "react";
import FullScreenImage from ".";
import { useImgZoom } from "../../../hooks/useImgZoom";
import ImgZoomControlPanel from "../../ImgZoomControlPanel";
import image3 from "./../../../static/ladki.jpg";
import imageLizzySad from "./../../../../../../../Project/lizzygram/backend/src/sharp/images/liza_sad_wallpaper.png";
//Liza_firstWeek
import imageLizzyFirstWeek from "./../../../../../../../Project/lizzygram/backend/src/sharp/images/Liza_firstWeek.png";
import { WindowResizeProvider } from "../../../provider/WindowResizer";

export default {
  component: FullScreenImage,
  title: "Image/FullScreenImage",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const photo = {
  base64:
    "/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAfADIDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAABQYAAwcCBP/EAC0QAAEDAgQDBwUBAAAAAAAAAAEAAgMEEQUSITEGFJEVIjJBQlNhE1JUgZKC/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AHhs0R2lYf8AQXedn3N6rGxV1INxPJ/SsGIVlrczJ1Qa+ZYxvI0ftcGrpwdZo/6WTTz1bS3NUvdmF9HK2mpqqpjfL9VwYze7jqgbeL3NquVEb2yR5u8AbojgtXQ0eHtiNQxtjsTskQPnfFkiORvydVTJh8viMjdflBp/a1B+VH1UWV8k/wB1vVRA4RcEU3rmcV6W8FUAGrnFH43iytDkC/JwbQvAs5wI2QnGMMGD0zmUxMl+8+/kE7km2m6XpRzEldT1IvKGE3G1kCJK/S40vsvbhrKScOZUylj/AEoXUPOfJ5NJAVbnEkfCA72XB7wUQgTPt4iog//Z",
  src: imageLizzyFirstWeek,
  srcSet: imageLizzyFirstWeek,
  //sizes="(max-aspect-ratio: 16/10) 100vw, 160vh"
  isActive: true,
  aspectRatio: 1.78,
};

const Template = (args: any) => (
  <WindowResizeProvider>
    <FullScreenImage {...args} />
  </WindowResizeProvider>
);

const baseArgs = {
  //wrapperAspectRatio: 1.75,
  isActive: true,
  alt: "alt",
};

export const Default = Template.bind({});
(Default as any).args = {
  ...baseArgs,
  zoom: 1,
  photo: { id: "boom", photo },
};

export const OnlyBase64 = Template.bind({});
(OnlyBase64 as any).args = {
  ...baseArgs,
  zoom: 1,
  photo: { id: "hello1243", photo: { ...photo, src: "", srcSet: "" } },
};

export const WithZoom = () => {
  const { zoomIn, zoomOut, cancel, maxZoom, minZoom, zoom } = useImgZoom();

  console.log("RENDER WITH ZOOM", zoom);

  return (
    <WindowResizeProvider>
      <div style={{ position: "relative" }}>
        <FullScreenImage
          alt="photo"
          photo={{ id: "boom", photo } as any}
          zoom={zoom}
        />

        <div
          style={{
            width: "100%",
            height: "0",
            position: "fixed",
            bottom: "60px",
          }}
        >
          <ImgZoomControlPanel
            onCancel={cancel}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            zoom={zoom}
            maxZoom={maxZoom}
            minZoom={minZoom}
          />
        </div>
      </div>
    </WindowResizeProvider>
  );
};
