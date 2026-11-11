/**
 * - `node scripts/prePush.ts <remote> <url>` · git's pre-push: the feature tier
 * - a push that carries no commit to check checks nothing
 * - one the checks would not read as pushed is refused
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import { carried, misread } from './pushCarries.ts';

const [, url = ''] = process.argv.slice(2);
// git's own variables stay: the hook acts on this repository, with the push's credentials
const push = {
  root: process.cwd(),
  url,
  lines: fs.readFileSync(0, 'utf8'),
  env: process.env,
};
const sent = carried(push);
const why = misread(
  push,
  sent.map(({ tip }) => tip),
);
if (sent.length === 0)
  console.log(
    'the push carries no commit to check: the remote holds each, under its ref or under main',
  );
else if (why === undefined)
  process.exitCode =
    spawnSync('yarn', ['-s', 'check:feature'], { stdio: 'inherit' }).status ??
    1;
else {
  console.error(`no push · ${why}`);
  process.exitCode = 1;
}
