/**
 * - `node scripts/rehearse.ts [product] [copy]` · a port rehearsal on a copy
 * - the product's files but the wow set, the rest hard-linked; then its port.patch
 * - `--check` · the copy still this repository's: each link, none added or gone
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {
  HERE,
  lastLinked,
  linkedFiles,
  linkedListOf,
  PRODUCT_REPO,
  repoAt,
} from './repos.ts';

const SOURCE = repoAt(PRODUCT_REPO);
const COPY = repoAt(path.join(HERE, '.rehearsal', path.basename(SOURCE)), 1);
const PATCH = path.join(HERE, 'ports', path.basename(SOURCE), 'port.patch');
const WOW_CATEGORY = /^(wow, |mixed check)/;

const inventory = fs
  .readFileSync(path.join(HERE, 'plan', 'inventory.tsv'), 'utf8')
  .split('\n')
  .slice(1)
  .filter(Boolean)
  .map((line) => line.split('\t'));
const WOW = new Set(
  inventory
    .filter(([, category]) => WOW_CATEGORY.test(category ?? ''))
    .map(([file]) => file ?? ''),
);

function commit(message: string): void {
  execFileSync('git', ['add', '-A'], { cwd: COPY });
  execFileSync(
    'git',
    [
      '-c',
      'user.name=rehearsal',
      '-c',
      'user.email=rehearsal@local',
      'commit',
      '-qm',
      message,
      '--no-verify',
    ],
    { cwd: COPY },
  );
}

// the product's tracked files, but the way of working's own, copied as they are
function copyProduct(): number {
  const tracked = execFileSync('git', ['ls-files'], {
    cwd: SOURCE,
    encoding: 'utf8',
  })
    .split('\n')
    .filter((file) => file !== '' && !WOW.has(file));
  for (const file of tracked) {
    const target = path.join(COPY, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(SOURCE, file), target);
  }
  return tracked.length;
}

function linkOne(here: string, target: string): void {
  try {
    fs.linkSync(here, target);
  } catch (error) {
    if (Object(error).code !== 'EXDEV') throw error;
    throw new Error(
      `${COPY} sits on another volume than ${HERE}: a hard link cannot cross volumes, so rehearse onto this one`,
      { cause: error },
    );
  }
}

// a hard link is the file itself at the product's path; the packages are linked whole
function linkHomes(): number {
  const files = linkedFiles();
  for (const [here, at] of files) {
    const target = path.join(COPY, at);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    linkOne(here, target);
  }
  fs.symlinkSync(
    path.join(HERE, 'node_modules'),
    path.join(COPY, 'node_modules'),
  );
  return files.length;
}

function applyPort(): boolean {
  if (!fs.existsSync(PATCH)) return false;
  execFileSync('git', ['apply', '--whitespace=nowarn', PATCH], {
    cwd: COPY,
    stdio: 'inherit',
  });
  commit('the port');
  return true;
}

// a link this repository replaced (a new file), a file it added, one it removed
function staleLinks(): readonly string[] {
  const files = linkedFiles();
  const kept = lastLinked(COPY);
  const now = new Set(files.map(([, at]) => at));
  const moved = files.flatMap(([here, at]) => {
    const there = path.join(COPY, at);
    return fs.existsSync(there) &&
      fs.statSync(there).ino === fs.statSync(here).ino
      ? []
      : [`${at} · not this repository's file now`];
  });
  return [
    ...moved,
    ...kept.filter((at) => !now.has(at)).map((at) => `${at} · gone here`),
  ];
}

function check(): void {
  const stale = staleLinks();
  for (const line of stale) console.log(`  STALE · ${line}`);
  console.log(
    stale.length === 0
      ? `${path.relative(HERE, COPY)} · every link this repository's file`
      : `${stale.length} stale: rehearse again (port-save first)`,
  );
  process.exitCode = stale.length === 0 ? 0 : 1;
}

function main(): void {
  fs.rmSync(COPY, { recursive: true, force: true });
  const copied = copyProduct();
  const linked = linkHomes();
  execFileSync('git', ['init', '-q'], { cwd: COPY });
  commit('the product, design/ linked');
  execFileSync('git', ['tag', 'product'], { cwd: COPY });
  fs.writeFileSync(
    linkedListOf(COPY),
    `${linkedFiles()
      .map(([, at]) => at)
      .join('\n')}\n`,
  );
  const isPatched = applyPort();
  console.log(
    `${path.relative(HERE, COPY) || COPY} · ${copied} product files copied, ${linked} files of design/, dev/, shared/ and design-system/ linked, ${isPatched ? 'the port applied' : 'no port'}`,
  );
}

if (process.argv.includes('--check')) check();
else main();
