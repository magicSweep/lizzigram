import * as path from "path";
import * as webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

/* PLUGINS */

export const getPlugins = (dev: boolean, pathToHtmlTemplate: string) => [
  new HtmlWebpackPlugin({
    title: dev ? "Lizzygram - dev build" : "Lizzygram | фотографии малыша",
    template: pathToHtmlTemplate, // шаблон
    filename: "index.html", // название выходного файла
  }),
  new CleanWebpackPlugin(),
];

export const getDevPlugins = () => [new webpack.HotModuleReplacementPlugin()];

export const getProdPlugins = () => [
  new MiniCssExtractPlugin({
    //filename:  useVersioning ? '[name].[contenthash:6].css' : "[name].css"
    filename: "static/css/[name].[contenthash:12].css",
  }),
];
