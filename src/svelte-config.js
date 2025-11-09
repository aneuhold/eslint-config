import eslint from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

const defaultConfig = defineConfig(
  {
    files: ['**/*.js', '**/*.ts', '**/*.svelte'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      jsdoc.configs['flat/recommended-typescript'],
      eslintPluginPrettierRecommended,
    ],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        extraFileExtensions: ['.svelte'],
        projectService: true,
      },
      globals: { ...globals.browser, ...globals.node },
    },
    // Rules for js, and ts in ts files and svelte files
    //don't set 'svelte/*' rules here
    rules: {
      // Makes it so that there's 1 line above tags in jsdoc comments.
      'jsdoc/tag-lines': ['warn', 'any', { startLines: 1 }],
      'jsdoc/require-jsdoc': ['off'],
      'jsdoc/require-returns': 'off',

      // simple-import-sort: use a single inner array to avoid blank lines between groups
      // See docs here: https://github.com/lydell/eslint-plugin-simple-import-sort?tab=readme-ov-file#how-is-this-rule-different-from-importorder
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              '^\\u0000', // side effect imports
              '^node:',
              '^@?\\w', // packages
              '^', // absolute imports
              '^\\.', // relative imports
            ],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

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
          allowBoolean: true,
        },
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
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      // Turned off because it doesn't seem too helpful, and it likes to error
      // on things that seem to be just fine in generics.
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
    },
  },
  {
    // disable type-aware linting on JS files
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  }
);

const svelteConfig = defineConfig({
  files: ['**/*.svelte'],
  // @ts-expect-error - eslint-plugin-svelte is not typed
  extends: [
    ...eslintPluginSvelte.configs['flat/recommended'],
    ...eslintPluginSvelte.configs['flat/prettier'],
  ],
  languageOptions: {
    parser: svelteParser,
    parserOptions: {
      parser: tseslint.parser,
      sourceType: 'module',
      extraFileExtensions: ['.svelte'],
      projectService: true,
    },
  },
  // Svelte Rules
  rules: {
    'svelte/no-navigation-without-resolve': [
      'error',
      {
        ignoreGoto: false,
        ignoreLinks: true,
        ignorePushState: false,
        ignoreReplaceState: false,
      },
    ],
  },
});

export default defineConfig(
  ...defaultConfig,
  ...svelteConfig,
  {
    // other override settings. e.g. for `files: ['**/*.test.*']`
  },
  {
    // overrides global ignores
    ignores: ['.svelte-kit', '.yarn', 'build', 'node_modules', '**/.DS_Store'],
  }
);
