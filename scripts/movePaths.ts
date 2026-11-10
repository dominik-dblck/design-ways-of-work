/**
 * - `importsMoved`, `mentioned`, `landingOf` · a moved file's imports and paths
 * - `barrelOf`, `isARoot`, `escaped`, `Move` · a component root's barrel, a move
 */
import path from 'node:path';

interface Move {
  readonly from: string;
  readonly to: string;
}

const SPECIFIER =
  /(from\s+|import\s*\(\s*|import\s+|export\s+\*\s+from\s+)(['"])(\.{1,2}\/[^'"]+)\2/g;
// a component's root in any tree of atomic tiers (docs/rules/components.md): app/, a renderer's, design/
const A_ROOT =
  /^(?:.+\/)?components\/(atoms|molecules|organisms|templates)\/([^/]+)\/\2\.tsx$/;
// a file named as its folder, which a barrel beside it may face for
const NAMED_FOR_ITS_FOLDER = /(?:^|\/)([^/]+)\/\1\.tsx$/;

const escaped = (text: string): string =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const isARoot = (file: string): boolean => A_ROOT.test(file);

// where a folder's barrel stands, read off the tree after the move
type Barrelled = (folder: string) => boolean;

// an import of a root, or of a file its folder's barrel faces for, lands on the barrel, unless from inside
function landingOf(
  target: string,
  {
    importer,
    isBarrelled,
  }: { readonly importer: string; readonly isBarrelled: Barrelled },
): string {
  const folder = path.posix.dirname(target);
  const isFaced =
    A_ROOT.test(target) ||
    (NAMED_FOR_ITS_FOLDER.test(target) && isBarrelled(folder));
  return !isFaced || importer.startsWith(`${folder}/`)
    ? target
    : `${folder}/index.ts`;
}

// a file's relative imports written again from where it now stands, to where each target now stands
function importsMoved(
  text: string,
  {
    file,
    moves,
    isBarrelled,
  }: {
    readonly file: string;
    readonly moves: ReadonlyMap<string, string>;
    readonly isBarrelled: Barrelled;
  },
): string {
  const now = moves.get(file) ?? file;
  return text.replace(
    SPECIFIER,
    (whole: string, lead: string, quote: string, spec: string) => {
      const target = path.posix.normalize(
        path.posix.join(path.posix.dirname(file), spec),
      );
      const moved = moves.get(target) ?? target;
      if (moved === target && now === file) return whole;
      const relative = path.posix.relative(
        path.posix.dirname(now),
        landingOf(moved, { importer: now, isBarrelled }),
      );
      return `${lead}${quote}${relative.startsWith('.') ? relative : `./${relative}`}${quote}`;
    },
  );
}

// an exact path, never a longer name holding it: `tools/a.ts` in `design/tools/a.ts` is the same file; a folder's `a/` leads a path
const mentioned = (text: string, moves: readonly Move[]): string =>
  moves.reduce(
    (now, { from, to }) =>
      now.replace(
        new RegExp(
          `(?<![\\w.-])${escaped(from)}${from.endsWith('/') ? '' : '(?![\\w-])'}`,
          'g',
        ),
        to,
      ),
    text,
  );

const barrelOf = (root: string): string => {
  const name = path.posix.basename(root, '.tsx');
  return `/**\n * - \`${name}\` · its face, read from outside its folder\n */\nexport { ${name} } from './${name}.tsx';\n`;
};

export { barrelOf, escaped, importsMoved, isARoot, landingOf, mentioned };
export type { Move };
