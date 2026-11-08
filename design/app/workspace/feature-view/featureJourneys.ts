/**
 * - `journeysOf` · an epic's journeys: who, the goal, each step and its cases
 */
import * as JOURNEYS from '../../../sheet/cases/journeys.ts';
import { byId as PEOPLE } from '../../../sheet/model/directory.ts';
import type * as TEST_CASES from '../../../sheet/cases/test-cases.ts';
import { FEATURE_WORDS } from './featureWords.ts';
import type { JourneyCard, StepCover } from './featureTypes.ts';

type TestCase = ReturnType<typeof TEST_CASES.flat>[number];
type Journey = ReturnType<typeof JOURNEYS.journeysOfEpic>[number];
type Step = Journey['steps'][number];

const counted = (count: number, noun: string): string =>
  `${count} ${noun}${count === 1 ? '' : 's'}`;

const nameOf = (initials: string): string => PEOPLE[initials]?.name ?? initials;

function whereOf(where: Step[0]): string {
  return typeof where === 'string'
    ? JOURNEYS.say(where)
    : `${FEATURE_WORDS.journeys.seeded} ${where.case}`;
}

function coversOf(
  ids: readonly string[],
  cases: ReadonlyMap<string, TestCase>,
): readonly StepCover[] {
  return ids.map((id) => {
    const found = cases.get(id);
    return { id, reach: found?.reach ?? '—', known: found !== undefined };
  });
}

function cardOf(
  journey: Journey,
  cases: ReadonlyMap<string, TestCase>,
): JourneyCard {
  const all = JOURNEYS.covers(journey);
  const endpoints = new Set(all.map((id) => id.split('.')[0]));
  return {
    id: journey.id,
    who: journey.who.map(nameOf).join(', '),
    goal: journey.goal,
    steps: journey.steps.map((step, at) => ({
      n: at + 1,
      where: whereOf(step[0]),
      does: JOURNEYS.say(step[1]),
      sees: JOURNEYS.say(step[2]),
      covers: coversOf(step[3] ?? [], cases),
    })),
    test: JOURNEYS.say(journey.test),
    covers: `${counted(all.length, 'test case')} over ${counted(endpoints.size, 'endpoint')}`,
  };
}

function journeysOf(
  epic: string,
  cases: readonly TestCase[],
): readonly JourneyCard[] {
  const byId = new Map(cases.map((one) => [one.id, one]));
  return JOURNEYS.journeysOfEpic(epic).map((journey) => cardOf(journey, byId));
}

export { journeysOf };
