import React from "react";
import { useNumberOfPhotosPerQuery } from "./hook/useNumberOfPhotosPerQuery";
import { NumberOfPhotosPerQueryContext } from "./context";

const NumberOfPhotosPerQueryProvider = ({ children }: any) => {
  const numberOfPhotosPerQuery = useNumberOfPhotosPerQuery();

  return (
    <NumberOfPhotosPerQueryContext.Provider value={numberOfPhotosPerQuery}>
      {children}
    </NumberOfPhotosPerQueryContext.Provider>
  );
};

export default NumberOfPhotosPerQueryProvider;
