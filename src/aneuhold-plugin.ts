import { noPrivateModifier } from './rules/no-private-modifier/no-private-modifier';
import { serviceFileStructure } from './rules/service-file-structure/service-file-structure';

/**
 * Flat-config fragment that registers the `aneuhold` ESLint plugin and turns its
 * rules on. Spread this into a config array so the custom rules run as errors.
 */
export const aneuholdPlugin = {
  plugins: {
    aneuhold: {
      rules: {
        'no-private-modifier': noPrivateModifier,
        'service-file-structure': serviceFileStructure,
      },
    },
  },
  rules: {
    'aneuhold/no-private-modifier': 'error',
    'aneuhold/service-file-structure': 'error',
  },
};
