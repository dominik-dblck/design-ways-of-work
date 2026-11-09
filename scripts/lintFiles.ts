/**
 * - `node scripts/lintFiles.ts` · case by kind; no style, page or script file
 * - design/ and dev/ are a product's, linted in its copy; legacy/ is kept as it was
 */
import { scope } from '../scope.ts';
import { runFileLint } from '../shared/lint/runFileLint.ts';

process.exitCode = runFileLint({
  scope,
  folders: {
    'design-system': { '.ttf': 'regex:[A-Z][A-Za-z]+-[A-Z][A-Za-z]+' },
    tests: { '.json': 'camelCase' },
    plan: { '.tsv': 'kebab-case' },
    ports: { '.patch': 'kebab-case' },
  },
  ignore: ['.git', 'design', 'dev', 'legacy'],
});
