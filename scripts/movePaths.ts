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
const A_ROOT =
  /^(?:design\/)?app\/components\/(atoms|molecules|organisms|templates)\/([^/]+)\/\2\.tsx$/;

const escaped = (text: string): string =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const isARoot = (file: string): boolean => A_ROOT.test(file);

// where an import of a moved root lands: the barrel, unless the importer sits in the component's own folder
function landingOf(target: string, importer: string): string {
  if (!A_ROOT.test(target)) return target;
  const folder = path.posix.dirname(target);
  return importer.startsWith(`${folder}/`) ? target : `${folder}/index.ts`;
}

// a file's relative imports written again from where it now stands, to where each target now stands
function importsMoved(
  text: string,
  {
    file,
    moves,
  }: { readonly file: string; readonly moves: ReadonlyMap<string, string> },
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

const barrelOf = (root: string): string => {
  const name = path.posix.basename(root, '.tsx');
  return `/**\n * - \`${name}\` · its face, read from outside its folder\n */\nexport { ${name} } from './${name}.tsx';\n`;
};

export { barrelOf, escaped, importsMoved, isARoot, landingOf, mentioned };
export type { Move };
