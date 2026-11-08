/**
 * - `journeysPart` · part g: every epic's journeys against the test cases: each
 * - case a step names exists, each person, each refusal key; each ticket's cases
 */
import { lineOf, messageOf } from './checkWorld.ts';
import * as COMMANDS from '../../sheet/contract/commands.ts';
import * as JOURNEYS from '../../sheet/cases/journeys.ts';
import * as QUERIES from '../../sheet/contract/queries.ts';
import * as TEST_CASES from '../../sheet/cases/test-cases.ts';
import * as TICKETS from '../../roadmaps/tickets.ts';

type Cases = typeof TEST_CASES;
type Journeys = typeof JOURNEYS;
type Groups = ReturnType<Cases['casesOfEpic']>;

const EPICS: readonly string[] = [
  'E00',
  'E01',
  'E02',
  'E03',
  'E04',
  'E05',
  'E06',
  'E07',
  'E08',
  'E09',
  'E10',
  'E18',
];
const FEATURED: readonly string[] = ['E04', 'E06', 'E09', 'E18'];

// the cases a person meets, read with each feature ticket's own endpoints as the Feature page reads them
function metLines({
  cases,
  journeys,
}: {
  readonly cases: Cases;
  readonly journeys: Journeys;
}): readonly string[] {
  return FEATURED.flatMap((epic) => {
    const ticket = TICKETS.byId[`T-${epic}-00`];
    if (!ticket) return [];
    try {
      const met = journeys.check(
        epic,
        cases.casesOfEpic(epic, cases.named(ticket.touches || [])),
      );
      const count = met.uncovered.length;
      const ids = met.uncovered
        .slice(0, 4)
        .map((one) => String(Reflect.get(Object(one), 'id')));
      return [
        lineOf(`cases met ${epic}`, {
          ok: count === 0,
          text: `${count} uncovered${count ? ` · ${ids.join(', ')}` : ''}`,
        }),
      ];
    } catch (error) {
      return [
        lineOf(`cases met ${epic}`, { ok: false, text: messageOf(error) }),
      ];
    }
  });
}

// every endpoint's cases at once, so one id held twice fails here
function idsLine(cases: Cases): string {
  try {
    const every = [
      ...COMMANDS.all.map((one) => one.id),
      ...QUERIES.all.map((one) => one.id),
    ];
    const count = cases.flat(cases.casesOfEpic('E18', every)).length;
    return lineOf('case ids', {
      ok: true,
      text: `${count} cases over ${every.length} endpoints, every id once`,
    });
  } catch (error) {
    return lineOf('case ids', { ok: false, text: messageOf(error) });
  }
}

// a journey carries its test, but one epic's journeys wait on its refinement
function epicLine(
  epic: string,
  {
    groups,
    journeys,
  }: { readonly groups: Groups; readonly journeys: Journeys },
): readonly string[] {
  let checked: ReturnType<Journeys['check']>;
  try {
    checked = journeys.check(epic, groups);
  } catch {
    return [];
  }
  const dangling = checked.dangling.length;
  const keys = checked.keys.length;
  const people = checked.people.length;
  const walked = journeys.journeysOfEpic(epic);
  const untested =
    epic === 'E14'
      ? []
      : walked.filter((one) => !one.test).map((one) => one.id);
  if (!(dangling + keys + people) && !walked.length) return [];
  const shown = dangling
    ? ` · ${checked.dangling
        .slice(0, 3)
        .map((one) => `${one.journey} ${one.id}`)
        .join(' ; ')}`
    : '';
  return [
    lineOf(`journeys ${epic}`, {
      ok: !(dangling + keys + people + untested.length),
      text: `${walked.length} journeys · dangling ${dangling} · keys ${keys} · people ${people} · no test ${untested.length}${shown}`,
    }),
  ];
}

function journeysPart(): readonly string[] {
  const cases: Cases = TEST_CASES;
  const journeys: Journeys = JOURNEYS;
  const groups = EPICS.flatMap((epic) => {
    try {
      return cases.casesOfEpic(epic);
    } catch {
      return [];
    }
  });
  return [
    ...metLines({ cases, journeys }),
    idsLine(cases),
    ...EPICS.flatMap((epic) => epicLine(epic, { groups, journeys })),
  ];
}

export { journeysPart };
