/**
 * - `PlanPage` · a plan page, read in its order
 * - `RuleRow`, `RuleSlot` · a rule or a checklist line, and a slot a product fills
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

// a rule or a checklist line: its key says what it does, cited as rule:{id} (W57)
interface RuleRow {
  readonly id: string;
  readonly says: string;
  readonly why: string;
}

// a slot a product fills (W58): the question it answers, the homes that already hold it, its rules
interface RuleSlot {
  readonly slot: 'domain' | 'product' | 'experience' | 'architecture' | 'quality';
  readonly asks: string;
  readonly homes: readonly string[];
  readonly rows: readonly RuleRow[];
}

export type { RuleRow, RuleSlot, PlanPage };
