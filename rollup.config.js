import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: "src/index.tsx",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
      compact: true,
    },
    {
      file: "dist/index.es.js",
      format: "es",
      sourcemap: true,
      compact: true,
    },
  ],
  plugins: [nodeResolve(), commonjs(), json(), typescript()],
  external: ["react", "react-dom", "@react-pdf/renderer", "styled-components"],
};
