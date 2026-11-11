/**
 * - `node scripts/move.ts <map.tsv> [product]` · files moved by a map of from, to
 * - each relative import and exact path follows; a component's root gets its barrel
 * - a product's checkout follows by its paths; a bare name is listed, never guessed
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { followed } from './followed.ts';
import { mapRows } from './mapRows.ts';
import {
  barrelOf,
  escaped,
  importsMoved,
  isARoot,
  mentioned,
} from './movePaths.ts';
import type { Move } from './movePaths.ts';
import { HOMES } from '../shared/take/takeHomes.ts';
import { HERE, repoAt } from './repos.ts';

interface Tree {
  readonly root: string;
  readonly files: readonly string[];
  readonly moves: readonly Move[];
}

const MAP = repoAt('', 0);
// a product's checkout, when one is handed in: its own files follow the move too
const [, HANDED_IN] = process.argv
  .slice(2)
  .filter((arg) => !arg.startsWith('--'));
const PRODUCT = HANDED_IN === undefined ? null : path.resolve(HANDED_IN);
const HOME_PAIRS = Object.entries(HOMES);
// notes name what moved since, a port is written by its script, legacy/ is kept as it was
const KEPT = /^(plan|legacy|ports)\//;
const CODE = /\.(ts|tsx|mts)$/;

// the product's own files name a taken file by its path there: design/ is its root
const inProduct = (moves: readonly Move[]): readonly Move[] =>
  moves.flatMap(({ from, to }) => {
    const home = HOME_PAIRS.find(([here]) => from.startsWith(`${here}/`));
    if (home === undefined || !to.startsWith(`${home[0]}/`)) return [];
    const at = (file: string): string =>
      path.posix.join(home[1], file.slice(home[0].length + 1));
    return [{ from: at(from), to: at(to) }];
  });

// each file read and written where it now stands; the count of those changed
function rewritten(tree: Tree): number {
  const moves = new Map(tree.moves.map(({ from, to }) => [from, to]));
  const texts = tree.files.map((file) => {
    const before = fs.readFileSync(
      path.join(tree.root, moves.get(file) ?? file),
      'utf8',
    );
    const code = CODE.test(file) ? imported(file, tree) : before;
    return [moves.get(file) ?? file, before, mentioned(code, tree.moves)];
  });
  for (const [file = '', , text = ''] of texts)
    fs.writeFileSync(path.join(tree.root, file), text);
  return texts.filter(([, before, after]) => before !== after).length;
}

const bareNames = (tree: Tree): readonly string[] =>
  tree.files.flatMap((file) => {
    const at = tree.moves.find((move) => move.from === file)?.to ?? file;
    const text = fs.readFileSync(path.join(tree.root, at), 'utf8');
    return tree.moves
      .map(({ from }) => path.posix.basename(from))
      .filter((name) =>
        new RegExp(`(?<![\\w/.-])${escaped(name)}(?![\\w-])`).test(text),
      )
      .map(
        (name) => `${path.relative(HERE, tree.root) || '.'}/${at} · ${name}`,
      );
  });

// a relative import of a moved file, or from one, written again from where each now stands
function imported(file: string, tree: Tree): string {
  const moves = new Map(tree.moves.map(({ from, to }) => [from, to]));
  const text = fs.readFileSync(
    path.join(tree.root, moves.get(file) ?? file),
    'utf8',
  );
  // a folder's barrel as the tree holds it once moved
  const isBarrelled = (folder: string): boolean =>
    fs.existsSync(path.join(tree.root, folder, 'index.ts'));
  return importsMoved(text, { file, moves, isBarrelled });
}

// a folder its moves leave empty goes with them
function movedByGit(moves: readonly Move[]): void {
  for (const { from, to } of moves) {
    fs.mkdirSync(path.dirname(path.join(HERE, to)), { recursive: true });
    execFileSync('git', ['mv', from, to], { cwd: HERE });
    const left = path.dirname(path.join(HERE, from));
    if (fs.readdirSync(left).length === 0) fs.rmdirSync(left);
  }
}

// a folder's row moves each file in it; a module's row, its parts' folder of its name too
function expanded(rows: readonly Move[]): readonly Move[] {
  const files = execFileSync('git', ['ls-files', '-z'], {
    cwd: HERE,
    encoding: 'utf8',
  }).split('\0');
  return rows.flatMap(({ from, to }) => {
    const [was, is] = [from.replace(CODE, ''), to.replace(CODE, '')];
    const inside = files
      .filter((file) => file.startsWith(`${was}/`))
      .map((file) => ({ from: file, to: `${is}${file.slice(was.length)}` }));
    return CODE.test(from) ? [{ from, to }, ...inside] : inside;
  });
}

// the product's own files a move rewrites: its git lists none of the files it took
const productFiles = (): Promise<readonly string[]> =>
  PRODUCT === null
    ? Promise.resolve([])
    : followed({ root: PRODUCT, kept: KEPT });

async function main(): Promise<void> {
  const moves = expanded(
    mapRows(MAP).map(([from = '', to = '']) => ({ from, to })),
  );
  const here: Tree = {
    root: HERE,
    files: await followed({ root: HERE, kept: KEPT }),
    moves,
  };
  const there: Tree = {
    root: PRODUCT ?? HERE,
    files: await productFiles(),
    moves: inProduct(moves),
  };
  movedByGit(moves);
  // a home's file names another by its product's path; this repository's own, by its own
  const isOfAHome = (file: string): boolean =>
    HOME_PAIRS.some(([home]) => file.startsWith(`${home}/`));
  const changed =
    rewritten({
      ...here,
      files: here.files.filter(isOfAHome),
      moves: [...moves, ...there.moves],
    }) +
    rewritten({
      ...here,
      files: here.files.filter((file) => !isOfAHome(file)),
    });
  const copied = rewritten(there);
  const roots = moves.map(({ to }) => to).filter(isARoot);
  for (const root of roots)
    fs.writeFileSync(
      path.join(HERE, path.posix.dirname(root), 'index.ts'),
      barrelOf(root),
    );
  console.log(
    `${moves.length} moved, ${roots.length} barrels · ${changed} files rewritten here, ${copied} in ${PRODUCT === null ? 'no product' : path.basename(PRODUCT)}`,
  );
  for (const line of [...bareNames(here), ...bareNames(there)])
    console.log(`  BARE · ${line}`);
}

await main();
