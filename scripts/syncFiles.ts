/**
 * - `copiedFrom` · the files a sha gives the theme and its atoms, their closure
 * - `specified` · a file's imports written for this side: relative, with extension
 * - `reviewRefusal` · why a sha's review record refuses its copy; null, it passes
 */
import path from 'node:path';

// what the copy starts from, in the build repository; what it never takes
interface CopySet {
  // the home the copy lands in, on the build side's own paths
  readonly into: string;
  readonly seeds: readonly string[];
  // imported where it stands, never copied: the product holds its own
  readonly provided: readonly string[];
  readonly left: readonly RegExp[];
  // the architecture review a sha passed there, `{sha}` its first eight characters
  readonly reviewed: string;
}

const A_FIELD = /^([a-z][\w-]*):\s*(\S+)\s*$/gm;

// a sha leaves the build side reviewed (W105): its record names it as its head, and passes it
function reviewRefusal({
  record,
  sha,
}: {
  readonly record: string | null;
  readonly sha: string;
}): string | null {
  if (record === null) return 'no architecture review record';
  const fields = new Map(
    [...record.matchAll(A_FIELD)].map(([, key = '', value = '']) => [
      key,
      value,
    ]),
  );
  if (fields.get('head') !== sha)
    return `its review record's head is ${fields.get('head') ?? 'unnamed'}`;
  if (fields.get('verdict') !== 'pass')
    return `its review's verdict is ${fields.get('verdict') ?? 'unwritten'}`;
  return null;
}

const SOURCE = /\.(?:ts|tsx)$/;
const CANDIDATES = ['', '.ts', '.tsx', '/index.ts', '/index.tsx'];
const SPECIFIER = /(\bfrom\s+|\bimport\s+)'([^']+)'/g;
const ALIAS = '@/';

const isLocal = (specifier: string): boolean =>
  specifier.startsWith('.') || specifier.startsWith(ALIAS);

// a specifier as the build repository resolves it: its alias the root, an extension or an index tried
function resolved({
  from,
  specifier,
  files,
}: {
  readonly from: string;
  readonly specifier: string;
  readonly files: ReadonlySet<string>;
}): string {
  const base = specifier.startsWith(ALIAS)
    ? specifier.slice(ALIAS.length)
    : path.posix.join(path.posix.dirname(from), specifier);
  const found = CANDIDATES.map((ending) => `${base}${ending}`).find((one) =>
    files.has(one),
  );
  if (found === undefined)
    throw new Error(`sync · ${from} · ${specifier} resolves to no file`);
  return found;
}

const specifiersOf = (text: string): readonly string[] =>
  [...text.matchAll(SPECIFIER)].map(([, , specifier = '']) => specifier);

// the seeds, then every local file they import, the left ones never; a package's import stays a package's
function copiedFrom({
  set,
  read,
  files,
}: {
  readonly set: CopySet;
  readonly read: (file: string) => string;
  readonly files: ReadonlySet<string>;
}): readonly string[] {
  const isLeft = (file: string): boolean =>
    set.left.some((pattern) => pattern.test(file));
  const taken = new Set<string>();
  const queue = [...files].filter(
    (file) =>
      SOURCE.test(file) &&
      !isLeft(file) &&
      set.seeds.some((seed) => file === seed || file.startsWith(seed)),
  );
  for (let file = queue.shift(); file !== undefined; file = queue.shift()) {
    if (taken.has(file)) continue;
    taken.add(file);
    const from = file;
    for (const specifier of specifiersOf(read(file)).filter(isLocal)) {
      const target = resolved({ from, specifier, files });
      if (isLeft(target))
        throw new Error(`sync · ${from} imports ${target}, which stays there`);
      if (!set.provided.includes(target)) queue.push(target);
    }
  }
  return [...taken].sort((one, other) => one.localeCompare(other));
}

// each local import as this side writes it: relative to the file, with its extension
function specified({
  file,
  text,
  files,
}: {
  readonly file: string;
  readonly text: string;
  readonly files: ReadonlySet<string>;
}): string {
  return text.replace(SPECIFIER, (whole, lead: string, specifier: string) => {
    if (!isLocal(specifier)) return whole;
    const target = resolved({ from: file, specifier, files });
    const relative = path.posix.relative(path.posix.dirname(file), target);
    return `${lead}'${relative.startsWith('.') ? relative : `./${relative}`}'`;
  });
}

export { copiedFrom, reviewRefusal, specified };
export type { CopySet };
