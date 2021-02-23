const isTest = process.env.NODE_ENV === "test";

const presets = [
  [
    "@babel/preset-env",
    {
      /* Needed for tree shaking */
      /* Babel do not transpile modules to commonJs */
      modules: isTest ? "auto" : false,
    },
  ],
  "@babel/preset-react",
  "@babel/preset-typescript",
];

const plugins = [
  "@babel/proposal-class-properties",
  "@babel/plugin-transform-runtime",
  //"@babel/plugin-syntax-dynamic-import",
  //"@loadable/babel-plugin",
];

module.exports = { presets, plugins };
