/**
 * - `FeatureTab`, `FeatureView`, `CombinationView` · tab, view, combinations
 * - `JourneyCard`, `JourneyStepView`, `StepCover`, `CoverView`, `CoverLine` · walks
 * - `CaseGroup`, `CaseRow`, `NoteLine`, `NotePoint`, `NotesView` · cases, notes
 */
import type { CodeLine, EndpointCode } from '../contractView.ts';
import type {
  DocTypeView,
  FieldKindView,
  FieldOptionView,
} from './featureFieldTypes.ts';
import type { Section } from '../boardView.ts';

interface FeatureTab {
  readonly epic: string;
  readonly status: string;
}

interface StepCover {
  readonly id: string;
  readonly reach: string;
  readonly known: boolean;
}

interface JourneyStepView {
  readonly n: number;
  readonly where: string;
  readonly does: string;
  readonly sees: string;
  readonly covers: readonly StepCover[];
}

// a person on a journey: the initials a chip shows, the name it holds for the reader
interface JourneyPerson {
  readonly initials: string;
  readonly name: string;
}

interface JourneyCard {
  readonly id: string;
  readonly people: readonly JourneyPerson[];
  readonly goal: string;
  readonly steps: readonly JourneyStepView[];
  readonly test: string;
  // its counts as chips: its steps, the test cases it covers, the endpoints they hit
  readonly counts: readonly string[];
}

interface CoverLine {
  readonly title: string;
  readonly chip: string;
  readonly ok: boolean;
  readonly share: number;
}

interface CoverView {
  readonly cases: CoverLine;
  readonly states: CoverLine | null;
  readonly problems: readonly string[];
}

interface CaseRow {
  readonly id: string;
  readonly kind: string;
  readonly when: string;
  readonly then: string;
  readonly reach: string;
  readonly compound: boolean;
}

interface CaseGroup {
  readonly endpoint: string;
  readonly route: string;
  readonly cases: readonly CaseRow[];
}

// one point of a notebook line, its words in bold kept apart
type NotePoint = readonly { readonly text: string; readonly strong: boolean }[];

// a notebook line in parts: its head in bold, who decided it and when, its points
interface NoteLine {
  readonly head: string | null;
  readonly source: string | null;
  readonly points: readonly NotePoint[];
}

interface NotesView {
  readonly lede: readonly string[];
  readonly sections: readonly {
    readonly title: string;
    readonly lines: readonly NoteLine[];
  }[];
}

interface CombinationView {
  readonly file: string;
  readonly call: string;
  readonly criteria: string;
  readonly what: string;
}

interface FeatureView {
  readonly epic: string;
  readonly title: string;
  readonly status: string;
  readonly notes: NotesView | null;
  readonly journeys: readonly JourneyCard[];
  readonly cover: CoverView | null;
  readonly endpoints: readonly EndpointCode[];
  readonly caseGroups: readonly CaseGroup[];
  readonly caseKinds: readonly {
    readonly kind: string;
    readonly count: number;
  }[];
  readonly fieldKinds: readonly FieldKindView[];
  readonly fieldOptions: readonly FieldOptionView[];
  readonly fieldsCode: readonly CodeLine[];
  readonly docTypes: readonly DocTypeView[];
  readonly decisions: readonly Section[];
  readonly combinations: readonly CombinationView[];
  readonly statesNamed: number;
  // a combinations file counted, seconds long, so run when asked
  readonly countOf: (file: string) => string;
}

export type {
  CaseGroup,
  CaseRow,
  CombinationView,
  CoverLine,
  CoverView,
  FeatureTab,
  FeatureView,
  JourneyCard,
  JourneyStepView,
  NoteLine,
  NotePoint,
  NotesView,
  StepCover,
};
