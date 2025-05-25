import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  prettier,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "public/",
      "*.css",
      "*.md",
      "*.json",
      "*.lock",
      "*.html",
      "*.svg",
      "*.png",
      "*.jpg",
      "*.jpeg",
      "*.gif",
      "*.ico",
      "*.eot",
      "*.ttf",
      "*.woff",
      "*.woff2",
      "*.map",
      "*.log",
      "*.DS_Store",
      "vite.config.js",
      "tailwind.config.js",
      "postcss.config.js",
      ".eslintignore"
    ],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: true,
        document: true,
        localStorage: true,
        setTimeout: true,
        describe: true,
        it: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
        jest: true,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      quotes: ["error", "double"],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      quotes: ["error", "double"],
    },
  },
];
