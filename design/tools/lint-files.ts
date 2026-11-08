/**
 * - `node tools/lint-files.ts` · no style, page or script file in the product
 * - `legacy/` and `poc/` aside until they retire; what the build writes is skipped
 * - a folder no home of `tools/layout.ts` names, nor the repository's own, fails
 */
import { scope } from '../scope.ts';
import { runFileLint } from '../shared/lint/runFileLint.ts';
import { folderRules } from './layout/folderRules.ts';

process.exitCode = runFileLint({
  scope,
  folders: folderRules(),
  ignore: ['node_modules', 'dist', '.artifact', '.git', 'legacy', 'poc'],
});
