import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config} */
export default {
  languageOptions: {
    globals: globals.browser,
    ecmaVersion: 2021,
    sourceType: "module",
  },
  settings: {},
  plugins: {},
  rules: {
    // ATTENTION : à désactiver temporairement uniquement
    'no-undef': 'off',
    'no-unused-vars': 'off',
  },
  ...pluginJs.configs.recommended,
};
