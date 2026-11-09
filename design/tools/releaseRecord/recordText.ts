/**
 * - `MARK`, `recordSections` · where a record's digests start, and the digests
 * - `recordFaults` · each module or file line whose digest the tree no longer has
 */
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { readModules } from './readModules.ts';
import { sheetDigest, sourceReader } from '../pack/packSources.ts';
import { ROOT } from '../root.ts';
import * as PROJECT from '../../sheet/project.ts';

const MARK = '## Every module the build side reads, with what they import';
const MODULE_LINE = /^- (\S+) · (\d+) files · module sha256 ([0-9a-f]{64})$/;
const FILE_LINE = /^- (\S+) · sha256 ([0-9a-f]{64})$/;
const OTHERS = '## Every other file the build side reads, read whole';

// a file's bytes as the build side hashes them, or null when the tree has no such file
function digestOf(file: string): string | null {
  const at = path.join(ROOT, file);
  return fs.existsSync(at)
    ? createHash('sha256').update(fs.readFileSync(at)).digest('hex')
    : null;
}

// the digests below the mark: every module with its file count, then every file
function recordSections(): string {
  const reader = sourceReader();
  const modules = readModules().map((entry) => ({
    entry,
    sources: reader.sourcesOf(entry),
  }));
  const files = new Map<string, string>();
  for (const { sources } of modules)
    for (const one of sources) files.set(one.path, String(digestOf(one.path)));
  const others = PROJECT.buildReads.files;
  return [
    `${MARK} · ${modules.length}`,
    '',
    'Written by `yarn release:record` from `sheet/project.ts` · buildReads, closed over imports. Each module by its entry, its file count and one sha256 over its files, the entry first, then the others in path order, each as `path` + newline + bytes, joined by a newline.',
    '',
    ...modules.map(
      ({ entry, sources }) =>
        `- ${entry} · ${sources.length} files · module sha256 ${sheetDigest(sources)}`,
    ),
    '',
    `${OTHERS} · ${others.length}`,
    '',
    ...others.map((file) => `- ${file} · sha256 ${String(digestOf(file))}`),
    '',
    `## Every file of those modules · ${files.size}`,
    '',
    ...[...files.keys()]
      .sort()
      .map((file) => `- ${file} · sha256 ${String(files.get(file))}`),
    '',
  ].join('\n');
}

// a record's module and file lines read back against the tree
function recordFaults(text: string): readonly string[] {
  const reader = sourceReader();
  const listed = readModules();
  const lines = text.split('\n');
  const moduleFaults = lines.flatMap((line) => {
    const found = MODULE_LINE.exec(line);
    if (!found) return [];
    const sources = reader.sourcesOf(String(found[1]));
    return sources.length === Number(found[2]) &&
      sheetDigest(sources) === found[3]
      ? []
      : [`${String(found[1])} · module digest moved`];
  });
  const fileFaults = lines.flatMap((line) => {
    const found = FILE_LINE.exec(line);
    return found && digestOf(String(found[1])) !== found[2]
      ? [`${String(found[1])} · file digest moved`]
      : [];
  });
  const named = lines.flatMap((line) => MODULE_LINE.exec(line)?.[1] ?? []);
  const filesNamed = lines.flatMap((line) => FILE_LINE.exec(line)?.[1] ?? []);
  const missing = [
    ...listed.filter((entry) => !named.includes(entry)),
    ...PROJECT.buildReads.files.filter((file) => !filesNamed.includes(file)),
  ].map((entry) => `${entry} · not in the record`);
  return [...missing, ...moduleFaults, ...fileFaults];
}

export { MARK, recordFaults, recordSections };
