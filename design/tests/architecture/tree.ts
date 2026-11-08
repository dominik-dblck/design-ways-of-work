/**
 * - `ROOT`, `textsUnder`, `homeTexts`, `productionSources` · the files scans read
 * - `isGenerated`, `isSheet`, `isEntry`, `entryOf` · a file's kind
 * - `importsOf` · the relative imports a source makes, resolved to repository paths
 */
import fs from 'node:fs';
import path from 'node:path';
import { entryOfPart, filesOf, isEntry } from '../../tools/layout.ts';
import { ROOT } from '../../tools/root.ts';
import { isGenerated } from '../../shared/lint/header.ts';

export type Source = { readonly path: string; readonly text: string };

export { isGenerated, ROOT };

const NEVER_WALKED = ['node_modules', '.git', 'dist', 'poc', '.artifact'];

function filesUnder(from: string, endings: readonly string[]): string[] {
  if (!fs.existsSync(from)) return [];
  return fs.readdirSync(from, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(from, entry.name);
    if (entry.isDirectory())
      return NEVER_WALKED.includes(entry.name) ? [] : filesUnder(full, endings);
    return endings.some((ending) => entry.name.endsWith(ending)) ? [full] : [];
  });
}

export function textsUnder(
  root: string,
  endings: readonly string[],
): readonly Source[] {
  return filesUnder(path.join(ROOT, root), endings).map((file) => ({
    path: path.relative(ROOT, file).split(path.sep).join('/'),
    text: fs.readFileSync(file, 'utf8'),
  }));
}

const isTest = (file: string): boolean => /\.test(-d)?\.ts$/.test(file);


/** Every file the homes of `tools/layout.ts` hold that ends in one of the endings, as `Source`. */
export function homeTexts(endings: readonly string[]): readonly Source[] {
  return filesOf()
    .filter((file) => endings.some((ending) => file.endsWith(ending)))
    .map((file) => ({
      path: file,
      text: fs.readFileSync(path.join(ROOT, file), 'utf8'),
    }));
}

/** The hand-written code: the homes' `.ts`, the tools' `.ts` and `.mjs`; never a declaration or a test. */
export function productionSources(): readonly Source[] {
  return [
    ...homeTexts(['.ts']),
    ...textsUnder('tools', ['.ts', '.mjs']),
  ].filter(
    (source) =>
      !source.path.endsWith('.d.ts') &&
      !isTest(source.path) &&
      !isGenerated(source.text),
  );
}

/** A file of the sheet: an entry or a part of one, as `tools/layout.ts` places them. */
export const isSheet = (file: string): boolean =>
  isEntry(file) || entryOfPart(file) !== null;

export { isEntry };

/** The entry a part serves · null for an entry, a tool or a file outside the sheet. */
export const entryOf = (file: string): string | null => entryOfPart(file);

const AN_IMPORT =
  /^\s*(import|export)\s+(type\s+)?(?:[^'";]*?\s+from\s+)?['"]([^'"]+)['"]/gm;

export type Import = {
  readonly to: string;
  readonly typeOnly: boolean;
  readonly clause: string;
};

/** Each relative import a source makes, resolved against its folder · a package import is left out. */
// a source's imports, read once per text: the scans ask for them for every pair of files
const importsRead = new WeakMap<Source, readonly Import[]>();

export function importsOf(source: Source): readonly Import[] {
  const known = importsRead.get(source);
  if (known) return known;
  const found = [...source.text.matchAll(AN_IMPORT)].flatMap((match) => {
    const specifier = match[3];
    if (!specifier.startsWith('.')) return [];
    const to = path.posix.normalize(
      path.posix.join(path.posix.dirname(source.path), specifier),
    );
    return [{ to, typeOnly: match[2] !== undefined, clause: match[0] }];
  });
  importsRead.set(source, found);
  return found;
}
