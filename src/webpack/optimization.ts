import * as webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";

export const getOptimization = (): webpack.Configuration["optimization"] => {
  return {
    minimize: true,

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
