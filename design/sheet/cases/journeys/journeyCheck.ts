/**
 * - `checkEpic` · an epic's cases and states no step covers, a step's wrong names
 * - `addedMissing` · a case the e2e met that the sheet does not hold yet
 */
import { covers, every, journeysOfEpic, keys } from './journeyReads.ts';
import { WALKED, stateIndex } from './journeyRows.ts';
import { unsaid } from './journeyWords.ts';
import type { JourneyRow, JourneyCheck, StateCheck } from './journeyTypes.ts';
import * as COMMANDS from '../../contract/commands.ts';
import * as DIRECTORY from '../../model/directory.ts';
import * as QUERIES from '../../contract/queries.ts';
import * as REFUSALS from '../../contract/refusals.ts';
import * as TEST_CASES from '../testCases.ts';

type Cases = typeof TEST_CASES;
type Groups = Parameters<Cases['flat']>[0];

function shownBy(
  journeys: readonly JourneyRow[],
): ReadonlyMap<string, readonly string[]> {
  const shown = new Map<string, string[]>();
  for (const journey of journeys)
    for (const step of journey.steps)
      for (const code of step[4] ?? [])
        shown.set(code, [...(shown.get(code) ?? []), journey.id]);
  return shown;
}

// a step naming a code that is gone, a seed 02a does not know
function stepFindings(
  journeys: readonly JourneyRow[],
  known: ReadonlySet<string | undefined>,
): Pick<StateCheck, 'dangling' | 'seeds'> {
  const steps = journeys.flatMap((journey) =>
    journey.steps.map((step) => ({ journey: journey.id, step })),
  );
  return {
    dangling: steps.flatMap(({ journey, step }) =>
      (step[4] ?? [])
        .filter((code) => !known.has(code))
        .map((code) => ({ journey, code })),
    ),
    seeds: steps.flatMap(({ journey, step }) =>
      step[5] && !known.has(step[5]) ? [{ journey, code: step[5] }] : [],
    ),
  };
}

function statesOf(epic: string): StateCheck | null {
  const index = stateIndex();
  const journeys = journeysOfEpic(epic);
  const shown = shownBy(journeys);
  const walked = WALKED.get(epic) ?? {};
  const mine = index
    .filter((row) => row.epic === epic)
    .map((row) => ({ code: String(row.code), print: row.print }));
  const met = mine.filter((row) => shown.has(row.code));
  const { dangling, seeds } = stepFindings(
    journeys,
    new Set(index.map((row) => row.code)),
  );
  return {
    need: mine.length,
    covered: met.length,
    uncovered: mine
      .filter((row) => !shown.has(row.code))
      .map((row) => row.code),
    dangling,
    changed: met
      .filter((row) => walked[row.code] && walked[row.code] !== row.print)
      .map((row) => ({ code: row.code, journeys: shown.get(row.code) ?? [] })),
    unwalked: met.filter((row) => !walked[row.code]).map((row) => row.code),
    seeds,
  };
}

// a person the directory does not know by id, a refusal key refusals.ts lacks, a word key messages.ts lacks
function namesOf(epic: string): Pick<JourneyCheck, 'people' | 'keys'> {
  const journeys = journeysOfEpic(epic);
  const people = journeys.flatMap((journey) =>
    journey.who
      .filter((who) => !DIRECTORY.person(who))
      .map((who) => ({ journey: journey.id, who })),
  );
  const unknown = (key: string): boolean => {
    try {
      REFUSALS.refusalSentence(key);
      return false;
    } catch {
      return true;
    }
  };
  const found = journeys.flatMap((journey) =>
    journey.steps.flatMap((step) =>
      keys(`${step[1]} ${step[2]}`)
        .filter(unknown)
        .map((key) => ({ journey: journey.id, key })),
    ),
  );
  return { people, keys: [...found, ...unsaid(journeys)] };
}

// a case another epic's journey covers is covered there: the regression replays it
function checkEpic(epic: string, groups: Groups): JourneyCheck {
  const all = TEST_CASES.flat(groups);
  const ids = new Set(all.map((one) => one.id));
  const hit = new Map<string, string[]>();
  const dangling = journeysOfEpic(epic).flatMap((journey) =>
    covers(journey).flatMap((id) => {
      if (!ids.has(id)) return [{ journey: journey.id, id }];
      hit.set(id, [...(hit.get(id) ?? []), journey.id]);
      return [];
    }),
  );
  const other = new Set(
    every()
      .filter((journey) => journey.epic !== epic)
      .flatMap(covers)
      .filter((id) => ids.has(id)),
  );
  const need = all.filter(TEST_CASES.needsJourney);
  return {
    states: statesOf(epic),
    need: need.length,
    covered: need.filter((one) => hit.has(one.id) || other.has(one.id)).length,
    byEarlier: need.filter((one) => !hit.has(one.id) && other.has(one.id))
      .length,
    uncovered: need.filter((one) => !hit.has(one.id) && !other.has(one.id)),
    dangling,
    ...namesOf(epic),
    byCase: Object.fromEntries(hit),
  };
}

interface Added {
  readonly step: number;
  readonly case: string;
  readonly why: string;
}

interface Missing extends Added {
  readonly journey: string;
  readonly missing: string;
}

const missed = (
  one: Added,
  { journey, missing }: Pick<Missing, 'journey' | 'missing'>,
): Missing => ({
  journey,
  step: one.step,
  case: one.case,
  why: one.why,
  missing,
});

function endpointCases(epic: string): ReadonlySet<string> {
  const endpoints = [
    ...COMMANDS.all.map((one) => one.id),
    ...QUERIES.all.map((one) => one.id),
  ];
  return new Set(
    TEST_CASES.flat(TEST_CASES.casesOfEpic(epic, endpoints)).map(
      (one) => one.id,
    ),
  );
}

// each added case not yet in the endpoint's cases ('case') or in the step's covers ('covers')
function addedMissing(
  epic: string,
  {
    journeyId,
    added,
  }: { readonly journeyId: string; readonly added?: readonly Added[] },
): readonly Missing[] {
  const journey = every().find(
    (one) => one.id === journeyId && one.epic === epic,
  );
  const have = endpointCases(epic);
  if (!journey)
    return (added ?? []).map((one) =>
      missed(one, { journey: journeyId, missing: 'journey' }),
    );
  return (added ?? []).flatMap((one) => {
    const isCovered = (journey.steps[one.step]?.[3] ?? []).includes(one.case);
    if (have.has(one.case) && isCovered) return [];
    return [
      missed(one, {
        journey: journeyId,
        missing: have.has(one.case) ? 'covers' : 'case',
      }),
    ];
  });
}

export { addedMissing, checkEpic };
