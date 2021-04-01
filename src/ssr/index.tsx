import React from "react";
//import ReactDOM from "react-dom";
import { renderToString } from "react-dom/server";
import ErrorBoundary from "./../component/ErrorBoundary";
import App from "./../container/App";

import { createStore, combineReducers } from "redux";
import { Provider as ReduxProvider } from "react-redux";
//import thunk from "redux-thunk";

//import { initApp } from "./firebase/initApp";
import { modalReducer, alertReducer, tagsReducer } from "./../store";
import { photoReducer, searchReducer } from "./../photos";
import { authReducer } from "./../auth";
import { resolve } from "path";
import { writeFile, readFile } from "fs";
import { promisify } from "util";
import Providers from "../provider/container/Providers";

// CONFIG

const pathToDistDir = resolve(process.cwd(), "dist");

// INIT APP

const reducer = combineReducers({
  modal: modalReducer,
  alert: alertReducer,
  auth: authReducer,
  tags: tagsReducer,
  search: searchReducer,
  photos: photoReducer,
});

const store = createStore(reducer);

const html = renderToString(
  <ErrorBoundary>
    <ReduxProvider store={store}>
      <Providers>
        <App />
      </Providers>
    </ReduxProvider>
  </ErrorBoundary>
);

// INJECT HTML IN TO INDEX.HTML

promisify(readFile)(resolve(pathToDistDir, "index.html"), {
  encoding: "utf-8",
}).then((data) => {
  let d = data.replace("{{ROOT}}", html);

  promisify(writeFile)(resolve(pathToDistDir, "index.html"), d, {
    encoding: "utf-8",
  });
});
