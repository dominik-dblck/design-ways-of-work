/**
 * - `node scripts/lintFiles.ts` · case by kind; no style, page or script file
 * - design/ and dev/ are a product's, linted in its copy; legacy/ is kept as it was
 */
import { scope } from '../scope.ts';
import { runFileLint } from '../shared/lint/runFileLint.ts';

process.exitCode = runFileLint({
  scope,
  folders: {},
  ignore: ['.git', 'design', 'dev', 'legacy'],
});
