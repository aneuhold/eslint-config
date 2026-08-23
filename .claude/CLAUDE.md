# eslint-config

## Language

@../node_modules/@aneuhold/robot-instructions/src/instructions/lang/typescript.md

## Runtime

@../node_modules/@aneuhold/robot-instructions/src/instructions/runtime/node.md

## Tooling

@../node_modules/@aneuhold/robot-instructions/src/instructions/tooling/vitest.md

## This repo

- Personal ESLint configuration, authored in raw TypeScript with no build step. The configs and rule source ship as `.ts`, and each consumer's ESLint transpiles them on the fly via jiti.
- Every dependency outside ESLint and Prettier is defined here. Those two arrive in consuming repos as peer deps.
- Each config is imported by its full path, so there is no barrel file and no package root `index.ts`. For example `import tsLibConfig from '@aneuhold/eslint-config/src/configs/ts-lib-config'`.
- Before considering a task complete, run and fix any issues that come up: `pnpm check`, `pnpm lint`, `pnpm test`.
