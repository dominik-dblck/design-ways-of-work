/**
 * - `propsPart` · part h: a prop declared and never read, a sentence typed into an
 * - attribute, over every page and held by the guard's ratchet
 */
import { lineOf } from './checkWorld.ts';
import type { Mirror } from './checkWorld.ts';
import * as SOURCE_CHECK from '../source-check.ts';

function propsPart(mirror: Mirror): readonly string[] {
  const pages = Object.fromEntries(
    mirror
      .list()
      .filter((file) => /\.dc\.html$/.test(file))
      .map((file) => [file, mirror.read(file)]),
  );
  const found = SOURCE_CHECK.propsCheck(pages);
  const over = SOURCE_CHECK.ratchet(found);
  const count = (kind: string): number =>
    found.filter((one) => one.kind === kind).length;
  return [
    lineOf('props', {
      ok: !over.length,
      text: over.length
        ? JSON.stringify(over)
        : `never read ${count('prop never read')} · sentences in attributes ${count('sentence in an attribute')} (held by the ratchet)`,
    }),
  ];
}

export { propsPart };
