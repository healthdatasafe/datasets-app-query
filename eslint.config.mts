import eslint from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default tseslint.config(
  // Ignores
  {
    ignores: [
      "node_modules/",
      "coverage/",
      "build/",
      "dist/",
    ],
  },

  // Base language options and plugins
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
      },
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      react: reactPlugin,
    },
  },

  // Recommended configs
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // Apply Standard & SemiStandard to TS/TSX using FlatCompat
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {},
    ...compat.extends("standard")[0],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {},
    ...compat.extends("semistandard")[0],
  },

  // TypeScript-specific rules mirroring legacy config
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      // types are hoisted; avoid false positives in TS
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "off",
    },
  },

  // Enable JSX parsing for React files
  {
    files: ["**/*.jsx", "**/*.tsx"],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Add React rules here if needed in future
    },
  },

  // Ensure single quotes
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      quotes: ["error", "single", { avoidEscape: true, allowTemplateLiterals: true }],
    },
  }
);


