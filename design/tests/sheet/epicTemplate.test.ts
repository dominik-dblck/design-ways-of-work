/**
 * - the files a new epic's folder starts with, and the registries that list them
 * - a registry gains the import and the item once, in epic order, and never twice
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { epicFilesOf, registered } from '../../roadmaps/templates.ts';
import type { StartedFile } from '../../roadmaps/templates.ts';
import { ROOT } from '../architecture/tree.ts';

// the epic a test starts and its two neighbours: a registry of its own, never a product's epics
const EPIC = { id: 'E02', name: 'a sample epic' };
const NEIGHBOURS = [
  { id: 'E01', name: 'the epic before' },
  { id: 'E03', name: 'the epic after' },
];

// a registry that holds the neighbours alone: their imports, then their items
const registryOf = (files: readonly StartedFile[]): string =>
  [
    ...files.map((file) => file.line),
    '',
    'const ROWS = [',
    ...files.map((file) => file.item),
    '];',
    '',
  ].join('\n');

const epicsIn = (lines: readonly string[], like: RegExp): readonly string[] =>
  lines.flatMap((line) => like.exec(line)?.[1] ?? []);

describe('a new epic starts from the template', () => {
  const files = epicFilesOf(EPIC);

  it('starts the four parts, each named for the entry it serves', () => {
    expect(files.map((file) => file.path)).toEqual([
      'roadmaps/E02/E02Tickets.ts',
      'roadmaps/E02/E02Edges.ts',
      'roadmaps/E02/E02Receipts.ts',
      'roadmaps/E02/E02Notes.ts',
    ]);
    for (const file of files) {
      expect(file.text).toContain(`\`${file.name}\` · `);
      expect(file.text).toContain(`export { ${file.name} };`);
    }
  });

  it('names a registry that exists, and a type file each import reaches', () => {
    for (const file of files) {
      expect(fs.existsSync(path.join(ROOT, file.registry))).toBe(true);
      const type = /from '(\.\.\/[^']+)'/.exec(file.text)?.[1] ?? '';
      expect(fs.existsSync(path.join(ROOT, 'roadmaps/E02', type))).toBe(true);
    }
  });

  it('lists the file in its registry between its neighbours, once', () => {
    for (const [at, file] of files.entries()) {
      const around = NEIGHBOURS.flatMap((epic) => epicFilesOf(epic)[at] ?? []);
      const after = registered(registryOf(around), file) ?? '';
      const lines = after.split('\n');
      expect(lines.filter((line) => line === file.line)).toHaveLength(1);
      expect(lines.filter((line) => line === file.item)).toHaveLength(1);
      expect(registered(after, file)).toBeNull();
      expect(epicsIn(lines, /^import \{ (E\d\d)_/)).toEqual([
        'E01',
        'E02',
        'E03',
      ]);
      expect(epicsIn(lines, /^ {2}(?:\.\.\.)?(E\d\d)_/)).toEqual([
        'E01',
        'E02',
        'E03',
      ]);
    }
  });
});
