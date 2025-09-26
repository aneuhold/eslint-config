// Allows us to bring in the recommended core rules from eslint itself
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';

// Allows us to use the typed utility for our config, and to bring in the recommended rules for TypeScript projects from typescript-eslint
import tseslint from 'typescript-eslint';

// Allows us to bring in the recommended rules for Angular projects from angular-eslint
import angular from 'angular-eslint';

import stylisticJs from '@stylistic/eslint-plugin-js';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginJsdoc from 'eslint-plugin-jsdoc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';

// Export our config array, which is composed together thanks to the typed utility function from typescript-eslint
export default defineConfig(
  {
    // Everything in this config object targets our TypeScript files (Components, Directives, Pipes etc)
    files: ['**/*.ts'],
    extends: [
      // Apply the recommended core rules
      eslint.configs.recommended,
      // Apply the recommended TypeScript rules
      ...tseslint.configs.recommended,
      // Optionally apply stylistic rules from typescript-eslint that improve code consistency
      // Commented out for now, but these do seem nice while testing.
      // ...tseslint.configs.stylistic,
      // Apply the recommended Angular rules
      ...angular.configs.tsRecommended,
      // Apply prettier styling rules last
      eslintPluginPrettierRecommended,
    ],
    // Plugins are brought in using the name they use in the rule. So 'import/no-deprecated' needs 'import'
    plugins: {
      import: eslintPluginImport,
      jsdoc: eslintPluginJsdoc,
      'unused-imports': eslintPluginUnusedImports,
      '@stylistic/js': stylisticJs,
      '@stylistic/ts': stylisticTs,
    },
    // Set the custom processor which will allow us to have our inline Component templates extracted
    // and treated as if they are HTML files (and therefore have the .html config below applied to them)
    processor: angular.processInlineTemplates,
    // Override specific rules for TypeScript files (these will take priority over the extended configs above)
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          style: 'kebab-case',
        },
      ],
      // The below rule should be set as an error but it happens in so many files
      // it would take a lot of effort to convert and test everything.
      '@angular-eslint/no-host-metadata-property': 'warn',
      '@angular-eslint/component-class-suffix': [
        'warn',
        {
          suffixes: ['Component', 'Page'],
        },
      ],
      // Below rule was turned off to allow for member-ordering to take
      // precedence.
      '@typescript-eslint/adjacent-overload-signatures': 'off',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@stylistic/ts/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
        },
      ],
      '@typescript-eslint/member-ordering': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      // The below rule is handled by unused-imports/no-unused-vars
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-shadow': [
        'error',
        {
          hoist: 'all',
        },
      ],
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/triple-slash-reference': [
        'error',
        {
          path: 'always',
          types: 'prefer-import',
          lib: 'always',
        },
      ],
      '@stylistic/ts/type-annotation-spacing': 'error',
      '@typescript-eslint/typedef': 'off',
      '@typescript-eslint/unified-signatures': 'error',
      'arrow-body-style': 'error',
      // The below is cyclomatic complexity. We might want to set this to something to help with
      // SonarCloud scores before it gets there. 😁
      complexity: 'off',
      'constructor-super': 'error',
      'dot-notation': 'error',
      // Turned off because it is throwing errors as of 7/17/2024. See the following
      // GitHub links:
      // Link to GitHub PR: https://github.com/import-js/eslint-plugin-import/pull/2996
      // Link to bug: https://github.com/eslint/eslint/issues/17953
      'import/no-deprecated': 'off',
      'import/order': [
        'warn',
        {
          alphabetize: {
            order: 'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
            caseInsensitive: true /* ignore case. Options: [true, false] */,
          },
          'newlines-between': 'never',
        },
      ],
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/no-types': 'error',
      '@stylistic/js/max-len': [
        'warn',
        {
          code: 140,
          ignoreStrings: true,
        },
      ],
      '@stylistic/js/new-parens': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      // So we don't accidentally assign a variable in an if-condition
      'no-cond-assign': 'error',
      'no-debugger': 'error',
      'no-eval': 'error',
      'no-fallthrough': 'error',
      'no-restricted-imports': ['error', 'rxjs/Rx'],
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      // Custom configuration for underscore dangle for use of
      // backing values in classes when no other option is available.
      'no-underscore-dangle': [
        'warn',
        {
          enforceInMethodNames: true,
          allowAfterThis: true,
        },
      ],
      'no-unsafe-finally': 'error',
      'no-unused-expressions': 'error',
      'no-unused-labels': 'error',
      'one-var': ['error', 'never'],
      '@stylistic/js/quote-props': ['error', 'as-needed'],
      '@stylistic/js/spaced-comment': [
        'error',
        'always',
        {
          markers: ['/'],
        },
      ],
      'use-isnan': 'error',
      //The following removes unused imports
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    // Everything in this config object targets our HTML files (external templates,
    // and inline templates as long as we have the `processor` set on our TypeScript config above)
    files: ['**/*.html'],
    extends: [
      // Apply the recommended Angular template rules
      ...angular.configs.templateRecommended,
      // Apply the Angular template rules which focus on accessibility.
      // Commented for now, but this should ideally be turned back on in
      // the future.
      // ...angular.configs.templateAccessibility,
      // Apply the prettier config
      eslintPluginPrettierRecommended,
    ],
    rules: {
      'prettier/prettier': [
        'error',
        {
          parser: 'angular',
          endOfLine: 'auto',
        },
      ],
    },
  }
);
