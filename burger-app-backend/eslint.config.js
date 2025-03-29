import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Allows 'process', 'require', etc.
      },
      ecmaVersion: 2021,
    },
    plugins: {
      js,
      react: pluginReact,
    },
    rules: {
      "no-undef": "error", // Ensures undefined variables are caught
      "react/react-in-jsx-scope": "off", // Not needed in modern React
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
    ],
  },
]);

