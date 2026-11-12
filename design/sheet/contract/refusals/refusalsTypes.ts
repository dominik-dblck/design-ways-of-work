/**
 * - `RefusalRow`, `RefusalEntry`, `RefusalView`, `RefusalSubject` · a refusal, read
 * - `RefusalCoverage`, `RefusalFills`, `Endpoint` · the counts, the data, a command
 */
type RefusalRow = readonly [key: string, note?: string];

interface RefusalEntry {
  readonly key: string;
  readonly subject: string;
  readonly from: string;
  readonly note: string;
  readonly fix: string | null;
  readonly _empty: Readonly<Record<string, string>> | null;
}

interface RefusalView {
  readonly key: string;
  readonly subject: string;
  readonly line: string;
  readonly takes: readonly string[];
  readonly fix: string | null;
  readonly from: string;
  readonly quoted: boolean;
  readonly note: string;
  readonly empty: Readonly<Record<string, string>> | null;
}

interface RefusalSubject {
  readonly subject: string;
  readonly refusals: readonly RefusalView[];
}

interface RefusalCoverage {
  readonly total: number;
  readonly quoted: number;
  readonly recoverable: number;
  readonly templated: number;
  readonly used: number;
  readonly unused: readonly string[];
  readonly unknown: readonly string[];
}

type RefusalFills = Readonly<Record<string, unknown>>;

interface Endpoint {
  readonly actor?: readonly string[];
  readonly route?: string;
}

export type {
  Endpoint,
  RefusalFills,
  RefusalEntry,
  RefusalCoverage,
  RefusalRow,
  RefusalSubject,
  RefusalView,
};
