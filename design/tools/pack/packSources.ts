/**
 * - `sourceReader`, `SourceReader`, `Source` · a design file, by its repo path
 * - a module X.ts (its bundle X.js) is its sources: X.ts, then its parts by path
 * - `sha256`, `bytesOf`, `sheetDigest` · a text's digest and size, a sheet's digest
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { entryOfPart, filesOf, ROOT, sourceOf } from '../layout.ts';

interface Source {
  readonly path: string;
  readonly text: string;
}

interface SourceReader {
  readonly read: (file: string) => string | null;
  readonly sourcesOf: (name: string) => readonly Source[];
}

const sha256 = (text: string): string =>
  crypto.createHash('sha256').update(text, 'utf8').digest('hex');

const bytesOf = (text: string): number => Buffer.byteLength(text, 'utf8');

// one digest over a sheet's sources: each path, then its bytes, in path order
const sheetDigest = (sources: readonly Source[]): string =>
  sha256(sources.map((one) => `${one.path}\n${one.text}`).join('\n'));

// the parts an entry is bundled with, by their repo paths
const partsOf = (entry: string): readonly string[] =>
  filesOf()
    .filter((file) => entryOfPart(file) === entry)
    .sort();

// a short name where `tools/layout.ts` keeps it, or a repo path as it is
function homeOf(file: string): string | null {
  const home = sourceOf(file) ?? file;
  const full = path.join(ROOT, home);
  return fs.existsSync(full) && fs.statSync(full).isFile() ? home : null;
}

function sourceReader(): SourceReader {
  const cache = new Map<string, string | null>();
  const textOf = (home: string): string | null => {
    if (!cache.has(home))
      cache.set(home, fs.readFileSync(path.join(ROOT, home), 'utf8'));
    return cache.get(home) ?? null;
  };
  const read = (file: string): string | null => {
    const home = homeOf(file);
    return home === null ? null : textOf(home);
  };
  const sourcesOf = (name: string): readonly Source[] => {
    const entry = homeOf(name.replace(/\.js$/, '.ts'));
    const files = entry === null ? [] : [entry, ...partsOf(entry)];
    return files.flatMap((file) => {
      const text = textOf(file);
      return text === null ? [] : [{ path: file, text }];
    });
  };
  return { read, sourcesOf };
}

export { bytesOf, sha256, sheetDigest, sourceReader };
export type { Source, SourceReader };
