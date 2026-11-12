/**
 * - `JOURNEYS`, `WALKED` · each epic's written journeys; the prints they walked
 * - `typeJourneys`, `stateIndex` · the type library's journeys, the states
 */
import type { JourneyRow } from './journeyTypes.ts';

const JOURNEYS: readonly JourneyRow[] = [];

const WALKED: ReadonlyMap<
  string,
  Readonly<Record<string, string | undefined>>
> = new Map();

const typeJourneys = (): readonly JourneyRow[] => [];

const stateIndex = (): readonly {
  readonly epic: string;
  readonly code: string;
  readonly print: string;
}[] => [];

export { JOURNEYS, WALKED, stateIndex, typeJourneys };
