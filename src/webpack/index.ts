import * as path from "path";
import * as webpack from "webpack";
//import * as webpackDevServer from "webpack-dev-server";
import { getOptimization } from "./optimization";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpackNodeExternals from "webpack-node-externals";
import CopyPlugin from "copy-webpack-plugin";

export interface IConfig {
  typescript: boolean;
  react: boolean;
  preact: boolean;
  scss: boolean;
}

class Webpack {
  dev: boolean;
  entry: string;
  pathToOutputDir: string;
  config: IConfig;
  copyPluginOptions: any;

  constructor(
    config: IConfig,
    entry: string,
    pathToOutputDir: string,
    copyPluginOptions?: any
  ) {
    this.dev = process.env.NODE_ENV !== "production";
    this.entry = entry;
    this.pathToOutputDir = pathToOutputDir;
    this.config = config;
    this.copyPluginOptions = copyPluginOptions;
  }

  makeOutput = (): webpack.Configuration["output"] => {
    return {
      path: this.pathToOutputDir,
      filename: "index.js",
    };
  };

  makeResolve = (): webpack.Configuration["resolve"] => {
    const resolve: webpack.Configuration["resolve"] = {
      extensions: [".ts", ".js"],
    };

    return resolve;
  };

  makeLoaders = (): webpack.Configuration["module"] => {
    return {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    };
  };

  makePlugins = (): webpack.Configuration["plugins"] => {
    const plugins: webpack.Configuration["plugins"] = [];

    /* plugins.push(
      new webpack.IgnorePlugin({
        checkResource(resource) {
          // do something with resource
          console.log("IGNORE PLUGIN", resource);
          if (resource.indexOf("credentials") > -1) return true;

          return false;
        },
      })
    ); */

    if (this.copyPluginOptions) {
      plugins.push(new CopyPlugin(this.copyPluginOptions));
    }

    plugins.push(new CleanWebpackPlugin());

    return plugins;
  };

  makeConfig = () => {
    const config: webpack.Configuration = {};

    config.mode = this.dev ? "development" : "production";

    config.target = "node";

    config.externals = [webpackNodeExternals()];

    config.node = {
      // Need this when working with express, otherwise the build fails
      __dirname: false, // if you don't put this is, __dirname
      __filename: false, // and __filename return blank or /
      //process: false,
    };

    config.entry = this.entry;

    config.output = this.makeOutput();

    config.resolve = this.makeResolve();

    config.module = this.makeLoaders();

    if (this.dev) {
      config.devtool = "inline-source-map";
    } else {
      config.optimization = getOptimization();
    }

    config.plugins = this.makePlugins();

    return config;
  };
}

export default Webpack;
