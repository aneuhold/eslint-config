import nextPlugin from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';
import reactConfig from './react-config.js';

// Ya, this is kind of weird, but if you dig into the actual code in the next plugin, this is correct.
const { flatConfig } = nextPlugin;

export default tseslint.config(
  ...reactConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [flatConfig.recommended],
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
  }
);
