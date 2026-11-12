/**
 * - `FileRow`, `ContextRead`, `CombinationFile` · a spec file and a first read
 * - `Guard`, `DriftDecision` · a guard against drift, and a decided point
 */

interface FileRow {
  readonly file: string;
  readonly holds: string;
}

interface ContextRead {
  readonly read: string;
  readonly why: string;
}

interface CombinationFile {
  readonly epic: string;
  readonly file: string;
  readonly fn: string;
  readonly call: string;
  readonly count: string;
  readonly criteria: string;
  readonly what: string;
}

interface Guard {
  readonly id: string;
  readonly title: string;
  readonly prevents: string;
  readonly does: string;
  readonly where: string;
  readonly evidence: readonly string[];
  readonly cost: string;
  readonly risk: string;
  readonly when: string;
}

interface DriftDecision {
  readonly id: string;
  readonly decided: string;
  readonly phrases: readonly string[];
  readonly where: string;
}

export type { CombinationFile, ContextRead, DriftDecision, FileRow, Guard };
