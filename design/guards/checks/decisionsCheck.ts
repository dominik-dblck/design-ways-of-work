/**
 * - `decisionsLine` · the decisions and open findings as data hold together (D21)
 * - D1 on with no gap, a decision replaces only an earlier one, each finding once
 */
import { lineOf } from './checkWorld.ts';
import { runFaults } from './idRuns.ts';
import * as DECISIONS from '../../docs/process/decisions.ts';
import * as FINDINGS from '../../roadmaps/findings.ts';

const numberOf = (id: string): number => Number(id.replace(/^\D+/, ''));

function decisionFaults(): readonly string[] {
  const all = DECISIONS.all;
  const gaps = runFaults(
    all.map((one) => one.id),
    'D',
  );
  const replaced = all.flatMap((one) =>
    [...one.held.matchAll(/replaces (D\d+)/g)].flatMap(([, id = '']) =>
      numberOf(id) < numberOf(one.id)
        ? []
        : [`${one.id} replaces ${id}, not earlier`],
    ),
  );
  return [...gaps, ...replaced];
}

function findingFaults(): readonly string[] {
  const ids = FINDINGS.all.map((one) => one.id);
  const sides = new Set(FINDINGS.sides.map((one) => one.side));
  return [
    ...runFaults(
      ids.filter((id) => id.startsWith('O')),
      'O',
    ),
    ...runFaults(
      ids.filter((id) => id.startsWith('R')),
      'R',
    ),
    ...FINDINGS.all
      .filter((one) => !sides.has(one.side))
      .map((one) => `${one.id} on no side`),
  ];
}

function decisionsLine(): string {
  const decided = DECISIONS.all.length;
  const open = FINDINGS.all.length;
  const faults = [...decisionFaults(), ...findingFaults()];
  return lineOf('decisions and findings', {
    ok: decided > 0 && !faults.length,
    text: faults.length
      ? faults.slice(0, 6).join(' | ')
      : `${decided} decided, D1 to D${decided} · ${open} open, each once`,
  });
}

export { decisionsLine };
