import ts from "rollup-plugin-ts";
import { resolve } from "path";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import { main, module } from "./package.json";

const inputFilePath = resolve(__dirname, "mod.ts");
const banner =
  "/*! Copyright (c) 2021-present the Curry authors. All rights reserved. MIT license. */";

const replaceOption = {
  ".ts": "",
  preventAssignment: true,
};
const config = [
  {
    input: inputFilePath,
    plugins: [
      replace(replaceOption),
      ts({
        transpiler: "babel",
        tsconfig: (resolvedConfig) => ({
          ...resolvedConfig,
          declaration: false,
        }),
      }),
      terser(),
    ],

    output: {
      file: main,
      format: "cjs",
      sourcemap: true,
      banner,
    },
  },
  {
    input: inputFilePath,
    plugins: [
      replace(replaceOption),
      ts({
        transpiler: "babel",
      }),
      terser(),
    ],

    output: {
      file: module,
      format: "es",
      sourcemap: true,
      banner,
    },
  },
];

export default config;
