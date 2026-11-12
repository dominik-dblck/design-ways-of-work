/**
 * - `JourneyRow`, `JourneyStep`, `CaseWhere` · one person's path, one flow
 * - `JourneyCheck`, `StateCheck` · what a journey's epic leaves uncovered
 */
import type { EpicId, TicketId } from '../../../roadmaps/ids.ts';
import type { PersonId } from '../../model/directory.ts';

// a step whose where is a test case's: the case's own words, read when shown
interface CaseWhere {
  readonly case: string;
}

// covers: the test cases the step makes happen · states: the 02a codes it shows · seed: where it starts
type JourneyStep = readonly [
  where: string | CaseWhere,
  does: string,
  sees: string,
  covers?: readonly string[],
  states?: readonly string[],
  seed?: string,
];

interface JourneyRow {
  readonly id: string;
  readonly epic: EpicId;
  readonly ticket?: TicketId;
  readonly each?: string;
  readonly who: readonly PersonId[];
  readonly goal: string;
  readonly steps: readonly JourneyStep[];
  readonly test?: string;
  readonly waits?: 'refinement';
}

interface Found {
  readonly journey: string;
}

interface StateCheck {
  readonly need: number;
  readonly covered: number;
  readonly uncovered: readonly string[];
  readonly dangling: readonly (Found & { readonly code: string })[];
  readonly changed: readonly {
    readonly code: string;
    readonly journeys: readonly string[];
  }[];
  readonly unwalked: readonly string[];
  readonly seeds: readonly (Found & { readonly code: string })[];
}

interface JourneyCheck {
  readonly states: StateCheck | null;
  readonly need: number;
  readonly covered: number;
  readonly byEarlier: number;
  readonly uncovered: readonly unknown[];
  readonly dangling: readonly (Found & { readonly id: string })[];
  readonly people: readonly (Found & { readonly who: PersonId })[];
  readonly keys: readonly (Found & { readonly key: string })[];
  readonly byCase: Readonly<Record<string, readonly string[] | undefined>>;
}

export type { CaseWhere, JourneyRow, JourneyCheck, JourneyStep, StateCheck };
