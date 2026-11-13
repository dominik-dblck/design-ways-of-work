/**
 * - `movedTo`, `movedFrom` · a product's path after the moves of its port, before
 * - `standingMoves` · the moves the port's tree stands on, none undone since
 * - `namedAnew`, `importsAnew` · an old text's paths and imports, as after them
 */
import path from 'node:path';
import { escaped, mentioned } from './movePaths.ts';
import type { Move } from './movePaths.ts';
import type { Port } from './portTypes.ts';

const SPECIFIER =
  /(from\s+|import\s*\(\s*|import\s+)(['"])(\.{1,2}\/[^'"]+)\2/g;
const STEM = /\.[a-z]+$/;

// a folder's move, read off the files moved out of it: a file the trunk adds there follows
function folderMoves(moves: readonly Move[]): readonly Move[] {
  const pairs = new Map(
    moves.flatMap(({ from, to }) => {
      const [was, is] = [path.posix.dirname(from), path.posix.dirname(to)];
      return was === is ? [] : [[`${was}/`, `${is}/`] as const];
    }),
  );
  // the longest first: a folder inside a moved folder
  return [...pairs]
    .map(([from, to]) => ({ from, to }))
    .sort((one, other) => other.from.length - one.from.length);
}

function movedTo(file: string, moves: readonly Move[]): string {
  const own = moves.find(({ from }) => from === file);
  if (own) return own.to;
  const folder = folderMoves(moves).find(({ from }) => file.startsWith(from));
  return folder ? `${folder.to}${file.slice(folder.from.length)}` : file;
}

// a move whose old path the tree holds and whose new one it does not was undone since: naming by it would point nowhere
const standingMoves = (
  moves: readonly Move[],
  holds: (file: string) => boolean,
): readonly Move[] => moves.filter(({ from, to }) => holds(to) || !holds(from));

const turned = (moves: readonly Move[]): readonly Move[] =>
  moves.map(({ from, to }) => ({ from: to, to: from }));

const movedFrom = (file: string, moves: readonly Move[]): string =>
  movedTo(file, turned(moves));

// a file's bare name, where every file of that name moved to one name: as source, and as the build names it
function bareNames(moves: readonly Move[]): ReadonlyMap<string, string> {
  const stems = moves
    .map(({ from, to }) =>
      [from, to].map((file) => path.posix.basename(file).replace(STEM, '')),
    )
    .filter(([was, is]) => was !== is);
  const targets = (was: string): ReadonlySet<string> =>
    new Set(stems.filter(([one]) => one === was).map(([, is = '']) => is));
  return new Map(
    stems.flatMap(([was = '', is = '']) =>
      targets(was).size === 1 ? [[was, is] as const] : [],
    ),
  );
}

// a name the port changed beyond a move, where it stands bare: never the tail of a path
const renamed = (text: string, names: Port['names']): string =>
  names.reduce(
    (now, [was, is]) =>
      now.replace(
        new RegExp(`(?<![\\w/.-])${escaped(was)}(?![\\w-])`, 'g'),
        is,
      ),
    text,
  );

interface Naming {
  readonly moves: readonly Move[];
  readonly names?: Port['names'];
}

function namedAnew(text: string, { moves, names = [] }: Naming): string {
  const withPaths = renamed(
    mentioned(text, [...moves, ...folderMoves(moves)]),
    names,
  );
  return [...bareNames(moves)].reduce(
    (now, [was, is]) =>
      now.replace(
        new RegExp(
          `(?<![\\w.-])${escaped(was)}(\\.(?:tsx?|js))(?![\\w-])`,
          'g',
        ),
        `${is}$1`,
      ),
    withPaths,
  );
}

interface Standing {
  // where the file stands now, and where it stood before the moves
  readonly file: string;
  readonly moves: readonly Move[];
  readonly exists: (file: string) => boolean;
}

// an import written before the moves reads from where the file stood: one that resolves as it stands is left
function importsAnew(text: string, { file, moves, exists }: Standing): string {
  const here = path.posix.dirname(file);
  const there = path.posix.dirname(movedFrom(file, moves));
  return text.replace(
    SPECIFIER,
    (whole: string, lead: string, quote: string, spec: string) => {
      if (exists(path.posix.normalize(path.posix.join(here, spec))))
        return whole;
      const target = movedTo(
        path.posix.normalize(path.posix.join(there, spec)),
        moves,
      );
      if (!exists(target)) return whole;
      const relative = path.posix.relative(here, target);
      return `${lead}${quote}${relative.startsWith('.') ? relative : `./${relative}`}${quote}`;
    },
  );
}

export { importsAnew, movedFrom, movedTo, namedAnew, standingMoves };
