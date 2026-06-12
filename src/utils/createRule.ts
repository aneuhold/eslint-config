import { ESLintUtils } from '@typescript-eslint/utils';

const REPO_URL = 'https://github.com/aneuhold/eslint-config';

/**
 * Shared `RuleCreator` for this package's custom ESLint rules. Each rule's
 * documentation URL points at the rule's own markdown file, which lives next to
 * its implementation at `src/rules/<rule-name>/<rule-name>.md`.
 */
export const createRule = ESLintUtils.RuleCreator(
  (name) => `${REPO_URL}/blob/main/src/rules/${name}/${name}.md`
);
