/**
 * - `modulesSection` · each design file the pack names by its short name, at its
 * - path in this repository, with its parts and one digest over them
 */
import { buildPaths } from '../../sheet/project.ts';
import { sourceOf } from '../layout.ts';
import type { Cut } from './fileLines.ts';
import { sha256, sheetDigest } from './packSources.ts';

// a run of words ending in a design file's extension, never inside a path
const RUN =
  /(?<![\w/.[\]-])([\w[\]-][\w.[\] -]*?\.(?:ts|json|md|css|dc\.html))(?![\w/.])/g;

// a name the build side's repository holds too is its file there, never one of these
const theirs = (name: string): boolean =>
  buildPaths.some((one) => name.startsWith(one));

// the longest tail of a run that `tools/layout.ts` names: a page's name holds spaces
function nameIn(run: string): string | null {
  const words = run.split(' ');
  const tails = words.map((_, at) => words.slice(at).join(' '));
  return tails.find((tail) => !theirs(tail) && sourceOf(tail) !== null) ?? null;
}

function rowOf(name: string, cut: Cut): string | null {
  const sources = cut.reader.sourcesOf(name);
  const [entry] = sources;
  if (!entry) return null;
  if (sources.length === 1)
    return `- ${name} · ${entry.path} · sha256 ${sha256(entry.text)}`;
  return `- ${name} · ${entry.path} and its ${sources.length - 1} parts · sha256 ${sheetDigest(sources)}`;
}

function modulesSection(md: string, cut: Cut): string {
  const names = [
    ...new Set(
      [...md.matchAll(RUN)].flatMap((run) => nameIn(String(run[1])) ?? []),
    ),
  ].sort();
  const rows = names.flatMap((name) => rowOf(name, cut) ?? []);
  return [
    `## The modules · ${rows.length}`,
    '',
    "Each design file this pack names by its short name, at its path in this repository: read it at the release's commit (git show <sha>:<path>). A module with parts is its entry and the files bundled with it, one digest over their paths and bytes in path order; a single file's digest is of its bytes.",
    '',
    ...rows,
    '',
  ].join('\n');
}

export { modulesSection };
