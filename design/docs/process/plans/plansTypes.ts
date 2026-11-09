/**
 * - `PlanPage` · a plan page, read in its order
 * - `FileRow`, `ContextRead`, `CombinationFile` · a spec file and a first read
 * - `RuleRow`, `RuleSlot`, `Guard`, `DriftDecision` · a rule, a slot, guard, point
 */
import type { PersonId } from '../../../sheet/model/directory.ts';
interface PlanPage {
  readonly id: string;
  readonly title: string;
  readonly file: string;
  // a page is a rendering, a spec is data that travels to the repo, a fixture is one story's data
  readonly kind: 'page' | 'spec' | 'fixture';
  // a historical page is kept for the record, `by` names what superseded it
  readonly status: 'current' | 'historical';
  readonly by?: PersonId;
  readonly audience: 'us' | 'agent' | 'both';
  readonly reads: readonly string[];
  readonly purpose: string;
}

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

// a rule or a checklist line: its key says what it does, cited as rule:{id} (D29)
interface RuleRow {
  readonly id: string;
  readonly says: string;
  readonly why: string;
}

// a slot a product fills (D30): the question it answers, the homes that already hold it, its rules
interface RuleSlot {
  readonly slot: 'domain' | 'product' | 'experience' | 'architecture' | 'quality';
  readonly asks: string;
  readonly homes: readonly string[];
  readonly rows: readonly RuleRow[];
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

export type { RuleRow, RuleSlot, CombinationFile, ContextRead, DriftDecision, FileRow, Guard, PlanPage };
