import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import jsdoc from 'eslint-plugin-jsdoc';

const defaultConfig = tseslint.config(
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      jsdoc.configs['flat/recommended-typescript'],
      eslintPluginPrettierRecommended
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        project: true
      },
      globals: { ...globals.node }
    },
    // Rules for js, and ts in ts files
    rules: {
      'no-use-before-define': 'off',
      'no-undef': 'off',
      // Just 100% disagree with this rule. The reasoning is that using a
      // specific class name allows for you to write the class name and it
      // will automatically bring in that class along with all the methods.
      // This provides context to what the class is doing, and allows for
      // better code completion + refactoring.
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true
        }
      ],
      // Turned off because it doesn't seem too helpful, and it likes to error
      // on things that seem to be just fine in generics.
      '@typescript-eslint/no-unnecessary-type-parameters': 'off'
    }
  },
  {
    // disable type-aware linting on JS files
    files: ['**/*.js', '**/*.mjs'],
    extends: [tseslint.configs.disableTypeChecked]
  }
);

export default tseslint.config(
  ...defaultConfig,
  {
    // other override settings. e.g. for `files: ['**/*.test.*']`
  },
  { ignores: ['.yarn', 'build', 'lib', 'node_modules', '**/.DS_Store'] } // overrides global ignores
);
