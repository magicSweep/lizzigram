import * as path from "path";
import * as webpack from "webpack";
import Webpack, { IWebpackConfig } from "./src/webpack";

const entry = "./src/ssr/index.tsx";
const pathToOutputDir = path.resolve(__dirname, "dist-ssr");
//const pathToHtmlTemplate = path.resolve(__dirname, "./src/template.html");

const wConfig: IWebpackConfig = {
  typescript: true,
  react: true,
  /* use preact over react */
  preact: true,
  scss: true,
  isSsr: true,
  withSsr: true,
  isAnalyze: process.env.NODE_WEBPACK_ANALYZE === "analyze",
};

const webpackHelper = new Webpack(wConfig, entry, pathToOutputDir, "");

const config = webpackHelper.makeConfig();

//console.log(JSON.stringify(config));

export default config;
