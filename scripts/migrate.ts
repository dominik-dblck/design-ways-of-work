/**
 * - `node scripts/migrate.ts <name> <checkout>` · a repository's own checkout
 * - made ready for the release in hand, as the gate makes its clone: no commit
 */
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { CONSUMERS } from '../ports/consumers.ts';
import { versionTaken } from './consumerClones.ts';
import { migratedDue } from './migrated.ts';
import { HERE } from './repos.ts';
import { childEnv } from './scratch.ts';

const [NAME = '', HANDED = ''] = process.argv.slice(2);

function refused(why: string): never {
  console.error(`migrate · ${why}`);
  process.exit(2);
}

const consumer =
  CONSUMERS.find(({ name }) => name === NAME) ??
  refused(`ports/consumers.ts names no repository ${NAME}`);
if (HANDED === '') refused('no checkout: migrate.ts <name> <checkout>');
const root = path.resolve(HANDED);
const branch = execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
  cwd: root,
  encoding: 'utf8',
  env: childEnv(),
}).trim();
// the branch that takes the way of working, and no other: a trunk is never migrated by mistake
if (branch !== consumer.ref)
  refused(`${root} does not stand on ${consumer.ref}`);

const { migrations } = consumer;
const pinned = versionTaken(root);
for (const line of migratedDue({ root, wow: HERE, migrations, pinned }))
  console.log(line);
