/**
 * - the way of working names a role, never the product (D28)
 * - read in the generic rules and the skills' data, against `sheet/project.ts`
 */
import { describe, expect, it } from 'vitest';
import { rules, ticketChecklist } from '../../docs/process/plans.ts';
import * as project from '../../sheet/project.ts';
import { textsUnder } from './tree.ts';
import type { Source } from './tree.ts';

const AN_EPIC_OR_TICKET = /\b(?:T-)?E\d{2}(?:-\d{2})?\b/g;

const escaped = (word: string): string =>
  word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const aWhole = (word: string): RegExp =>
  new RegExp(`(?<![\\w-])${escaped(word)}(?![\\w-])`);

/** Each product name or epic a text holds, as `path · name`. */
function namesIn(source: Source, names: readonly string[]): readonly string[] {
  const words = names.filter((name) => aWhole(name).test(source.text));
  const ids = [...source.text.matchAll(AN_EPIC_OR_TICKET)].map(([id]) => id);
  return [...words, ...ids].map((name) => `${source.path} · ${name}`);
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
        'Ask CC on E0',
        '6 in Notion; design-answer-cc and Payloads pass',
      ].join(''),
    };
    expect(namesIn(planted, ['CC', 'Notion', 'Payload'])).toEqual([
      'planted.ts · CC',
      'planted.ts · Notion',
      'planted.ts · E06',
    ]);
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
