# eslint-config

Personal ESLint Configuration

## Notes on Architecture

- This library is authored in **raw TypeScript with no build step**. The configs and rule source ship as `.ts`, and each consumer's ESLint transpiles them on the fly via [jiti](https://github.com/unjs/jiti).
- All dependencies should be able to be only defined in this repo outside of ESLint and Prettier, as those will be brought in to consuming repos as peer deps.
- In order for there not to be crossover between configuration dependencies, each config should be brought in as the full path to the configuration. For example:

```ts
import tsLibConfig from '@aneuhold/eslint-config/src/configs/ts-lib-config';
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

The config sources are `.ts`, so add an `eslint.config.ts` that spreads in the
config for your stack. ESLint transpiles both your config and the package's
sources on the fly via jiti — no build step.

```ts
import tsLibConfig from '@aneuhold/eslint-config/src/configs/ts-lib-config';

export default [
  ...tsLibConfig,
  {
    // your overrides, e.g. for `files: ['**/*.test.*']`
  },
];
```

Swap `ts-lib-config` for whichever config matches the project: `svelte-config`,
`react-config`, `react-next-config`, or `angular-config`.

**Monorepo:** if nested folders have their own configs, add an `ignores` entry
so the top-level config doesn't also lint them:

```ts
{ ignores: ['**/lib', 'svelte', 'react'] }
```
