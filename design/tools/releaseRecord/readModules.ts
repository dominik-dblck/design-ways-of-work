/**
 * - `readModules` · every module the build side reads, with what they import
 * - `readFiles` · every file of those modules, as the record digests them
 */
import { execFileSync } from 'node:child_process';
import { entryOfModule, importsOfEntry } from '../layout.ts';
import { sourceReader } from '../pack/packSources.ts';
import { ROOT } from '../root.ts';
import * as PROJECT from '../../sheet/project.ts';

// the tracked sources: a file outside git never enters a record
function trackedSources(): readonly string[] {
  return execFileSync('git', ['ls-files', '*.ts'], {
    cwd: ROOT,
    encoding: 'utf8',
  })
    .split('\n')
    .filter(Boolean);
}

// a module's entry, a module that emits a file included
const isModule = (file: string): boolean => entryOfModule(file) === file;

function readModules(): readonly string[] {
  const { homes, modules } = PROJECT.buildReads;
  const start = [
    ...trackedSources().filter(
      (file) => homes.some((home) => file.startsWith(home)) && isModule(file),
    ),
    ...modules,
  ];
  const seen = new Set(start);
  const queue = [...seen];
  for (let at = 0; at < queue.length; at += 1)
    for (const imported of importsOfEntry(String(queue[at])))
      if (!seen.has(imported)) {
        seen.add(imported);
        queue.push(imported);
      }
  return [...seen].sort();
}

// each module's entry and its parts, once
function readFiles(): readonly string[] {
  const reader = sourceReader();
  const files = readModules().flatMap((entry) =>
    reader.sourcesOf(entry).map((one) => one.path),
  );
  return [...new Set(files)].sort();
}

export { readFiles, readModules };
