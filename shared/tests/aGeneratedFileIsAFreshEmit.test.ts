/**
 * - each generator, run into a fresh folder, writes what the tree holds, byte for byte
 * - and only the files it owns, each of them: one it no longer writes is stale
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { minimatch } from 'minimatch';
import { afterAll, describe, expect, it } from 'vitest';
import type { Generator } from '../repoScope.ts';
import { scope } from '../../scope.ts';

const made: string[] = [];
afterAll(() => {
  for (const folder of made)
    fs.rmSync(folder, { recursive: true, force: true });
});

// every file under a folder, as a posix path from it
const filesUnder = (folder: string): readonly string[] =>
  fs
    .readdirSync(folder, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) =>
      path
        .relative(folder, path.join(entry.parentPath, entry.name))
        .split(path.sep)
        .join('/'),
    )
    .sort();

// a path a generator owns: one of its globs names it, and none of its `!` globs
const isOwnedBy = (file: string, { writes }: Generator): boolean =>
  writes.some((glob) => !glob.startsWith('!') && minimatch(file, glob)) &&
  !writes.some(
    (glob) => glob.startsWith('!') && minimatch(file, glob.slice(1)),
  );

// the tree's files a generator owns
const ownedBy = (generator: Generator): readonly string[] =>
  generator.writes
    .filter((glob) => !glob.startsWith('!'))
    .flatMap((glob) => fs.globSync(glob, { cwd: scope.root }))
    .filter((file) => isOwnedBy(file, generator));

// one run into a fresh folder, allowed to write there alone: the tree holds unstaged work
function runOf(generator: Generator): {
  readonly failed: string | null;
  readonly written: readonly string[];
  readonly out: string;
} {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-emit-'));
  made.push(out);
  const run = spawnSync(
    process.execPath,
    [
      '--permission',
      '--allow-fs-read=*',
      `--allow-fs-write=${out}`,
      generator.script,
      ...generator.args,
      '--out',
      out,
    ],
    { cwd: scope.root, encoding: 'utf8' },
  );
  return {
    failed: run.status === 0 ? null : `${generator.script} · ${run.stderr}`,
    written: filesUnder(out),
    out,
  };
}

const runs = scope.generators.map((generator) => ({
  generator,
  ...runOf(generator),
}));

describe('a generated file is a fresh emit', () => {
  it('each generator runs and writes what the tree holds, byte for byte', () => {
    expect(
      runs.flatMap(({ failed }) => (failed === null ? [] : [failed])),
    ).toEqual([]);
    const stale = runs.flatMap(({ written, out }) =>
      written.filter((file) => {
        const held = path.join(scope.root, file);
        return (
          !fs.existsSync(held) ||
          !fs.readFileSync(held).equals(fs.readFileSync(path.join(out, file)))
        );
      }),
    );
    expect(stale).toEqual([]);
  });

  it('each generator writes the files it owns, all of them and no other', () => {
    expect(
      runs.flatMap(({ generator, written }) =>
        written
          .filter((file) => !isOwnedBy(file, generator))
          .map((file) => `${generator.script} · ${file} · not one it owns`),
      ),
    ).toEqual([]);
    expect(
      runs.flatMap(({ generator, written }) =>
        ownedBy(generator)
          .filter((file) => !written.includes(file))
          .map((file) => `${generator.script} · ${file} · no longer written`),
      ),
    ).toEqual([]);
  });
});
