# eslint-config

Personal ESLint Configuration

## Notes on Architecture

- TypeScript was specifically avoided in this library because it was complicating the build step. It might work in this repo, but it kept causing issues in consuming repos. JS by itself seems to work great.
- All dependencies should be able to be only defined in this repo outside of ESLint and Prettier, as those will be brought in to consuming repos as peer deps.
- In order for there not to be crossover between configuration dependencies, each config should be brought in as the full path to the configuration. For example:

```js
import tsLibConfig from '@aneuhold/eslint-config/src/ts-lib-config.js';
```

## Usage

Make sure to add the following settings to VSCode settings.json:

```json
{
  // Use prettier for all files that ESLint doesn't support
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  // Use ESLint for all file types that it supports (which still uses prettier behind the scenes)
  "[typescript][javascript][javascriptreact][typescriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always",
    "source.organizeImports": "explicit"
  },
  "eslint.useFlatConfig": true,
  "eslint.run": "onSave",
  "eslint.format.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
    // Add "svelte" here if using Svelte
  ]
}
```

Then add a prettier file, such as the one in this repo [here](.prettierrc.js).

### Setup for `CommonJS`

Add `eslint.config.js` like so:

```js
const config = (async () => (await import('./eslint.config.mjs')).default)();

module.exports = config;
```

Add `eslint.config.mjs` like so:

```js
// @ts-check

import tsLibConfig from '@aneuhold/eslint-config/src/ts-lib-config.js';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
export default [
  ...tsLibConfig,
  {
    // other override settings. e.g. for `files: ['**/*.test.*']`
  },
];
```

### Setup for `ESNext` (ES Modules)

Add `eslint.config.js` like so:

```js
// @ts-check

import svelteConfig from '@aneuhold/eslint-config/src/svelte-config.js';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
export default [
  ...svelteConfig,
  {
    // other override settings. e.g. for `files: ['**/*.test.*']`
  },
];
```

### Setup for Monorepo

If you have specific configs for different folders, make sure to exclude those folders in the top-level config! For example:

```js
import tsLibConfig from '@aneuhold/eslint-config/src/ts-lib-config.js';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
export default [
  ...tsLibConfig,
  {
    // other override settings. e.g. for `files: ['**/*.test.*']`
    rules: {},
  },
  {
    ignores: ['**/lib', 'svelte', 'react'],
  },
];
```
