import React, { useMemo } from "react";

import CarouselOpacity from ".";
import { useCarouselOpacity } from "./hook";

export default {
  component: CarouselOpacity,
  title: "Carousel/ICarouselOpacity",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const getCarouselItems = () => {
  console.log("GET CarouselTranslate items");

  return [0, 1, 2, 3, 4].map((item, index) => {
    return (
      <div
        key={"hello" + item + index}
        style={{
          width: "700px",
          height: "330px",
          textAlign: "center",
          margin: "auto",
        }}
      >
        <h3>{`Item number ${index + 1}`}</h3>
      </div>
    );
  });
};

const items = [0, 1, 2, 3, 4];

export const Default = () => {
  const { controller } = useCarouselOpacity(items.length);

  const itemsElements = useMemo(getCarouselItems, [items]);

  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.05)",
          borderRadius: "5px",
          width: "700px",
          margin: "20px auto",
          padding: "20px",
        }}
      >
        <CarouselOpacity controller={controller}>
          {itemsElements}
        </CarouselOpacity>
      </div>
    </>
  );
};
