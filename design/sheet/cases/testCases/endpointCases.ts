/**
 * - `ownCases`, `refusalCases`, `checkCases`, `sharedCases` · a row's test cases
 * - `sinceOf` · the epic a later refusal carries
 */
import { checkReach, omitted, refusalReach } from './caseReach.ts';
import { compound, digest, refs, slug } from './caseText.ts';
import type {
  CaseSpec,
  ReadEndpoint,
  EndpointRow,
  Reader,
  TestCase,
} from './testCasesTypes.ts';
import * as REFUSALS from '../../contract/refusals.ts';
import * as SHARED_CASES from '../sharedCases.ts';

function sinceOf(endpoint: ReadEndpoint, key: string): string | null {
  return endpoint.refusesSince?.[key] || null;
}

function caseOf(spec: CaseSpec): TestCase {
  const name = spec.kind === 'case' ? slug(spec.name) : String(spec.name);
  const source = spec.source || '';
  return {
    id: `${spec.endpoint}.${spec.kind}.${name || digest(spec.when)}`,
    endpoint: spec.endpoint,
    kind: spec.kind,
    when: String(spec.when),
    then: String(spec.then),
    source,
    refs: refs(`${spec.when} ${spec.then} ${source}`),
    compound:
      (spec.kind === 'case' || spec.kind === 'check') && compound(spec.then),
    reach: spec.reach || null,
    digest: digest(`${spec.when}\n${spec.then}`),
  };
}

function ownCases(row: EndpointRow, names: readonly string[]): TestCase[] {
  const { endpoint, only } = row;
  const mine = (since?: string): boolean =>
    only
      ? since === only
      : !since || since === endpoint.epic || names.includes(endpoint.id);
  return (endpoint.cases ?? [])
    .filter(([, , , since]) => mine(since))
    .map(([when, then, reach]) =>
      caseOf({
        endpoint: endpoint.id,
        kind: 'case',
        name: when,
        when,
        then,
        reach,
      }),
    );
}

function sentenceOf(key: string): string {
  try {
    return REFUSALS.refusalSentence(key);
  } catch {
    return '—';
  }
}

// a refusal a later epic adds to an earlier row carries it in refusesSince and is that epic's to test
function refusalCases(row: EndpointRow, reader: Reader): TestCase[] {
  const { endpoint, only } = row;
  const mine = (since: string | null): boolean =>
    only
      ? since === only
      : !since || since === endpoint.epic || since === reader.epic;
  return (endpoint.refuses ?? [])
    .filter((key) => mine(sinceOf(endpoint, key)))
    .map((key) =>
      caseOf({
        endpoint: endpoint.id,
        kind: 'refusal',
        name: key,
        when: key,
        then: `409 ${key} — “${sentenceOf(key)}”`,
        reach: omitted(endpoint, key) ? 'api' : refusalReach(key),
      }),
    );
}

function checkCases(endpoint: ReadEndpoint): TestCase[] {
  return Object.entries(endpoint.checks ?? {}).map(([field, text]) =>
    caseOf({
      endpoint: endpoint.id,
      kind: 'check',
      name: field,
      when: field,
      then: text,
      reach: checkReach(text),
    }),
  );
}

function sharedCases(row: EndpointRow): TestCase[] {
  const { endpoint, isCommand } = row;
  const whens = (endpoint.cases ?? []).map(([when]) => when);
  return SHARED_CASES.all
    .filter((sharedCase) =>
      SHARED_CASES.applies({ sharedCase, endpoint, isCommand, whens }),
    )
    .map((sharedCase) =>
      caseOf({
        endpoint: endpoint.id,
        kind: 'shared',
        name: sharedCase.id,
        when: sharedCase.when,
        then: sharedCase.then,
        source: sharedCase.source,
        reach: omitted(endpoint, sharedCase.id) ? 'api' : sharedCase.reach,
      }),
    );
}

export { checkCases, ownCases, refusalCases, sharedCases, sinceOf };
