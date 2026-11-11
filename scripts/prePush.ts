/**
 * - `node scripts/prePush.ts <remote> <url>` · git's pre-push: the feature tier
 * - a push that carries no commit its remote lacks checks nothing
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import { carried } from './pushCarries.ts';

const [, url = ''] = process.argv.slice(2);
// git's own variables stay: the hook acts on this repository, with the push's credentials
const commits = carried({
  root: process.cwd(),
  url,
  lines: fs.readFileSync(0, 'utf8'),
  env: process.env,
});
if (commits.length === 0)
  console.log('the push carries no commit its remote lacks: nothing to check');
else
  process.exitCode =
    spawnSync('yarn', ['-s', 'check:feature'], { stdio: 'inherit' }).status ??
    1;
