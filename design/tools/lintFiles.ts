/**
 * - `node tools/lintFiles.ts` · case by kind; no style, page or script file
 * - `legacy/` and `poc/` aside until they retire; what git ignores is skipped
 * - a folder no home of `tools/layout.ts` names, nor the repository's own, fails
 */
import { scope } from '../scope.ts';
import { runFileLint } from '../shared/lint/runFileLint.ts';
import { folderRules } from './layout/folderRules.ts';

process.exitCode = runFileLint({
  scope,
  folders: folderRules(),
  ignore: ['.git', 'legacy', 'poc'],
});
