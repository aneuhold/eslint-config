import eslint from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const defaultConfig = defineConfig(
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      jsdoc.configs['flat/recommended-typescript'],
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        project: true,
      },
      globals: { ...globals.node },
    },
    // Rules for js, and ts in ts files
    rules: {
      // Makes it so that there's 1 line above tags in jsdoc comments.
      'jsdoc/tag-lines': ['error', 'any', { startLines: 1 }],
      'jsdoc/require-returns': 'off',
      'no-use-before-define': 'off',
      'no-undef': 'off',
      // Just 100% disagree with this rule. The reasoning is that using a
      // specific class name allows for you to write the class name and it
      // will automatically bring in that class along with all the methods.
      // This provides context to what the class is doing, and allows for
      // better code completion + refactoring.
      '@typescript-eslint/no-extraneous-class': 'off',
      // Just makes it so that the rule about https://typescript-eslint.io/rules/unbound-method/ can
      // be followed. Otherwise, it doesn't allow you to do the things it suggests to fix the issue.
      '@typescript-eslint/no-invalid-void-type': ['error', { allowAsThisParameter: true }],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true,
        },
      ],
      // Turned off because it doesn't seem too helpful, and it likes to error
      // on things that seem to be just fine in generics.
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
    },
  },
  {
    // disable type-aware linting on JS files
    files: ['**/*.js', '**/*.mjs'],
    extends: [tseslint.configs.disableTypeChecked],
  }
);

export default defineConfig(
  ...defaultConfig,
  {
    // other override settings. e.g. for `files: ['**/*.test.*']`
  },
  {
    ignores: ['.yarn', 'build', 'lib', 'node_modules', 'eslint.config.js', '**/.DS_Store'],
  } // overrides global ignores
);
