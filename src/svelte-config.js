import eslint from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Shared extraFileExtensions constant to avoid project service reloads.
// See: https://typescript-eslint.io/troubleshooting/typed-linting/performance/#changes-to-extrafileextensions-with-projectservice
const extraFileExtensions = ['.svelte'];

export default defineConfig(
  // 1. Global config: applies to all linted files (js, ts, svelte)
  //    Sets up ESLint recommended + TypeScript strict + JSDoc + Prettier compat
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
        extraFileExtensions,
        projectService: true,
      },
      globals: { ...globals.browser, ...globals.node },
    },
    // Rules for js, and ts in ts files and svelte files
    // Don't set 'svelte/*' rules here
    rules: {
      // Makes it so that there's 1 line above tags in jsdoc comments.
      'jsdoc/tag-lines': ['warn', 'any', { startLines: 1 }],
      'jsdoc/require-jsdoc': ['off'],
      'jsdoc/require-returns': 'off',

      // simple-import-sort: use a single inner array to avoid blank lines between groups
      // See docs here: https://github.com/lydell/eslint-plugin-simple-import-sort?tab=readme-ov-file#how-is-this-rule-different-from-importorder
      // Originally I added this to avoid VS Code auto-sorting putting a blank line SPECIFICALLY after
      // exports when there are only exports in a file and more than 1 of them, which was conflicting
      // with prettier. Lol. But this is a lot more configurable anyway ❤️
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
      // The below have to be disabled because svelte-eslint-parser cannot
      // resolve types from imported .svelte files (it doesn't use svelte2tsx
      // like VS Code's Svelte extension does), so types from
      // ComponentProps<typeof SvelteComponent> and similar patterns resolve
      // as `any`. See: https://github.com/sveltejs/eslint-plugin-svelte/issues/1303
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
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

  // 2. Disable type-aware linting on JS files
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  // 3. Svelte config: recommended rules + prettier compat for svelte files.
  //    eslint-plugin-svelte's flat/recommended already includes base config
  //    which sets up svelte-eslint-parser and the svelte processor.
  //    flat/prettier disables svelte rules that conflict with Prettier.
  // @ts-expect-error - eslint-plugin-svelte is not typed
  ...eslintPluginSvelte.configs['flat/recommended'],
  // @ts-expect-error - eslint-plugin-svelte is not typed
  ...eslintPluginSvelte.configs['flat/prettier'],

  // 4. TypeScript integration for Svelte files: tell svelte-eslint-parser
  //    to delegate <script> parsing to @typescript-eslint/parser with
  //    project service for type-aware linting.
  //    See: https://sveltejs.github.io/eslint-plugin-svelte/ (TypeScript project section)
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions,
        projectService: true,
      },
    },
  },

  // 5. Svelte rule overrides
  {
    files: ['**/*.svelte'],
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
  },

  // 6. Global ignores
  {
    ignores: ['.svelte-kit', '.yarn', 'build', 'node_modules', '**/.DS_Store'],
  }
);
