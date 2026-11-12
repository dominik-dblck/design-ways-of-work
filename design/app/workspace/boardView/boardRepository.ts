/**
 * - `repository`, `RepositoryNumbers` · the build repository now, and at each close
 */
import { receipts as RECEIPTS } from '../../../roadmaps/receipts.ts';
import type { Receipt, RepositoryState } from '../../../roadmaps/receipts.ts';
import { all as TICKETS } from '../../../roadmaps/tickets.ts';
import { BOARD_WORDS } from './boardWords.ts';
import type { Stat } from './boardTypes.ts';

type Words = typeof BOARD_WORDS.repository;
type Shown = keyof Words['notes'];
// a number as the card shows it: its value, the words beside it, its bar, its own hover
type Shape = Partial<Pick<Stat, 'sub' | 'share' | 'note'>> & {
  readonly value: string;
};

interface RepositoryNumbers {
  // the commit the newest state was read at, null until a report carries one
  readonly commit: string | null;
  readonly now: readonly Stat[];
  readonly atClose: readonly Stat[];
}

const PERCENT = 100;

// a receipt counts while its ticket stands on the board
function reported(): readonly Receipt[] {
  return TICKETS().flatMap((ticket) => {
    const receipt = RECEIPTS[ticket.id];
    return receipt ? [receipt] : [];
  });
}

// the states the reports carried, the newest last
const statesOf = (receipts: readonly Receipt[]): readonly RepositoryState[] =>
  [...receipts]
    .sort((one, other) => one.at.localeCompare(other.at))
    .flatMap((one) => (one.repository ? [one.repository] : []));

const shown = (value: number | null): string =>
  value === null ? '—' : String(value);

// the change since the report before, when both gave the number and it moved
function changeOf(now: number | null, before: number | null): string | null {
  if (now === null || before === null || now === before) return null;
  return `${now > before ? '+' : ''}${now - before}`;
}

const percent = (value: number | null | undefined): string =>
  value === null || value === undefined ? '—' : `${value}%`;

// the other three measures and the run's own commit, beside what lines counts
function coverageNote(words: Words, state: RepositoryState): string {
  const run = state.coverage;
  if (!run) return words.notes.coverage;
  const rest = (['branches', 'functions', 'statements'] as const).map(
    (measure) => `${measure} ${percent(run[measure])}`,
  );
  return `${words.notes.coverage} (${run.commit}) · ${rest.join(' · ')}`;
}

const statOf =
  (words: Words) =>
  ([id, shape]: readonly [Shown, Shape]): Stat => ({
    id,
    label: words[id],
    value: shape.value,
    sub: shape.sub ?? null,
    share: shape.share ?? null,
    note: shape.note ?? words.notes[id],
    href: null,
  });

// the suite's count, its change since the report before and what it skipped
function testsShape(last: RepositoryState, before?: RepositoryState): Shape {
  const skipped = last.skipped
    ? `${last.skipped} ${BOARD_WORDS.units.skipped}`
    : null;
  const beside = [changeOf(last.tests, before?.tests ?? null), skipped];
  return {
    value: shown(last.tests),
    sub: beside.filter(Boolean).join(' · ') || null,
  };
}

function coverageShape(words: Words, last: RepositoryState): Shape {
  const lines = last.coverage?.lines ?? null;
  return {
    value: percent(lines),
    sub: BOARD_WORDS.units.lines,
    share: lines === null ? null : lines / PERCENT,
    note: coverageNote(words, last),
  };
}

function nowStats(
  words: Words,
  [last, before]: readonly (RepositoryState | undefined)[],
): readonly Stat[] {
  if (!last) return [];
  const rows: readonly (readonly [Shown, Shape])[] = [
    ['tests', testsShape(last, before)],
    [
      'e2e',
      { value: shown(last.e2e), sub: changeOf(last.e2e, before?.e2e ?? null) },
    ],
    ['coverage', coverageShape(words, last)],
  ];
  return rows.map(statOf(words));
}

function repository(): RepositoryNumbers {
  const words = BOARD_WORDS.repository;
  const receipts = reported();
  const states = statesOf(receipts);
  const tests = receipts.reduce((sum, one) => sum + (one.tests ?? 0), 0);
  const atClose: readonly (readonly [Shown, Shape])[] = [
    ['reportedTests', { value: String(tests) }],
    ['reportedTickets', { value: String(receipts.length) }],
  ];
  return {
    commit: states.at(-1)?.commit ?? null,
    now: nowStats(words, [states.at(-1), states.at(-2)]),
    atClose: atClose.map(statOf(words)),
  };
}

export { repository };
export type { RepositoryNumbers };
