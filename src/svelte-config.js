// @ts-check

import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

// Take notes on the svelte-eslint-parser and the parser options it provides
// Also test creating a single combined config for all files.
// This GitHub issue might be helpful: https://github.com/typescript-eslint/typescript-eslint/issues/6778

const defaultConfig = tseslint.config(
  {
    files: ['**/*.js', '**/*.ts', '**/*.svelte'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      eslintPluginPrettierRecommended
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        extraFileExtensions: ['.svelte'],
        project: true
      },
      globals: { ...globals.browser, ...globals.node }
    },
    // Rules for js, and ts in ts files and svelte files
    //don't set 'svelte/*' rules here
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
      // ❗️ This should really be turned back on. It is turned off for now,
      // because it seems that the type definitions on the backend are wrong.
      // Types that have objects with variable key names should be updated
      // so that the value is not always defined. AKA the value is optional.
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      // Disabled because when using MongoDB, there aren't many options for
      // data structures besides JSON objects.
      '@typescript-eslint/no-dynamic-delete': 'off',
      // Disabled because on the frontend, it isn't always necessary to await
      // a promise.
      '@typescript-eslint/no-floating-promises': 'off',
      // The below have to be disabled because of the issue with svelte TS
      // types not being recognized in TS files, and vice versa.
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off'
    }
  },
  {
    // disable type-aware linting on JS files
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked]
  }
);

const svelteConfig = tseslint.config({
  files: ['**/*.svelte'],
  // @ts-expect-error - eslint-plugin-svelte is not typed
  extends: [
    ...eslintPluginSvelte.configs['flat/recommended'],
    ...eslintPluginSvelte.configs['flat/prettier']
  ],
  languageOptions: {
    parser: svelteParser,
    parserOptions: {
      parser: tseslint.parser,
      sourceType: 'module',
      extraFileExtensions: ['.svelte'],
      project: true
    }
  },
  // Svelte Rules
  /** @type {import('eslint').Linter.RulesRecord} */
  rules: {
    // 'svelte/valid-compile': ['warn']
  }
});

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
export default [
  ...defaultConfig,
  ...svelteConfig,
  {
    // other override settings. e.g. for `files: ['**/*.test.*']`
  },
  { ignores: ['.svelte-kit', '.yarn', 'build', 'node_modules', '**/.DS_Store'] } // overrides global ignores
];
