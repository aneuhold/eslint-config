import nextPlugin from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';
import reactConfig from './react-config';

export default defineConfig(
  ...reactConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [nextPlugin.configs.recommended],
    rules: {
      // Allow export names that are used by Next.js in the app directory.
      'react-refresh/only-export-components': [
        'error',
        { allowExportNames: ['metadata', 'links', 'headers', 'loader', 'action'] },
      ],
    },
  },
  {
    // Any other override settings. e.g. for `files: ['**/*.test.*']`
    ignores: ['.next'],
  }
);
