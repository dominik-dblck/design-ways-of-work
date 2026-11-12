/**
 * - the way of working names a role, never the product (W56)
 * - read in every file the take wrote, the rules and the skills' data, against `sheet/project.ts`
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { rules, ticketChecklist } from '../../docs/process/plans.ts';
import { takenFiles } from '../../shared/take/takeRecord.ts';
import * as project from '../../sheet/project.ts';
import { ROOT, textsUnder } from './tree.ts';
import type { Source } from './tree.ts';

const AN_EPIC_OR_TICKET = /\b(?:T-)?E\d{2}(?:-\d{2})?\b/g;
const TEXTS = ['.ts', '.tsx', '.md'];

const escaped = (word: string): string =>
  word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const aWhole = (word: string): RegExp =>
  new RegExp(`(?<![\\w-])${escaped(word)}(?![\\w-])`);

/** Each product name a text holds, as `path · name`. */
const wordsIn = (source: Source, names: readonly string[]): readonly string[] =>
  names
    .filter((name) => aWhole(name).test(source.text))
    .map((name) => `${source.path} · ${name}`);

/** Each product name or epic a text holds, as `path · name`. */
function namesIn(source: Source, names: readonly string[]): readonly string[] {
  const ids = [...source.text.matchAll(AN_EPIC_OR_TICKET)].map(
    ([id]) => `${source.path} · ${id}`,
  );
  return [...wordsIn(source, names), ...ids];
}

describe('the way of working names no product', () => {
  // the build repository's paths, what it reads and the records' eras say where or when, not a name a text could carry
  const {
    buildPaths: _paths,
    buildReads: _reads,
    recordEras: _eras,
    ...named
  } = project;
  const names: readonly string[] = Object.values(named).flat();

  it('finds a name of the product and an epic in a planted text', () => {
    const planted = {
      path: 'planted.ts',
      text: [
        'Ask Kestrel on E0',
        '6 in Ledger; kestrel-dev and Wikis pass',
      ].join(''),
    };
    expect(namesIn(planted, ['Kestrel', 'Ledger', 'Wiki'])).toEqual([
      'planted.ts · Kestrel',
      'planted.ts · Ledger',
      'planted.ts · E06',
    ]);
  });

  it('no file the take wrote names the product', () => {
    // the company and the stack are the way of working's own: its design system is the company's, a stack's id its word
    const { company: _company, stack: _stack, ...own } = named;
    const ownNames: readonly string[] = Object.values(own).flat();
    // the build side's tree comes copied as its repository wrote it: a new product takes none, until that side's own port
    const taken = [...takenFiles(ROOT).keys()].filter(
      (file) =>
        !file.startsWith('dev/') &&
        TEXTS.some((ending) => file.endsWith(ending)),
    );
    expect(taken.length).toBeGreaterThan(0);
    const texts = taken.map((file) => ({
      path: file,
      text: fs.readFileSync(path.join(ROOT, file), 'utf8'),
    }));
    expect(texts.flatMap((one) => wordsIn(one, ownNames))).toEqual([]);
  });

  it('no generic rule, checklist line or skill names the product', () => {
    const rows: readonly Source[] = [...rules, ...ticketChecklist].map(
      (row) => ({ path: `rule:${row.id}`, text: `${row.says} ${row.why}` }),
    );
    const skills = textsUnder('docs/skills', ['.ts']);
    expect(names.length).toBeGreaterThan(5);
    expect([...rows, ...skills].flatMap((one) => namesIn(one, names))).toEqual(
      [],
    );
  });
});
