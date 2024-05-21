import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(j|t)sx?$": "ts-jest",
  },
  // transformIgnorePatterns: ["<rootDir>/node_modules/"],
};

export default config;
