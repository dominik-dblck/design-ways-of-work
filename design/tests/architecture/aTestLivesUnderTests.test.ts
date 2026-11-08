/**
 * - `docs/rules/tests.md`: a test lives under `tests/`, and production reads no test switch
 * - a skipped test names what it waits on, in a `waits on` comment on its line or the one above
 */
import { describe, expect, it } from 'vitest';
import { productionSources, TEST_HOMES, textsUnder } from './tree.ts';

const A_TEST_FILE = /\.test\.tsx?$/;
const A_SWITCH =
  /\bprocess\.env\.(?:VITEST\w*|NODE_ENV)\b|\bimport\.meta\.vitest\b/g;
const A_SKIP = /^\s*(?:it|describe|test)\.(?:skip|todo)\(/;
const A_WAIT = /\/\/.*\bwaits on\b/;

// each skipped test of a text with no `waits on` beside it, as its line number
function silentSkipsIn(text: string): readonly number[] {
  const lines = text.split('\n');
  return lines.flatMap((line, at) =>
    A_SKIP.test(line) && !A_WAIT.test(line) && !A_WAIT.test(lines[at - 1] ?? '')
      ? [at + 1]
      : [],
  );
}

describe('a test lives under tests/', () => {
  it('no test file sits outside tests/', () => {
    expect(
      textsUnder('.', ['.ts', '.tsx'])
        .map((source) => source.path)
        .filter(
          (file) =>
            A_TEST_FILE.test(file) &&
            !TEST_HOMES.some((home) => file.startsWith(`${home}/`)),
        ),
    ).toEqual([]);
  });

  it('the scans see a test switch and a silent skip; a skip that names its wait passes', () => {
    expect(
      [
        ...'if (process.env.VITEST) return;'.matchAll(A_SWITCH),
        ...'const on = import.meta.vitest;'.matchAll(A_SWITCH),
      ].map(([found]) => found),
    ).toEqual(['process.env.VITEST', 'import.meta.vitest']);
    expect(
      silentSkipsIn(
        [
          "it.skip('a', () => {});",
          '// waits on the first React page',
          "it.skip('b', () => {});",
          "it.todo('c'); // waits on O12",
        ].join('\n'),
      ),
    ).toEqual([1]);
  });

  it('production reads no test switch, and every skipped test names its wait', () => {
    expect(
      productionSources().flatMap((source) =>
        [...source.text.matchAll(A_SWITCH)].map(
          ([found]) => `${source.path} · ${found}`,
        ),
      ),
    ).toEqual([]);
    expect(
      TEST_HOMES.flatMap((home) => textsUnder(home, ['.ts', '.tsx'])).flatMap(
        (source) =>
          silentSkipsIn(source.text).map((line) => `${source.path}:${line}`),
      ),
    ).toEqual([]);
  });
});
