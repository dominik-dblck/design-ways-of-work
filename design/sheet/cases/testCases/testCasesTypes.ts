/**
 * - `TestCase`, `CaseSpec`, `CaseKind`, `Journey` · a case, its claim, its walk
 * - `ReadEndpoint`, `EndpointCase`, `EndpointRow`, `EndpointGroup`, `Reader` · rows
 * - `BaselineCase`, `CaseChanges` · what a baseline compares
 */
type CaseKind = 'case' | 'refusal' | 'check' | 'shared';

// a case as a row writes it: when, then, and where it is reached
type EndpointCase = readonly [
  when: string,
  then: string,
  reach?: string,
  since?: string,
];

// an endpoint as the cases read it: a command's or a query's row
interface ReadEndpoint {
  readonly id: string;
  readonly epic?: string;
  readonly no?: number;
  readonly ticket?: string;
  readonly route?: string;
  readonly actor?: readonly string[];
  readonly emits?: readonly string[];
  readonly cases?: readonly EndpointCase[];
  readonly refuses?: readonly string[];
  readonly refusesSince?: Readonly<Record<string, string>>;
  readonly checks?: Readonly<Record<string, string>>;
  readonly omits?: readonly string[];
  readonly mention?: unknown;
  readonly body?: string;
  readonly answer?: string;
  readonly writes?: string;
}

interface TestCase {
  readonly id: string;
  readonly endpoint: string;
  readonly kind: CaseKind;
  readonly when: string;
  readonly then: string;
  readonly source: string;
  readonly refs: readonly string[];
  readonly compound: boolean;
  readonly reach: string | null;
  readonly digest: string;
}

interface EndpointGroup {
  readonly endpoint: string;
  readonly kind: 'command' | 'query';
  readonly ticket: string;
  readonly since: string | null;
  readonly route: string;
  readonly actor: string;
  readonly cases: readonly TestCase[];
}

// a test case as the last cut pack carries it
interface BaselineCase {
  readonly id: string;
  readonly digest: string;
  readonly then: string;
  readonly endpoint: string;
  readonly kind: string;
}

interface CaseChanges {
  readonly added: readonly BaselineCase[];
  readonly changed: readonly BaselineCase[];
  readonly gone: readonly BaselineCase[];
  readonly renamed: readonly { readonly from: string; readonly to: string }[];
}

interface EndpointRow {
  readonly endpoint: ReadEndpoint;
  readonly isCommand: boolean;
  readonly only?: string;
}

interface CaseSpec {
  readonly endpoint: string;
  readonly kind: CaseKind;
  readonly name: string;
  readonly when: string;
  readonly then: string;
  readonly source?: string | undefined;
  readonly reach?: string | null | undefined;
}

interface Reader {
  readonly epic: string;
  readonly names: readonly string[];
}

interface Journey {
  readonly covers?: readonly string[];
}

export type {
  BaselineCase,
  CaseChanges,
  CaseSpec,
  ReadEndpoint,
  EndpointGroup,
  EndpointRow,
  Journey,
  Reader,
  TestCase,
};
