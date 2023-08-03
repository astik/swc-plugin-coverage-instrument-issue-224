"use strict";

const path = require("path");

module.exports = () => {
  return {
    entry: {
      main: "./src/index.ts",
    },
    output: {
      path: __dirname + "/dist",
      filename: "[name].[contenthash:8].js",
    },
    resolveLoader: {
      alias: {
        "swc-loader": path.resolve(__dirname, "./swcLoader.js"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          loader: "swc-loader",
        },
      ],
    },
  };
};
