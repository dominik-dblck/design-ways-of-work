/**
 * - `node scripts/move.ts <map.tsv> [copy]` · files moved by a map of from, to
 * - each relative import and exact path follows; a component's root gets its barrel
 * - a copy's own files by its paths; a name left bare is listed, never guessed
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { RepoScope } from '../shared/repoScope.ts';
import { isNamedBy } from '../shared/tests/globs.ts';
import { mapRows } from './mapRows.ts';
import { HERE, lastLinked, LINKED_HOMES, repoAt } from './repos.ts';

interface Move {
  readonly from: string;
  readonly to: string;
}

// a tree's text files, read before the moves; the moves by its own paths
interface Tree {
  readonly root: string;
  readonly files: readonly string[];
  readonly moves: readonly Move[];
}

const MAP = repoAt('', 0);
const COPY = repoAt(path.join(HERE, '.rehearsal', 'eagle-design'), 1);
// notes name what moved since, a port is written by its script, legacy/ is kept as it was
const KEPT = /^(plan|legacy|ports)\//;
const TEXT = /\.(ts|tsx|mts|md|json|yml|yaml|tsv|txt)$/;
const CODE = /\.(ts|tsx|mts)$/;
const PROSE = /\.md$/;
const SPECIFIER =
  /(from\s+|import\s*\(\s*|import\s+|export\s+\*\s+from\s+)(['"])(\.{1,2}\/[^'"]+)\2/g;
const A_ROOT =
  /^(?:design\/)?app\/components\/(atoms|molecules|organisms|templates)\/([^/]+)\/\2\.tsx$/;

const escaped = (text: string): string =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const hasScope = (loaded: unknown): loaded is { readonly scope: RepoScope } =>
  typeof loaded === 'object' && loaded !== null && 'scope' in loaded;

// a doc whose paths are checked follows a move; any other prose, a note or a record, names what was
async function followed(root: string): Promise<readonly string[]> {
  const loaded: unknown = await import(
    pathToFileURL(path.join(root, 'scope.ts')).href
  );
  if (!hasScope(loaded)) throw new Error(`no scope in ${root}/scope.ts`);
  const { docs } = loaded.scope.namedPaths;
  return execFileSync('git', ['ls-files', '-z'], {
    cwd: root,
    encoding: 'utf8',
  })
    .split('\0')
    .filter((file) => TEXT.test(file) && !KEPT.test(file))
    .filter((file) => !PROSE.test(file) || isNamedBy(file, docs));
}

// the product's own files name a linked file by its path there: design/ is its root
const inProduct = (moves: readonly Move[]): readonly Move[] =>
  moves.flatMap(({ from, to }) => {
    const home = LINKED_HOMES.find(([here]) => from.startsWith(`${here}/`));
    if (home === undefined || !to.startsWith(`${home[0]}/`)) return [];
    const at = (file: string): string =>
      path.posix.join(home[1], file.slice(home[0].length + 1));
    return [{ from: at(from), to: at(to) }];
  });

// where an import of a moved root lands: the barrel, unless the importer sits in the component's own folder
function landingOf(target: string, importer: string): string {
  if (!A_ROOT.test(target)) return target;
  const folder = path.posix.dirname(target);
  return importer.startsWith(`${folder}/`) ? target : `${folder}/index.ts`;
}

// a relative import of a moved file, or from one, written again from where each now stands
function imported(file: string, tree: Tree): string {
  const moves = new Map(tree.moves.map(({ from, to }) => [from, to]));
  const now = moves.get(file) ?? file;
  const text = fs.readFileSync(path.join(tree.root, now), 'utf8');
  return text.replace(
    SPECIFIER,
    (whole, lead: string, quote: string, spec: string) => {
      const target = path.posix.normalize(
        path.posix.join(path.posix.dirname(file), spec),
      );
      const moved = moves.get(target) ?? target;
      if (moved === target && now === file) return whole;
      const relative = path.posix.relative(
        path.posix.dirname(now),
        landingOf(moved, now),
      );
      return `${lead}${quote}${relative.startsWith('.') ? relative : `./${relative}`}${quote}`;
    },
  );
}

// an exact path, never a longer name holding it: `tools/a.ts` in `design/tools/a.ts` is the same file
const mentioned = (text: string, moves: readonly Move[]): string =>
  moves.reduce(
    (now, { from, to }) =>
      now.replace(
        new RegExp(`(?<![\\w.-])${escaped(from)}(?![\\w-])`, 'g'),
        to,
      ),
    text,
  );

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

// a name with its folder unsaid
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

const barrelOf = (root: string): string => {
  const name = path.posix.basename(root, '.tsx');
  return `/**\n * - \`${name}\` · its face, read from outside its folder\n */\nexport { ${name} } from './${name}.tsx';\n`;
};

async function main(): Promise<void> {
  const moves = mapRows(MAP).map(([from = '', to = '']) => ({ from, to }));
  const linked = new Set(lastLinked(COPY));
  const here: Tree = { root: HERE, files: await followed(HERE), moves };
  const there: Tree = {
    root: COPY,
    files: fs.existsSync(COPY)
      ? (await followed(COPY)).filter((file) => !linked.has(file))
      : [],
    moves: inProduct(moves),
  };
  for (const { from, to } of moves) {
    fs.mkdirSync(path.dirname(path.join(HERE, to)), { recursive: true });
    execFileSync('git', ['mv', from, to], { cwd: HERE });
  }
  // a linked file names another by its product's path, here too
  const changed = rewritten({ ...here, moves: [...moves, ...there.moves] });
  const copied = rewritten(there);
  const roots = moves.map(({ to }) => to).filter((to) => A_ROOT.test(to));
  for (const root of roots)
    fs.writeFileSync(
      path.join(HERE, path.posix.dirname(root), 'index.ts'),
      barrelOf(root),
    );
  console.log(
    `${moves.length} moved, ${roots.length} barrels · ${changed} files rewritten here, ${copied} in ${path.relative(HERE, COPY)}`,
  );
  for (const line of [...bareNames(here), ...bareNames(there)])
    console.log(`  BARE · ${line}`);
}

await main();
