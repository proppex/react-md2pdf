import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transformIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"] ,
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};

export default config;
