import nextPlugin from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';
import reactConfig from './react-config.ts';

export default defineConfig(
  ...reactConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    // @next/eslint-plugin-next is not typed, so `flatConfig` resolves as an
    // unresolvable type.
    // @ts-expect-error - `flatConfig` exists at runtime but isn't in the plugin's types.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    extends: [nextPlugin.flatConfig.recommended],
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
