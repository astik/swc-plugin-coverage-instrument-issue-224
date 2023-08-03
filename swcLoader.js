"use strict";

const swc = require("@swc/core");
const path = require("path");

function getSwcOptions({ filename }) {
  const isTsFile = path.extname(filename) === ".ts";
  const isTypescript = isTsFile || path.extname(filename) === ".tsx";
  return {
    jsc: {
      parser: {
        syntax: isTypescript ? "typescript" : "ecmascript",
        dynamicImport: true,
        ...(isTypescript ? { tsx: !isTsFile } : { jsx: true }),
      },
      experimental: {
        plugins: [["swc-plugin-coverage-instrument", {}]],
      },
    },
  };
}

function swcLoader(inputSource, inputSourceMap) {
  // Make the loader async
  const callback = this.async();
  const filename = this.resourcePath;

  const swcOptions = getSwcOptions({
    filename,
  });

  const programmaticOptions = {
    ...swcOptions,
    filename,
    inputSourceMap: inputSourceMap ? JSON.stringify(inputSourceMap) : undefined,

    // Set the default sourcemap behavior based on Webpack's mapping flag,
    sourceMaps: this.sourceMap,
    inlineSourcesContent: this.sourceMap,

    // Ensure that Webpack will get a full absolute path in the sourcemap
    // so that it can properly map the module back to its internal cached
    // modules.
    sourceFileName: filename,
  };

  try {
    console.log("01");
    console.log("inputSource", inputSource);
    console.log("programmaticOptions", programmaticOptions);
    swc.transform(inputSource, programmaticOptions).then(
      (output) => {
        console.log("02");
        console.log("filename", filename);
        console.log("inputSource", inputSource);
        console.log("output", output);
        callback(null, output.code, JSON.parse(output.map));
      },
      (err) => {
        console.log("03", err);
        callback(err);
      }
    );
  } catch (e) {
    console.log("04", e);

    callback(e);
  }
}

module.exports = swcLoader;
