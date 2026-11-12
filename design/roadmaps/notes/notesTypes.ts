/**
 * - `EpicNotes`, `NoteSection`, `NoteKind` · a notebook, one section, its kind
 */
import type { EpicId } from '../ids.ts';

type NoteKind =
  | 'ask'
  | 'principle'
  | 'carriedIn'
  | 'found'
  | 'contractQueue'
  | 'points'
  | 'decisions'
  | 'check'
  | 'wireframeWalk'
  | 'testCases'
  | 'journeys'
  | 'specRows'
  | 'steps'
  | 'next'
  | 'scope';

interface NoteSection {
  readonly kind: NoteKind;
  readonly title: string;
  readonly lines: readonly string[];
}

interface EpicNotes {
  readonly epic: EpicId;
  readonly title: string;
  readonly lede: readonly string[];
  readonly sections: readonly NoteSection[];
}

export type { EpicNotes, NoteKind, NoteSection };
