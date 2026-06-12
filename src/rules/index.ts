import { type Linter } from 'eslint';
import { noPrivateModifier } from './no-private-modifier/no-private-modifier';
import { serviceFileStructure } from './service-file-structure/service-file-structure';

/**
 * The runtime `aneuhold` plugin object.
 */
const aneuholdPlugin = {
  meta: { name: 'aneuhold' },
  rules: {
    'no-private-modifier': noPrivateModifier,
    'service-file-structure': serviceFileStructure,
  },
};

/**
 * The same plugin object handed out through a deliberately narrow type that
 * hides `rules`. This is what lets the fragment below be accepted by
 * `defineConfig`: ESLint core's strict `RuleDefinition` type would otherwise
 * reject rules built with typescript-eslint's `RuleCreator` (whose looser
 * `RuleModule` type isn't assignable — typescript-eslint#10396 / eslint#19155).
 * By erasing `rules` from the public type, core never type-checks them, while
 * the runtime object still registers them normally.
 *
 * This mirrors how typescript-eslint widens its own public `plugin`/`configs`
 * types to satisfy both `defineConfig()` and `tseslint.config()`:
 * https://github.com/typescript-eslint/typescript-eslint/blob/v8.60.1/packages/typescript-eslint/src/compatibility-types.ts
 */
const compatiblePlugin: { meta: { name: string } } = aneuholdPlugin;

/**
 * Flat-config fragment that registers the `aneuhold` plugin and enables its
 * rules. Drop it into a config block's `extends` array (or spread it into a
 * standalone config object); either way it inherits the host block's `files`
 * scope.
 */
export const aneuholdRules: Linter.Config = {
  plugins: {
    aneuhold: compatiblePlugin,
  },
  rules: {
    'aneuhold/no-private-modifier': 'error',
    'aneuhold/service-file-structure': 'error',
  },
};
