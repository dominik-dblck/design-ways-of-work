/**
 * - a file read whole holds 2000 words at most, one read every turn 1000
 * - one read on demand past 100 lines opens with `## Contents`: the scope's lists
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';
import { heldToItsBaseline, heldToItsCount } from './baseline.ts';
import { filesNamedBy, globsNamingNothing } from './globs.ts';

// a skill is read whole when it loads; CLAUDE.md on every turn: both cost context in words
const WHOLE_WORDS = 2000;
const EVERY_TURN_WORDS = 1000;
// past this, a file read in part opens with what it holds, so a partial read sees its scope
const CONTENTS_FROM = 100;

const wordsIn = (text: string): number =>
  text.split(/\s+/).filter(Boolean).length;
const linesIn = (text: string): number =>
  text.split('\n').length - (text.endsWith('\n') ? 1 : 0);
const opensWithContents = (text: string): boolean =>
  /^## (.*)$/m.exec(text)?.[1]?.trim() === 'Contents';
const textOf = (file: string): string =>
  fs.readFileSync(path.join(scope.root, file), 'utf8');

// each file of a list over its words, with its count: a listed count may fall, never rise
const overIn = (
  globs: readonly string[],
  most: number,
): readonly (readonly [string, number])[] =>
  filesNamedBy(scope, globs).flatMap((file) => {
    const words = wordsIn(textOf(file));
    return words > most ? [[file, words] as const] : [];
  });

describe('every skill is short', () => {
  it('counts words and lines, and finds contents only as the first heading', () => {
    expect(wordsIn('one two\n\nthree\tfour ')).toBe(4);
    expect(linesIn('a\nb\n')).toBe(2);
    expect(linesIn('a\nb')).toBe(2);
    expect(opensWithContents('# A\n\n## Contents\n\n## B\n')).toBe(true);
    expect(opensWithContents('# A\n\n## B\n\n## Contents\n')).toBe(false);
  });

  it('each glob of the files read whole, on demand and every turn names a file', () => {
    const { whole, onDemand, everyTurn } = scope.instructions;
    expect({
      whole: globsNamingNothing(scope, whole),
      onDemand: globsNamingNothing(scope, onDemand),
      everyTurn: globsNamingNothing(scope, everyTurn),
    }).toEqual({ whole: [], onDemand: [], everyTurn: [] });
  });

  it('a file read whole or every turn stays within its words, beyond its baseline', () => {
    const { whole, everyTurn } = scope.instructions;
    expect(
      heldToItsCount(
        'everySkillIsShort',
        new Map([
          ...overIn(whole, WHOLE_WORDS),
          ...overIn(everyTurn, EVERY_TURN_WORDS),
        ]),
      ),
    ).toEqual({ added: [], fixed: [] });
  });

  it('a file read on demand past 100 lines opens with its contents, beyond its baseline', () => {
    const missing = filesNamedBy(scope, scope.instructions.onDemand).filter(
      (file) => {
        const text = textOf(file);
        return linesIn(text) > CONTENTS_FROM && !opensWithContents(text);
      },
    );
    expect(heldToItsBaseline('aLongFileOpensWithContents', missing)).toEqual({
      added: [],
      fixed: [],
    });
  });
});
