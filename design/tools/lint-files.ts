/**
 * - `node tools/lint-files.ts` · no style, page or script file in the product
 * - `legacy/` and `poc/` aside until they retire; what the build writes is skipped
 */
import { scope } from '../scope.ts';
import { runFileLint } from '../shared/lint/runFileLint.ts';

process.exitCode = runFileLint({
  scope,
  folders: {},
  ignore: ['node_modules', 'dist', '.artifact', '.git', 'legacy', 'poc'],
});
