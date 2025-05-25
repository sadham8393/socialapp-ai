import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src", "<rootDir>/__tests__"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: true }],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/server/"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "__tests__/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!__tests__/**/*.d.ts",
  ],
  moduleDirectories: ["node_modules", "src"],
  testEnvironmentOptions: { customExportConditions: ["node", "node-addons"] },
};

export default config;
