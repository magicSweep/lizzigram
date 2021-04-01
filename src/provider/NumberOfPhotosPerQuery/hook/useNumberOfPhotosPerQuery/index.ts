import { useContext, useEffect, useState } from "react";
import { WindowResizeContext } from "../../../WindowResizer";
import { calcPhotosLimitPerQuery } from "./helper";

export const useNumberOfPhotosPerQuery = () => {
  const [numberOfPhotosPerQuery, setNumberOfPhotosPerQuery] = useState<
    number | undefined
  >(undefined);

  const aspectRatio = useContext(WindowResizeContext);

  // calc and set limit
  useEffect(() => {
    const res = calcPhotosLimitPerQuery();
    setNumberOfPhotosPerQuery(
      res.numberOfElementsByHeight * res.numberOfElementsByWidth
    );
    console.log("-------CALC PHOTOS PER QUERY", res);
  }, [aspectRatio, numberOfPhotosPerQuery]);

  return numberOfPhotosPerQuery;
};
