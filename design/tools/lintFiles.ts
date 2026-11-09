/**
 * - `node tools/lintFiles.ts` · case by kind; no style, page or script file
 * - `legacy/` and `poc/` until they retire, `vendor/` and git's ignores: aside
 * - a folder no home of `tools/layout.ts` names, nor the repository's own, fails
 */
import { scope } from '../scope.ts';
import { runFileLint } from '../shared/lint/runFileLint.ts';
import { folderRules } from './layout/folderRules.ts';

process.exitCode = runFileLint({
  scope,
  folders: folderRules(),
  ignore: ['.git', 'legacy', 'poc', 'vendor'],
});
