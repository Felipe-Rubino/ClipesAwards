// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require("next/jest");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const dotenv = require("dotenv");

dotenv.config({
  path: ".env.development",
});
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "<rootDir>"],
};

module.exports = createJestConfig(config);
