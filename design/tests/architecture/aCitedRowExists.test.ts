/**
 * - `docs/rules/types.md`: every rule:{key} cited names a row; no rule is cited by a number
 * - read in the process (CLAUDE.md, the skills, the rule files) and in the sheet's code
 */
import { describe, expect, it } from 'vitest';
import { rules, ticketChecklist } from '../../docs/process/plans.ts';
import { rows as productRows } from '../../sheet/rules.ts';
import { claudeMd, theSkills } from './skills.ts';
import { productionSources, textsUnder } from './tree.ts';
import type { Source } from './tree.ts';

const A_CITATION = /\brule:([a-z0-9]+(?:-[a-z0-9]+)*)/g;
const BY_NUMBER =
  /\b(?:RULES? #?\d|(?:TICKET_CHECKLIST|checklist) (?:lines? )?\d)/g;

/** Each key a text cites as rule:{key}. */
const citedIn = (text: string): readonly string[] =>
  [...text.matchAll(A_CITATION)].map(([, key = '']) => key);

const faultsIn = (
  sources: readonly Source[],
  keys: ReadonlySet<string>,
): readonly string[] =>
  sources.flatMap((source) => [
    ...citedIn(source.text)
      .filter((key) => !keys.has(key))
      .map((key) => `${source.path} · rule:${key}`),
    ...[...source.text.matchAll(BY_NUMBER)].map(
      ([cited]) => `${source.path} · ${cited}… by number`,
    ),
  ]);

describe('a cited row exists', () => {
  const keys = new Set<string>(
    [...rules, ...ticketChecklist, ...productRows].map((one) => one.id),
  );

  it('reads each key cited, and a citation by number', () => {
    expect(
      citedIn('rule:one-source-of-truth, `rule:ticket-id-is-a-name` · rule'),
    ).toEqual(['one-source-of-truth', 'ticket-id-is-a-name']);
    const planted = [
      'RULE',
      'S 66 · check',
      'list 24 · RULES #',
      '4 · TICKET_',
      'CHECKLIST line 2',
    ].join('');
    expect(faultsIn([{ path: 'planted.md', text: planted }], keys)).toEqual([
      'planted.md · RULES 6… by number',
      'planted.md · checklist 2… by number',
      'planted.md · RULES #4… by number',
      'planted.md · TICKET_CHECKLIST line 2… by number',
    ]);
  });

  it('every rule the process cites is a row, and none is cited by number', () => {
    const process = [
      claudeMd(),
      ...theSkills(),
      ...textsUnder('docs/rules', ['.md']),
    ];
    expect(faultsIn(process, keys)).toEqual([]);
  });

  it('every rule the sheet’s code cites is a row, and none is cited by number', () => {
    // a decision keeps the words of its day, and may name a rule by its old number
    const code = productionSources().filter(
      (one) => !one.path.startsWith('docs/process/decisions/'),
    );
    expect(faultsIn(code, keys)).toEqual([]);
  });
});
