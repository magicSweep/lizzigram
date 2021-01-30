import * as path from "path";
import * as webpack from "webpack";
import Webpack, { IConfig } from "./src/webpack";

type TConfigTypes = "server" | "sharp";

const getEntry = (cType: TConfigTypes) => {
  switch (cType) {
    case "server":
      return path.resolve(__dirname, "src", "index.ts");
    case "sharp":
      return path.resolve(__dirname, "src", "sharp", "example", "index.ts");

    /*  case "cloudinary":
      return path.resolve(__dirname, "src", "cloudinary", "index.ts");
    case "google-drive": 
      return path.resolve(
        __dirname,
        "src",
        "googleDrive",
        "example",
        "index.ts"
      );*/

    default:
      throw new Error(`No implementation for type - ${cType}`);
  }
};

const getOutputDir = (cType: TConfigTypes) => {
  switch (cType) {
    case "server":
      return path.resolve(__dirname, "dist", "server");
    case "sharp":
      return path.resolve(__dirname, "dist", "sharp");
    /*  case "google-drive":
      return path.resolve(__dirname, "dist", "googleDrive");
    case "cloudinary":
      return path.resolve(__dirname, "dist", "cloudinary"); */

    default:
      throw new Error(`No implementation for type - ${cType}`);
  }
};

//let entry = "./src/server.ts";
const buildType = process.env.BUILD_TYPE as TConfigTypes;

const entry = getEntry(buildType);
const pathToOutputDir = getOutputDir(buildType);
/* const copyPluginOptions = {
  patterns: [{ from: "src/template", to: "template" }],
}; */

const wConfig: IConfig = {
  typescript: true,
  react: true,
  /* use preact over react */
  preact: true,
  scss: true,
};

const webpackHelper = new Webpack(wConfig, entry, pathToOutputDir, undefined);

const config = webpackHelper.makeConfig();

//console.log(JSON.stringify(config));

export default config;
