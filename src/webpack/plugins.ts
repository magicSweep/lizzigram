import * as path from "path";
import * as webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import WorkboxWebpackPlugin from "workbox-webpack-plugin";
import { join } from "path";

/* PLUGINS */

export const getPlugins = (dev: boolean, pathToHtmlTemplate: string) => {
  const copyPlugin = getCopyPlugin();

  return [
    copyPlugin,
    new HtmlWebpackPlugin({
      title: dev ? "Lizzygram - dev build" : "Lizzygram | фотографии малыша",
      template: pathToHtmlTemplate, // шаблон
      filename: "index.html", // название выходного файла
    }),
    new CleanWebpackPlugin(),
  ];
};

export const getDevPlugins = () => [new webpack.HotModuleReplacementPlugin()];

export const getProdPlugins = () => {
  //const workbox = getWorkboxWebpackPlugin_InjectManifest();

  return [
    // workbox,
    new MiniCssExtractPlugin({
      //filename:  useVersioning ? '[name].[contenthash:6].css' : "[name].css"
      filename: "static/css/[name].[contenthash:12].css",
    }),
  ];
};

export const getCopyPlugin = () => {
  return new CopyPlugin({
    patterns: [
      {
        from: join(process.cwd(), "src/pwa/manifest.json"),
        to: "manifest.json",
      },
      {
        from: join(process.cwd(), "src/static/icon/app-icon-192x192.png"),
        to: "static/images/icons/apple-icon-192x192.png",
      },
    ],
  });
};

export const getWorkboxWebpackPlugin_InjectManifest = () =>
  new WorkboxWebpackPlugin.InjectManifest({
    swSrc: join(process.cwd(), "src/serviceWorker/index.ts"),
    swDest: "sw.js",
    globPatterns: ["**/*.{html,css,png,svg,js}", "src/images/*.{jpg,png}"],
    //globIgnores: ["help/**"],
  });

// WORKBOX PLUGIN - GENEREATE_SW
export const getWorkboxWebpackPlugin_GenerateSW = () =>
  new WorkboxWebpackPlugin.GenerateSW({
    // Do not precache images
    exclude: [/\.(?:png|jpg|jpeg|svg)$/],

    // Define runtime caching rules.
    runtimeCaching: [
      {
        // Match any request that ends with .png, .jpg, .jpeg or .svg.
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

        // Apply a cache-first strategy.
        handler: "CacheFirst",

        options: {
          // Use a custom cache name.
          cacheName: "images",

          // Only cache 10 images.
          expiration: {
            maxEntries: 10,
          },
        },
      },
    ],
  });
