import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { keptIn } from '../../scripts/keptWords.ts';
import { NOTEBOOK_REGISTRY } from './notebookRegistry.ts';

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-kept-'));

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

describe('a product keeps its records and its notebooks as written', () => {
  const root = path.join(base, 'product');
  fs.mkdirSync(path.join(root, path.dirname(NOTEBOOK_REGISTRY.file)), {
    recursive: true,
  });
  fs.writeFileSync(
    path.join(root, NOTEBOOK_REGISTRY.file),
    NOTEBOOK_REGISTRY.text,
  );
  const { isKept, isNotebook } = keptIn(root);

  it('a notebook, data or markdown, stands where the product’s registry says', () => {
    for (const file of [
      'roadmaps/E10/E10Notes.ts',
      'roadmaps/E03/feature-E03.md',
    ]) {
      expect(isKept(file)).toBe(true);
      expect(isNotebook(file)).toBe(true);
    }
    expect(isKept('roadmaps/E14/E14PointNotes.ts')).toBe(false);
    expect(isKept('roadmaps/E10/feature-E03.md')).toBe(false);
  });

  it('a legacy copy, a record and a note are kept, and are no notebook', () => {
    for (const file of ['legacy/old.ts', 'records/v1.ts', 'notes/day.md']) {
      expect(isKept(file)).toBe(true);
      expect(isNotebook(file)).toBe(false);
    }
    expect(isKept('app/page.ts')).toBe(false);
  });

  it('a product without the registry is refused', () => {
    expect(() => keptIn(base)).toThrow(
      `${base} lacks ${NOTEBOOK_REGISTRY.file}, the registry of its notebooks`,
    );
  });
});
