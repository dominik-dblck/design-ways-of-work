/**
 * - `node scripts/moveProduct.ts <map.tsv> [copy]` · a product's files, moved
 * - its own move in the copy, a linked one here too; every reader follows
 * - its map whole to ports/<product>/moves.tsv; records, notes, snapshots stay
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { followed, TEXT } from './followed.ts';
import { mapRows } from './mapRows.ts';
import { escaped, importsMoved, mentioned } from './movePaths.ts';
import type { Move } from './movePaths.ts';
import { HERE, lastLinked, LINKED_HOMES, repoAt } from './repos.ts';

const MAP = repoAt('', 0);
const COPY = repoAt(path.join(HERE, '.rehearsal', 'eagle-design'), 1);
const MOVES = path.join(HERE, 'ports', path.basename(COPY), 'moves.tsv');
// a record and a note name what was; a snapshot moves only with its retake, the PM's word
const KEPT = /^(records|notes|legacy)\/|^guards\/__snapshots__\//;
// this repository's notes, ports and legacy are kept as they were, its rehearsals are copies
const KEPT_HERE = /^(plan|ports|legacy|\.rehearsal)\//;
const CODE = /\.(ts|tsx|mts)$/;
const LEGACY_PAGE = /^legacy\/.+\.html$/;
const BUNDLED = /\.(ts|json)$/;

interface Tree {
  readonly root: string;
  readonly moves: readonly Move[];
  readonly names: readonly Move[];
}

const trackedOf = (root: string): readonly string[] =>
  execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' })
    .split('\0')
    .filter(Boolean);

// a module's row moves its parts' folder of its name too
function expanded(
  rows: readonly Move[],
  files: readonly string[],
): readonly Move[] {
  return rows.flatMap(({ from, to }) => {
    const [was, is] = [from.replace(BUNDLED, ''), to.replace(BUNDLED, '')];
    const inside = files
      .filter((file) => file.startsWith(`${was}/`))
      .map((file) => ({ from: file, to: `${is}${file.slice(was.length)}` }));
    return [{ from, to }, ...inside];
  });
}

// the names a row's file goes by: its bundle, its own name, its parts' folder by path or by name, a regex's
const namesOf = (rows: readonly Move[]): readonly Move[] =>
  rows.flatMap(({ from, to }) => {
    const stem = (file: string): string =>
      path.posix.basename(file).replace(BUNDLED, '');
    return [
      { from: `${stem(from)}.js`, to: `${stem(to)}.js` },
      { from: path.posix.basename(from), to: path.posix.basename(to) },
      ...['js', 'ts', 'json'].map((extension) => ({
        from: `${stem(from)}\\.${extension}`,
        to: `${stem(to)}\\.${extension}`,
      })),
      {
        from: `${from.replace(BUNDLED, '')}/`,
        to: `${to.replace(BUNDLED, '')}/`,
      },
      { from: `${stem(from)}/`, to: `${stem(to)}/` },
    ];
  });

// a bare name another file or folder carries too would be renamed in both: refused before anything moves
const sharedNames = ({
  names,
  files,
  moves,
}: {
  readonly names: readonly Move[];
  readonly files: readonly string[];
  readonly moves: readonly Move[];
}): readonly string[] => {
  const moving = new Set(moves.map(({ from }) => from));
  const carries = (file: string, from: string): boolean =>
    from.endsWith('/')
      ? file.split('/').slice(0, -1).includes(from.slice(0, -1))
      : path.posix.basename(file) === from;
  return names
    .filter(({ from }) => !from.slice(0, -1).includes('/'))
    .flatMap(({ from }) =>
      files
        .filter((file) => carries(file, from) && !moving.has(file))
        .map((file) => `${from} · also ${file}`),
    );
};

// a product's path as this repository holds it, for a linked file: design/ is its root
function hereOf(file: string): string {
  const home =
    LINKED_HOMES.find(([, at]) => at !== '' && file.startsWith(`${at}/`)) ??
    LINKED_HOMES.find(([, at]) => at === '');
  if (home === undefined) throw new Error(`no home holds ${file}`);
  const [here, at] = home;
  return path.posix.join(here, at === '' ? file : file.slice(at.length + 1));
}

// moved by git where it is tracked; a folder a move leaves empty goes
function movedIn(root: string, moves: readonly Move[]): void {
  for (const { from, to } of moves) {
    fs.mkdirSync(path.dirname(path.join(root, to)), { recursive: true });
    execFileSync('git', ['mv', from, to], { cwd: root });
    const left = path.dirname(path.join(root, from));
    if (fs.readdirSync(left).length === 0) fs.rmdirSync(left);
  }
}

// a file read where it now stands, its imports and its paths written again
function rewritten(file: string, tree: Tree): boolean {
  const map = new Map(tree.moves.map(({ from, to }) => [from, to]));
  const at = path.join(tree.root, map.get(file) ?? file);
  const before = fs.readFileSync(at, 'utf8');
  const isBarrelled = (folder: string): boolean =>
    fs.existsSync(path.join(tree.root, folder, 'index.ts'));
  const code = CODE.test(file)
    ? importsMoved(before, { file, moves: map, isBarrelled })
    : before;
  const after = mentioned(mentioned(code, tree.moves), tree.names);
  if (after !== before) fs.writeFileSync(at, after);
  return after !== before;
}

// a legacy page loads its bundles by name: those paths follow, its drawing stays
function scriptsMoved(file: string, names: readonly Move[]): boolean {
  const at = path.join(COPY, file);
  const before = fs.readFileSync(at, 'utf8');
  const after = names
    .filter(({ from }) => from.endsWith('.js'))
    .reduce(
      (now, { from, to }) =>
        now.replace(
          new RegExp(
            `(<script\\b[^>]*\\bsrc=["'][^"']*?)(?<![\\w.-])${escaped(from)}(["'])`,
            'g',
          ),
          `$1${to}$2`,
        ),
      before,
    );
  if (after !== before) fs.writeFileSync(at, after);
  return after !== before;
}

async function main(): Promise<void> {
  const files = trackedOf(COPY);
  const rows = mapRows(MAP).map(([from = '', to = '']) => ({ from, to }));
  const moves = expanded(rows, files);
  const names = namesOf(rows);
  const clashes = sharedNames({ names, files, moves });
  if (clashes.length > 0)
    throw new Error(`a name another file carries too:\n${clashes.join('\n')}`);
  const linked = new Set(lastLinked(COPY));
  const ownHere = trackedOf(HERE).filter(
    (file) =>
      TEXT.test(file) &&
      !KEPT_HERE.test(file) &&
      !LINKED_HOMES.some(([here]) => file.startsWith(`${here}/`)),
  );
  const texts = await followed({ root: COPY, kept: KEPT });
  movedIn(COPY, moves);
  const movesHere = moves
    .filter(({ from }) => linked.has(from))
    .map(({ from, to }) => ({ from: hereOf(from), to: hereOf(to) }));
  movedIn(HERE, movesHere);
  const changed = texts.filter((file) =>
    rewritten(file, { root: COPY, moves, names }),
  ).length;
  const changedHere = ownHere.filter((file) =>
    // its own files name a product's by their path here, never a bare name: a test's own example stays
    rewritten(file, { root: HERE, moves: movesHere, names: [] }),
  ).length;
  const loaded = files
    .filter((file) => LEGACY_PAGE.test(file))
    .filter((file) => scriptsMoved(file, names)).length;
  fs.writeFileSync(
    MOVES,
    `${['# from\tto · each file a product moved, at its paths', ...moves.map(({ from, to }) => `${from}\t${to}`)].join('\n')}\n`,
  );
  console.log(
    `${moves.length} moved, ${movesHere.length} of them here · ${changed} files rewritten there, ${changedHere} here · ${loaded} legacy pages' scripts`,
  );
}

await main();
