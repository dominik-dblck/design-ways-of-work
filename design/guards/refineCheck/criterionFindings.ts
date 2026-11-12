/**
 * - `criterionFindings`, `edgeFindings`, `whyFindings` · criteria, edges, why
 * - one test each, short, no existence, no shape, a dated count, no history
 */
import type { Finding, SheetEdge, SheetTicket } from './refineCheckTypes.ts';
import {
  DATE,
  EXISTS,
  LOSER,
  MAX_CRITERION,
  NUMBER,
  PATH,
  SHAPE,
  TEST,
  testClause,
  WHY,
} from './refineRules.ts';
import type { ProductView } from '../../tools/productTypes.ts';

const DONE_COUNT = /^DONE · [^']*?stateIndex — (\d+), counted/;

function shapeFindings(criterion: string, where: string): Finding[] {
  const out: Finding[] = [];
  if (!TEST.test(criterion)) {
    out.push({
      rule: 'one-criterion-one-test',
      where,
      text: 'no test clause — a criterion is one test',
    });
  }
  if (criterion.length > MAX_CRITERION) {
    out.push({
      rule: 'criterion-is-only-the-assertion',
      where,
      text: `${criterion.length} characters · over ${MAX_CRITERION} — history and why belong in the note or EDGES`,
    });
  }
  const clause = testClause(criterion);
  const exists = clause.match(EXISTS);
  if (exists) {
    out.push({
      rule: 'criterion-says-what-file-holds',
      where,
      text: `the test asserts existence: “${exists[0]}” — name what the file must hold`,
    });
  }
  const shape = clause.match(SHAPE);
  if (shape) {
    out.push({
      rule: 'test-asserts-value-not-look',
      where,
      text: `the test parses a shape: “${shape[0]}” — a shape is the reader’s at arch-review; a test asserts a value or a mechanism (rule:component-defined-when-needed)`,
    });
  }
  return out;
}

function historyFindings(criterion: string, where: string): Finding[] {
  const out: Finding[] = [];
  const count = criterion.match(NUMBER);
  if (count && !DATE.test(criterion)) {
    out.push({
      rule: 'a-count-carries-its-date',
      where,
      text: `a count without a date: “${count[0]}” — a count is a count somebody made, when`,
    });
  }
  const loser = criterion.match(LOSER);
  if (loser) {
    out.push({
      rule: 'decide-one-point-at-a-time',
      where,
      text: `carries a losing option or its history: “${loser[0]}” — the pick stays, the path goes to EDGES`,
    });
  }
  return out;
}

// DONE's count of states against the product's own count for the ticket's epic, when it has one
function doneCount(
  criterion: string,
  {
    where,
    epic,
    statesOf,
  }: {
    readonly where: string;
    readonly epic: string;
    readonly statesOf: ProductView['statesOf'];
  },
): Finding[] {
  const found = DONE_COUNT.exec(criterion);
  if (!found || statesOf === undefined) return [];
  const have = statesOf(epic);
  if (have === Number(found[1])) return [];
  return [
    {
      rule: 'a-count-carries-its-date',
      where,
      text: `DONE counts ${found[1]} states, stateIndex marks ${have} ${epic} — recount, with today’s date`,
    },
  ];
}

function criterionFindings(
  ticket: SheetTicket,
  {
    edges,
    placeholder,
    statesOf,
  }: {
    readonly edges: readonly SheetEdge[];
    readonly placeholder: boolean;
    readonly statesOf: ProductView['statesOf'];
  },
): Finding[] {
  const edgeOn = new Map<number, number>();
  edges.forEach((edge) => edgeOn.set(edge.on, (edgeOn.get(edge.on) ?? 0) + 1));
  return ticket.acceptance.flatMap((criterion, index) => {
    const where = `c${index + 1}`;
    const isUnedged = !edgeOn.get(index + 1) && !placeholder;
    return [
      ...shapeFindings(criterion, where),
      ...historyFindings(criterion, where),
      ...(isUnedged
        ? [
            {
              rule: 'every-case-has-an-edge' as const,
              where,
              text: 'no edge — every criterion that names a case has the case one step aside in EDGES, or an edge whose pick says why none exists',
            },
          ]
        : []),
      ...doneCount(criterion, { where, epic: ticket.epic, statesOf }),
    ];
  });
}

function edgeFindings(
  edge: SheetEdge,
  { where, criteria }: { readonly where: string; readonly criteria: number },
): Finding[] {
  const out: Finding[] = [];
  const say = (rule: Finding['rule'], text: string): void => {
    out.push({ rule, where, text });
  };
  const options = Object.keys(edge.options ?? {});
  if (options.length < 2)
    say(
      'decide-one-point-at-a-time',
      'fewer than two options — an edge is decided between alternatives on a named axis',
    );
  if (!edge.pick || !options.includes(edge.pick))
    say(
      'decide-one-point-at-a-time',
      `pick “${edge.pick}” is not one of its options`,
    );
  if (!edge.why || edge.why.length < 40)
    say(
      'decide-one-point-at-a-time',
      'why is missing or one clause — say why the others lost',
    );
  if (!edge.into)
    say(
      'decide-one-point-at-a-time',
      'no into — the pick is written twice, into the criterion and here',
    );
  if (edge.on > criteria)
    say(
      'every-case-has-an-edge',
      `lands on c${edge.on}, the ticket has ${criteria}`,
    );
  return out;
}

function whyFindings(ticket: SheetTicket): Finding[] {
  const why = ticket.why;
  if (!why)
    return [
      {
        rule: 'why-for-the-pm',
        where: 'why',
        text: 'missing — five lines for the PM',
      },
    ];
  return [
    ...WHY.filter((key) => !why[key]).map((key) => ({
      rule: 'why-for-the-pm' as const,
      where: `why.${key}`,
      text: 'missing',
    })),
    ...WHY.filter((key) => why[key] && PATH.test(why[key] ?? '')).map(
      (key) => ({
        rule: 'why-for-the-pm' as const,
        where: `why.${key}`,
        text: 'carries a file path — product words only',
      }),
    ),
  ];
}

export { criterionFindings, edgeFindings, whyFindings };
