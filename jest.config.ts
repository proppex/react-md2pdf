import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  // transform: {
  //   "node_modules/remark.*/.*\\.js": "babel-jest",
  //   "node_modules/mdast.*/.*\\.js": "babel-jest",
  //   "node_modules/micromark.*/.*\\.js": "babel-jest",
  //   "node_modules/unist.*/.*\\.js": "babel-jest",
  //   "node_modules/decode-named-character-reference/.*\\.js": "babel-jest",
  //   "node_modules/character-entities/.*\\.js": "babel-jest",
  //   "node_modules/zwitch/.*\\.js": "babel-jest",
  //   "node_modules/longest-streak/.*\\.js": "babel-jest",
  //   "node_modules/unified/.*\\.js": "babel-jest",
  //   "node_modules/bail/.*\\.js": "babel-jest",
  //   "node_modules/devlop/.*\\.js": "babel-jest",
  // },
  // transformIgnorePatterns: [
  //   "node_modules/(?!(remark.*|mdast.*|micromark.*|unist.*|decode-named-character-reference|character-entities|zwitch|longest-streak|unified|bail|devlop)/.*)",
  // ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "node_modules/.*": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!.*)"],
};

export default config;
