/**
 * - `docs/rules/comments.md`: a rule or a checklist line carries no history (D27)
 * - no date, ticket, criterion, attribution, stage, epic or finding code in its words or its why
 * - a skill's lines too, but for the stages, the words its process runs on
 */
import { describe, expect, it } from 'vitest';
import { rules, ticketChecklist } from '../../docs/process/plans.ts';
import { rows as productRows } from '../../sheet/rules.ts';
import { AN_EPIC, TRACES } from './traces.ts';
import { textsUnder } from './tree.ts';

const A_FINDING = /\b[A-Z]{1,3}\d{1,2}[a-z]?\b/;

interface Row {
  readonly id: string;
  readonly says: string;
  readonly why: string;
}

/** Each mark of history in a row, as `key · what`. */
function historyIn(row: Row): readonly string[] {
  const text = `${row.says} ${row.why}`;
  return [
    ...TRACES.filter(([, shape]) => shape.test(text)).map(
      ([trace]) => `${row.id} · names ${trace}`,
    ),
    ...(text.match(AN_EPIC) ? [`${row.id} · names an epic`] : []),
    ...(A_FINDING.test(text) ? [`${row.id} · names a finding`] : []),
  ];
}

describe('a rule carries no history', () => {
  it('finds a ticket, a date, a stage, an epic and a finding in a planted row', () => {
    const planted = {
      id: 'planted',
      says: [
        'Asked at T-E0',
        '1-02 (PM, 1',
        '7 Sep) at RE',
        'D in E0',
        '6 · AR',
        '1',
      ].join(''),
      why: 'nothing',
    };
    expect(historyIn(planted)).toEqual([
      'planted · names a date',
      'planted · names a ticket',
      'planted · names a decision',
      'planted · names a stage',
      'planted · names an epic',
      'planted · names a finding',
    ]);
  });

  it('no rule, no checklist line and no product rule carries its history', () => {
    const rows: readonly Row[] = [...rules, ...ticketChecklist, ...productRows];
    expect(rows.length).toBeGreaterThan(90);
    expect(rows.flatMap(historyIn)).toEqual([]);
  });

  it('no skill line carries its history', () => {
    const skills = textsUnder('docs/skills', ['.ts']);
    expect(skills.length).toBeGreaterThan(5);
    const marks = skills.flatMap((skill) => [
      ...TRACES.filter(([trace]) => trace !== 'a stage')
        .filter(([, shape]) => shape.test(skill.text))
        .map(([trace]) => `${skill.path} · names ${trace}`),
      ...(skill.text.match(AN_EPIC) ? [`${skill.path} · names an epic`] : []),
    ]);
    expect(marks).toEqual([]);
  });
});
