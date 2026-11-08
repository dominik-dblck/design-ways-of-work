/**
 * - `node tools/lint-files.ts` · no style, page or script file in the product
 * - `legacy/` and `poc/` aside until they retire; what the build writes is skipped
 */
import { runFileLint } from '../shared/lint/runFileLint.ts';
import { ROOT } from './root.ts';

process.exitCode = runFileLint({
  root: ROOT,
  folders: {},
  ignore: ['node_modules', 'dist', '.artifact', '.git', 'legacy', 'poc'],
});
