# eslint-config

Personal ESLint Configuration

## Notes on Architecture

- TypeScript was specifically avoided in this library because it was complicating the build step. It might work in this repo, but it kept causing issues in consuming repos. JS by itself seems to work great.
- All dependencies should be able to be only defined in this repo outside of ESLint and Prettier, as those will be brought in to consuming repos.
- In order for there not to be crossover between configuration dependencies, each config should be brought in as the full path to the configuration. For example:

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
