import * as path from "path";
import * as webpack from "webpack";
import * as webpackDevServer from "webpack-dev-server";
import { getPlugins, getDevPlugins, getProdPlugins } from "./plugins";
import {
  getBabelLoader,
  getFontLoader,
  getImageLoader,
  getSassLoader,
  getSvgLoader,
} from "./loaders";
import { getOptimization } from "./optimization";

export interface IConfig {
  typescript: boolean;
  react: boolean;
  preact: boolean;
  scss: boolean;
  isAnalyze: boolean;
}

class Webpack {
  dev: boolean;
  entry: string;
  pathToOutputDir: string;
  pathToHtmlTemplate: string;
  config: IConfig;
  //output: webpack.Configuration["output"];
  //resolve: webpack.Configuration["resolve"];

  constructor(
    config: IConfig,
    entry: string,
    pathToOutputDir: string,
    pathToHtmlTemplate: string
  ) {
    this.dev = process.env.NODE_ENV !== "production";
    this.entry = entry;
    this.pathToOutputDir = pathToOutputDir;
    this.pathToHtmlTemplate = pathToHtmlTemplate;
    this.config = config;
  }

  makeOutput = (): webpack.Configuration["output"] => {
    return {
      path: this.pathToOutputDir,
      filename: this.dev ? "main.bundle.js" : "[name].[contenthash:12].js",
      publicPath: "/",
    };
  };

  makeResolve = (): webpack.Configuration["resolve"] => {
    const resolve: webpack.Configuration["resolve"] = {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    };

    if (this.config.preact) {
      resolve.alias = {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
        //"react-render-to-string": "preact-render-to-string",
        //'react-ssr-prepass': 'preact-ssr-prepass'
        // Must be below test-utils
      };
    }

    return resolve;
  };

  makeLoaders = (): webpack.Configuration["module"] => {
    const babelLoader = getBabelLoader();
    const fontLoader = getFontLoader();
    const imageLoader = getImageLoader();
    const sassLoader = getSassLoader(this.dev);
    const svgLoader = getSvgLoader();

    return {
      rules: [babelLoader, fontLoader, imageLoader, sassLoader, svgLoader],
    };
  };

  makePlugins = (): webpack.Configuration["plugins"] => {
    const plugins = getPlugins(
      this.dev,
      this.pathToHtmlTemplate,
      this.config.isAnalyze
    );
    const devPlugins = getDevPlugins();
    const prodPlugins = getProdPlugins();

    const result = this.dev
      ? plugins.concat(devPlugins)
      : plugins.concat(prodPlugins);

    return result;
  };

  makeConfig = () => {
    const config: webpack.Configuration = {};

    config.mode = this.dev ? "development" : "production";

    config.entry = this.entry;

    config.output = this.makeOutput();

    config.resolve = this.makeResolve();

    config.module = this.makeLoaders();

    if (this.dev) {
      config.devtool = "inline-source-map";

      config.devServer = {
        contentBase: this.pathToOutputDir,
        open: true,
        compress: true,
        hot: true,
        //compress: true,
        //port: 80
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",
        },
      };
    } else {
      config.optimization = getOptimization();
    }

    config.plugins = this.makePlugins();

    return config;
  };
}

export default Webpack;
