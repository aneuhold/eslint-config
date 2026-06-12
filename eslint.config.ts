import { type TSESLint } from '@typescript-eslint/utils';
import tsLibConfig from './src/configs/ts-lib-config';

const config: TSESLint.FlatConfig.ConfigArray = [
  ...tsLibConfig,
  {
    // other override settings. e.g. for `files: ['**/*.test.*']`
  },
];

export default config;
