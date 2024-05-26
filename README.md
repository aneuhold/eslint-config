# eslint-config

Personal ESLint Configuration

## Notes on Architecture

- TypeScript was specifically avoided in this library because it was complicating the build step. It might work in this repo, but it kept causing issues in consuming repos. JS by itself seems to work great.
- All dependencies should be able to be only defined in this repo outside of ESLint and Prettier, as those will be brought in to consuming repos.
- In order for there not to be crossover between configuration dependencies, each config should be brought in as the full path to the configuration. For example:

```js
import tsLibConfig from '@aneuhold/eslint-config/src/ts-lib-config.js';
```

## Usage

Make sure to add the following settings to VSCode settings.json:

```json
{
  "eslint.experimental.useFlatConfig": true,
  "eslint.run": "onSave",
  "eslint.format.enable": true,
  // Extra setting below specifically for svelte
  "eslint.validate": ["svelte"]
}
```

Also as of 5/26/2024 make sure to add a resolution for Globals until that is fixed in other packages:

```json
  "resolutions": {
    "globals": "^15.3.0"
  },
  "resolutionsComments": {
    "globals": "This is a temporary fix for the globals package due to this issue: https://github.com/eslint/eslint/discussions/17868. Once other packages pull 15+ then should be able to remove this"
  }
```

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
  }
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
  }
];
```
