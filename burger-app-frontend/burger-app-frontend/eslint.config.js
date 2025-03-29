import js from "@eslint/js";
import react from "eslint-plugin-react";

export default {
  plugins: {
    react,
  },
  overrides: [
    {
      files: ["*.jsx", "*.js"], // Apply to JavaScript and JSX files
      ...js.configs.recommended,
      ...react.configs.recommended,
      rules: {
        "no-unused-vars": "warn", // Prevent errors for unused variables
        "react/prop-types": "warn", // Ensure prop validation
        "react/no-unescaped-entities": "warn", // Warn about unescaped characters
      },
    },
  ],
  settings: {
    react: {
      version: "detect", // Fixes the React version warning
    },
  },
};