/**
 * - `FeatureTab`, `FeatureView`, `LinkRow`, `CombinationView` · tab, view, links
 * - `JourneyCard`, `JourneyStepView`, `StepCover`, `CoverView`, `CoverLine` · walks
 * - `CaseGroup`, `CaseRow` · the test cases, grouped by endpoint
 */
import type { FeatureStep } from '../../../roadmaps/features.ts';
import type { EpicNotes } from '../../../roadmaps/notes.ts';
import type { CodeLine, EndpointCode } from '../contract-view.ts';
import type {
  DocTypeView,
  FieldKindView,
  FieldOptionView,
} from './featureFieldTypes.ts';
import type { Section } from '../board-view.ts';

interface FeatureTab {
  readonly epic: string;
  readonly label: string;
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

interface JourneyCard {
  readonly id: string;
  readonly who: string;
  readonly goal: string;
  readonly steps: readonly JourneyStepView[];
  readonly test: string;
  readonly covers: string;
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

interface CombinationView {
  readonly file: string;
  readonly call: string;
  readonly criteria: string;
  readonly what: string;
}

interface LinkRow {
  readonly label: string;
  readonly href: string | null;
  readonly note: string;
}

interface FeatureView {
  readonly epic: string;
  readonly title: string;
  readonly status: string;
  readonly steps: readonly FeatureStep[];
  readonly notes: EpicNotes | null;
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
  readonly screens: readonly LinkRow[];
  readonly components: readonly LinkRow[];
  readonly combinations: readonly CombinationView[];
  readonly statesNamed: number;
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
  LinkRow,
  StepCover,
};
