import * as webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";

export const getOptimization = (): webpack.Configuration["optimization"] => {
  return {
    minimize: true,

    runtimeChunk: true,

    /* splitChunks: {
      chunks: "all",
      name(module: any, chunks: any, cacheGroupKey: any) {
        const moduleFileName = module
          .identifier()
          .split("/")
          .reduceRight((item: any) => item);
        const allChunksNames = chunks.map((item: any) => item.name).join("~");
        return `${cacheGroupKey}-${allChunksNames}`;
      },
    },
 */
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
          /* format: {
            comments: /@license/i,
          }, */
        },
        extractComments: false,
      }),
    ],
  };
};
