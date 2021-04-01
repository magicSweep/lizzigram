import React, { FC } from "react";
import { NumberOfPhotosPerQueryProvider } from "../../NumberOfPhotosPerQuery";
import { WindowResizeProvider } from "../../WindowResizer";
import { WindowScrollProvider } from "../../WindowScroller";

export interface IProvidersProps {
  children: any;
}

const Providers: FC<IProvidersProps> = ({ children }) => {
  return (
    <WindowScrollProvider>
      <WindowResizeProvider>
        <NumberOfPhotosPerQueryProvider>
          {children}
        </NumberOfPhotosPerQueryProvider>
      </WindowResizeProvider>
    </WindowScrollProvider>
  );
};

export default Providers;
