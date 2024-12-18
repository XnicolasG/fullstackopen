import globals from "globals";
import pluginJs from "@eslint/js";

const pluginJsConfigs = pluginJs.configs;



/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["dist", 'phonebook', 'mongoPractice']
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    rules: {
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-console': 0
    }
  },
  {
    files: [".eslintrc.{js,cjs}"],
    languageOptions: {
      sourceType: "script"
    },
    env: {
      node: true
    }
  },
  pluginJsConfigs.recommended,
];