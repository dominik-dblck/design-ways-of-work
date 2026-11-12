/**
 * - `every`, `journeysOfEpic`, `covers` · the journeys, an epic's, a journey's cases
 * - `keys`, `sayStep` · the refusal keys a step names; its words, each line filled
 * - `criteria` · a journey as a ticket criterion, refine-check line 33's grammar
 */
import { JOURNEYS, typeJourneys } from './journeyRows.ts';
import type { CaseWhere, JourneyRow, JourneyStep } from './journeyTypes.ts';
import { SAY_TOKEN, paramsOf, wordOf } from './journeyWords.ts';
import * as COMMANDS from '../../contract/commands.ts';
import * as QUERIES from '../../contract/queries.ts';
import * as REFUSALS from '../../contract/refusals.ts';
import * as TEST_CASES from '../testCases.ts';

// a case step reads the case's own words, the command's or the query's, else its id
function caseWords({ case: id }: CaseWhere): string {
  const [endpoint = '', slug] = id.split('.case.');
  const found = COMMANDS.byId[endpoint] || QUERIES.byId[endpoint];
  const row = found
    ? (found.cases || []).find((one) => TEST_CASES.slug(one[0]) === slug)
    : undefined;
  return row ? row[0] : id;
}

function resolved(step: JourneyStep): JourneyStep {
  const [where, ...rest] = step;
  return typeof where === 'string' ? step : [caseWords(where), ...rest];
}

function every(): readonly JourneyRow[] {
  const written = JOURNEYS.map((journey) =>
    journey.steps.some(([where]) => typeof where !== 'string')
      ? { ...journey, steps: journey.steps.map(resolved) }
      : journey,
  );
  return [...written, ...typeJourneys()];
}

function journeysOfEpic(epic: string): readonly JourneyRow[] {
  return every().filter((journey) => journey.epic === epic);
}

// a journey covers what its steps cover
function covers(journey: JourneyRow): readonly string[] {
  return [...new Set(journey.steps.flatMap((step) => step[3] ?? []))];
}

// {refusal:key|name=value} is a refusal's own line, read when shown
const TOKEN = /\{refusal:([a-z_]+\.[a-z_]+)((?:\|[^|}]+)*)\}/g;

function keys(text: unknown): readonly string[] {
  return [...String(text).matchAll(TOKEN)].map((found) => String(found[1]));
}

function sentenceOf(key: string, rest: string): string {
  try {
    return `“${REFUSALS.refusalSentenceFor(key, paramsOf(rest))}”`;
  } catch (error) {
    return `[${key} · ${error instanceof Error ? error.message : String(error)}]`;
  }
}

function sayStep(text: unknown): string {
  return String(text)
    .replace(TOKEN, (_, key: string, rest: string) => sentenceOf(key, rest))
    .replace(SAY_TOKEN, (_, key: string, rest: string) => wordOf(key, rest));
}

function criterionOf(journey: JourneyRow): string {
  const first = sayStep(journey.steps[0]?.[0]);
  const last = sayStep(journey.steps[journey.steps.length - 1]?.[0]);
  return `${journey.id} · ${journey.who.join(' and ')} ${journey.goal.replace(/·/g, ',')} · its steps as journeys.ts · ${journey.id} writes them, from ${first} to ${last} · test (e2e, Playwright): one flow under e2e/, its title opening with ${journey.id} — the repository names the file, and every test case journeys.ts · ${journey.id} names passes in it by id`;
}

// a journey another ticket walks names it, and only that ticket's criteria list it
function criteria(epic: string, ticket?: string): readonly string[] {
  return journeysOfEpic(epic)
    .filter((journey) => (ticket ? journey.ticket === ticket : !journey.ticket))
    .map(criterionOf);
}

export { covers, criteria, every, journeysOfEpic, keys, sayStep };
