/**
 * - `docs/process/documentSlots.ts`: each of the product's rows is asked by a home's document or skill
 */
import { describe, expect, it } from 'vitest';
import { cites } from '../../docs/process/documentSlots.ts';
import { textsUnder } from './tree.ts';
import type { Source } from './tree.ts';

const ASKED = /\bcite(?:Lines)?\(\s*'([^']+)'/g;

/** The keys a source asks the product for. */
const askedIn = (source: Source): readonly string[] =>
  [...source.text.matchAll(ASKED)].map(([, key]) => String(key));

describe('a slot row is asked', () => {
  it('reads the keys a planted document asks for', () => {
    const planted = {
      path: 'planted.ts',
      text: "'a' + cite('one.1') + 'b', ...citeLines(\n  'one.1+'),",
    };
    expect(askedIn(planted)).toEqual(['one.1', 'one.1+']);
  });

  it('no row of the product waits for a document that asks for none', () => {
    const asked = new Set(
      ['docs/documents', 'docs/process/modes', 'docs/skills'].flatMap(
        (folder) => textsUnder(folder, ['.ts']).flatMap(askedIn),
      ),
    );
    expect(Object.keys(cites).filter((key) => !asked.has(key))).toEqual([]);
  });
});
