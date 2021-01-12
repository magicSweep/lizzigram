import * as path from "path";
import * as webpack from "webpack";
import Webpack, { IConfig } from "./src/webpack";

const entry = "./src/index.tsx";
const pathToOutputDir = path.resolve(__dirname, "dist");
const pathToHtmlTemplate = path.resolve(__dirname, "./src/template.html");

const wConfig: IConfig = {
  typescript: true,
  react: true,
  /* use preact over react */
  preact: true,
  scss: true,
};

const webpackHelper = new Webpack(
  wConfig,
  entry,
  pathToOutputDir,
  pathToHtmlTemplate
);

const config = webpackHelper.makeConfig();

//console.log(JSON.stringify(config));

export default config;
