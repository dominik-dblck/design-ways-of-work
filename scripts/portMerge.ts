/**
 * - `node scripts/portMerge.ts <name> <checkout>` · a port's branch takes its trunk
 * - a merge left uncommitted, each conflict settled by the port's rules or listed
 * - prints what it settled, what to read, and each row `ports/` is to carry
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { CONSUMERS } from '../ports/consumers.ts';
import { followed } from './followed.ts';
import { mapRows } from './mapRows.ts';
import { importsAnew, namedAnew } from './portNames.ts';
import { gitAt, ruledOn, unmerged } from './portSettle.ts';
import { snapshotText } from '../design/guards/checks/snapshotModule.ts';
import { HERE } from './repos.ts';
import { childEnv } from './scratch.ts';

const [NAME = '', HANDED = ''] = process.argv.slice(2);
const ROOT = path.resolve(HANDED);
// what a move never rewrites there: a record, a note, a legacy copy
const KEPT = /^(legacy|records|notes)\//;

function refused(why: string): never {
  console.error(`portMerge · ${why}`);
  process.exit(2);
}

const consumer = CONSUMERS.find(({ name }) => name === NAME);
const port = consumer?.port ?? refused(`ports/ names no port ${NAME}`);
const git = gitAt(ROOT);
const moves = mapRows(path.join(HERE, port.moves)).map(
  ([from = '', to = '']) => ({ from, to }),
);
const at = (file: string): string => path.join(ROOT, file);

// a snapshot the trunk moved since the branch last took it, written as the module the port holds
function rewritten(since: string): readonly string[] {
  return port.rewritten.flatMap(({ from, to, name }) => {
    if (git(['diff', '--name-only', since, port.trunk, '--', from]) === '')
      return [];
    const taken: unknown = JSON.parse(git(['show', `${port.trunk}:${from}`]));
    fs.writeFileSync(
      at(to),
      namedAnew(snapshotText(name, taken), { moves, names: port.names }),
    );
    git(['add', '--', to]);
    return [to];
  });
}

// each file the merge brought, its imports and its names as the port's moves left them
async function namedAgain(skipped: readonly string[]): Promise<number> {
  const brought = new Set(
    git(['diff', '--cached', '--name-only', '--diff-filter=AM', 'HEAD'])
      .split('\n')
      .filter((file) => file !== '' && !skipped.includes(file)),
  );
  const texts = (await followed({ root: ROOT, kept: KEPT }))
    .filter((file) => brought.has(file))
    .map((file) => {
      const before = fs.readFileSync(at(file), 'utf8');
      const exists = (one: string): boolean => fs.existsSync(at(one));
      const after = namedAnew(importsAnew(before, { file, moves, exists }), {
        moves,
        names: port.names,
      });
      return { file, before, after };
    })
    .filter(({ before, after }) => before !== after);
  for (const { file, after } of texts) {
    fs.writeFileSync(at(file), after);
    git(['add', '--', file]);
  }
  return texts.length;
}

async function main(): Promise<void> {
  if (consumer === undefined) return;
  if (git(['rev-parse', '--abbrev-ref', 'HEAD']) !== consumer.ref)
    refused(`${ROOT} does not stand on ${consumer.ref}`);
  if (git(['status', '--porcelain']) !== '')
    refused(`${ROOT} holds uncommitted work`);
  const since = git(['merge-base', 'HEAD', port.trunk]);
  git(['merge', '--no-commit', '--no-ff', port.trunk], { mayFail: true });
  const lines = unmerged(git).map((conflict) =>
    ruledOn({ conflict, git, root: ROOT, port, moves }),
  );
  const snapshots = rewritten(since);
  const renamed = await namedAgain(snapshots);
  // the merge wrote the trunk's copy over a file the take holds there, and settling it removed the file
  execFileSync('yarn', ['-s', 'wow'], { cwd: ROOT, env: childEnv() });
  for (const line of lines) console.log(line);
  for (const file of snapshots)
    console.log(`REWRITTEN · ${file} · the trunk's value, as a module`);
  console.log(
    `${String(lines.length)} conflicts read, ${String(snapshots.length)} snapshots written again, ${String(renamed)} files named again, the take run again; nothing committed`,
  );
  const left = unmerged(git).length;
  if (left > 0)
    console.log(`${String(left)} left unmerged: settle each by hand`);
  process.exitCode = left > 0 ? 1 : 0;
}

await main();
