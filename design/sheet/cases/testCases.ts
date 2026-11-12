/**
 * - `casesOfEpic`, `named`, `flat` · each endpoint's tests, generated, never by hand
 * - `casesAddedRemoved`, `uncovered`, `needsJourney` · what moved, what needs a walk
 * - `slug`, `compound` · a case's id, two claims in one
 */
import {
  casesAddedRemoved,
  flat,
  uncovered,
} from './testCases/caseBaseline.ts';
import { needsJourney } from './testCases/caseReach.ts';
import { compound, slug } from './testCases/caseText.ts';
import {
  checkCases,
  ownCases,
  refusalCases,
  sharedCases,
  sinceOf,
} from './testCases/endpointCases.ts';
import type {
  ReadEndpoint,
  EndpointGroup,
  EndpointRow,
  Reader,
  TestCase,
} from './testCases/testCasesTypes.ts';
import * as COMMANDS from '../contract/commands.ts';
import * as QUERIES from '../contract/queries.ts';

// the endpoint ids a read list names: commands.ts · X, queries.ts · Y (X.js on a closed ticket)
function named(readList?: readonly unknown[] | null): string[] {
  const words = (readList ?? [])
    .map(String)
    .filter((entry) => /^(commands|queries)\.[tj]s/.test(entry))
    .flatMap((entry) => entry.match(/\b[A-Z][A-Za-z]+\b/g) ?? []);
  return [...new Set(words)];
}

// a case a later epic adds to an earlier epic's row carries that epic: the row comes along with none of its own refusals, checks or shared cases
function rowsOf(epic: string, names: readonly string[]): EndpointRow[] {
  const commands = COMMANDS.all;
  const queries = QUERIES.all;
  const own = (endpoint: ReadEndpoint): boolean =>
    endpoint.epic === epic || names.includes(endpoint.id);
  const later = (endpoint: ReadEndpoint): boolean =>
    !own(endpoint) &&
    ((endpoint.cases ?? []).some((row) => row[3] === epic) ||
      (endpoint.refuses ?? []).some((key) => sinceOf(endpoint, key) === epic));
  return [
    ...commands.filter(own).map((endpoint) => ({ endpoint, isCommand: true })),
    ...queries.filter(own).map((endpoint) => ({ endpoint, isCommand: false })),
    ...commands
      .filter(later)
      .map((endpoint) => ({ endpoint, isCommand: true, only: epic })),
    ...queries
      .filter(later)
      .map((endpoint) => ({ endpoint, isCommand: false, only: epic })),
  ];
}

function groupOf(row: EndpointRow, reader: Reader): EndpointGroup {
  const { endpoint, isCommand, only } = row;
  return {
    endpoint: endpoint.id,
    kind: isCommand ? 'command' : 'query',
    ticket: isCommand
      ? `T-${endpoint.epic}-${String(endpoint.no).padStart(2, '0')}`
      : endpoint.ticket || '—',
    since: only || null,
    route: endpoint.route || '',
    actor: isCommand ? (endpoint.actor ?? []).join(', ') : 'every role',
    cases: [
      ...ownCases(row, reader.names),
      ...refusalCases(row, reader),
      ...(only ? [] : [...checkCases(endpoint), ...sharedCases(row)]),
    ],
  };
}

function duplicatesOf(cases: readonly TestCase[]): string[] {
  const seen = new Set<string>();
  return cases.flatMap(({ id }) => {
    if (seen.has(id)) return [id];
    seen.add(id);
    return [];
  });
}

// one group per endpoint: the epic's rows and the rows a read list names
function casesOfEpic(
  epic: string,
  namedIds?: readonly string[] | null,
): EndpointGroup[] {
  const names = namedIds ?? [];
  const reader = { epic, names };
  const groups = rowsOf(epic, names).map((row) => groupOf(row, reader));
  const twice = duplicatesOf(groups.flatMap((group) => group.cases));
  if (twice.length > 0) {
    throw new Error(
      `testCases.ts · two test cases under one id: ${twice.join(', ')} · give one of them another when`,
    );
  }
  return groups;
}

export {
  casesAddedRemoved,
  casesOfEpic,
  compound,
  flat,
  named,
  needsJourney,
  slug,
  uncovered,
};
export type { ReadEndpoint, EndpointGroup, TestCase };
