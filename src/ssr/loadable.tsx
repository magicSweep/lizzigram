import React from "react";
//import ReactDOM from "react-dom";
import { renderToString } from "react-dom/server";
import ErrorBoundary from "./../component/ErrorBoundary";
import App from "./../container/App";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
//import thunk from "redux-thunk";

//import { initApp } from "./firebase/initApp";
import { modalReducer, alertReducer, tagsReducer } from "./../store";
import { photoReducer, searchReducer } from "./../photos";
import { authReducer } from "./../auth";
import { ChunkExtractor } from "@loadable/server";
import { resolve } from "path";
import { writeFile, readFile } from "fs";
import { promisify } from "util";

// CONFIG

const pathToDistDir = resolve(process.cwd(), "dist");

const pathToDistSsrDir = resolve(process.cwd(), "dist-ssr");

const statsFile = resolve(pathToDistDir, "loadable-stats.json");

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

/* export const html = renderToString(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
); */

// LOADABLE

const extractor = new ChunkExtractor({ statsFile });

const jsx = extractor.collectChunks(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
);

const html = renderToString(jsx);

// You can now collect your script tags
//const scriptTags = extractor.getScriptTags(); // or extractor.getScriptElements();
// You can also collect your "preload/prefetch" links
const linkTags = extractor.getLinkTags(); // or extractor.getLinkElements();
// And you can even collect your style tags (if you use "mini-css-extract-plugin")
//const styleTags = extractor.getStyleTags(); // or extractor.getStyleElements();

const linkElements = extractor.getLinkElements();

console.log("linkElements");

console.log(linkElements[0].key);

console.log("----------------------");

console.log("linkTags", typeof linkTags);

console.log(linkTags);

console.log("----------------------");

let props: any;
let links = "";

for (let linkEl of linkElements) {
  //if(!linkEl.key) throw new Error(`No key on link - ${JSON.stringify(linkEl)}`);

  props = (linkEl as any).props;

  if (props["data-chunk"] === "main") continue;

  //<link data-chunk="component-Alert" rel="preload" as="script" href="/component-Alert.6fcbe8182649.js">
  links += `<link data-chunk="${props["data-chunk"]}" rel="preload" as="${props.as}" href="${props.href}" />`;
}

console.log("FINALE");

console.log(links);

console.log("----------------------");

// INJECT HTML IN TO INDEX.HTML

promisify(readFile)(resolve(pathToDistDir, "index.html"), {
  encoding: "utf-8",
}).then((data) => {
  let d = data.replace("{{ROOT}}", html);

  d = d.replace("{{LOADABLE}}", links);

  promisify(writeFile)(resolve(pathToDistDir, "index.html"), d, {
    encoding: "utf-8",
  });
});

/* const htmlTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lizzygram | фотографии малыша</title>
    <link rel="manifest" href="/manifest.json" />
    <link
      rel="icon"
      type="image/png"
      href="/static/icons/app-icon-192x192_1w34rw.png"
    />
    ${linkTags}
  </head>
  <body>
    <div id="root">${html}</div>
    <div id="modal"></div>
    <div id="alert"></div>
  </body>
</html>

`;

promisify(writeFile)(resolve(pathToDistDir, "index.html"), htmlTemplate, {
  encoding: "utf-8",
}); */
