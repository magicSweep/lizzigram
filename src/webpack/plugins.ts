import * as path from "path";
import * as webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import WorkboxWebpackPlugin from "workbox-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CompressionPlugin from "compression-webpack-plugin";
import LoadablePlugin from "@loadable/webpack-plugin";
import { join } from "path";

/* PLUGINS */

export const getPlugins = (
  dev: boolean,
  pathToHtmlTemplate: string,
  isAnalyze: boolean,
  isSsr: boolean
) => {
  const plugins: webpack.WebpackPluginInstance[] = [new CleanWebpackPlugin()];

  if (!isSsr) plugins.push(getCopyPlugin());

  if (!isSsr)
    plugins.push(
      new HtmlWebpackPlugin({
        title: dev ? "Lizzygram - dev build" : "Lizzygram | фотографии малыша",
        template: pathToHtmlTemplate, // шаблон
        filename: "index.html", // название выходного файла
      })
    );

  /*  const copyPlugin = getCopyPlugin();

  const plugins = [
    copyPlugin,
    new HtmlWebpackPlugin({
      title: dev ? "Lizzygram - dev build" : "Lizzygram | фотографии малыша",
      template: pathToHtmlTemplate, // шаблон
      filename: "index.html", // название выходного файла
    }),
    new CleanWebpackPlugin(),
  ]; */

  if (isAnalyze) plugins.push(new BundleAnalyzerPlugin());

  return plugins;
};

export const getDevPlugins = () => [new webpack.HotModuleReplacementPlugin()];

export const getProdPlugins = (isSsr: boolean, withSsr: boolean) => {
  //const workbox = getWorkboxWebpackPlugin_InjectManifest();

  const plugins: webpack.WebpackPluginInstance[] = [
    new MiniCssExtractPlugin({
      //filename:  useVersioning ? '[name].[contenthash:6].css' : "[name].css"
      filename: "static/css/[name].[contenthash:12].css",
    }),
  ];

  //if (withSsr) plugins.push(new LoadablePlugin() as any);

  if (!isSsr)
    plugins.push(
      new CompressionPlugin({
        exclude: ["/image", "/icons"], // /\/images?/
        threshold: 10500, // do not compress file smaller than 10KB
      })
    );

  return plugins;

  /* return [
    // workbox,
    //new LoadablePlugin() as any,
    // GZIP
    new CompressionPlugin({
      exclude: ["/image", "/icons"], // /\/images?/
      threshold: 10500, // do not compress file smaller than 10KB
    }),
    new MiniCssExtractPlugin({
      //filename:  useVersioning ? '[name].[contenthash:6].css' : "[name].css"
      filename: "static/css/[name].[contenthash:12].css",
    }),
  ]; */
};

export const getCopyPlugin = () => {
  return new CopyPlugin({
    patterns: [
      {
        from: join(process.cwd(), "src/pwa/manifest.json"),
        to: "manifest.json",
      },
      {
        from: join(
          process.cwd(),
          "src/static/icon/app-icon-192x192_1w34rw.png"
        ),
        to: "static/icons/app-icon-192x192_1w34rw.png",
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
