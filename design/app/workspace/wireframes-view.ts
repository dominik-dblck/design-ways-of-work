/**
 * - `wireframesOf` · every screen the sheet draws, grouped by its track, in order
 * - `wireframesWords` · every word the Wireframes page says that is not the sheet's
 */
import { all as SCREENS } from '../../sheet/screens/wireframes.ts';

interface ScreenCard {
  readonly id: string;
  readonly num: string;
  readonly title: string;
  readonly sub: string;
}

interface TrackGroup {
  readonly track: string;
  readonly screens: readonly ScreenCard[];
}

const WIREFRAMES_WORDS = {
  eyebrow: 'Wireframes · every screen together',
  intro:
    'Every screen the sheet draws, in its family’s order. Each is a placeholder until the shared components of the design system draw it.',
  placeholder: 'Drawn here from the design system’s components',
  track: 'track',
} as const;

function wireframesOf(): readonly TrackGroup[] {
  const groups = new Map<string, ScreenCard[]>();
  for (const screen of SCREENS) {
    const cards = groups.get(screen.track) ?? [];
    cards.push({ id: screen.id, num: screen.num, title: screen.title, sub: screen.sub });
    groups.set(screen.track, cards);
  }
  return [...groups].map(([track, screens]) => ({ track, screens }));
}

export { WIREFRAMES_WORDS as wireframesWords, wireframesOf };
export type { ScreenCard, TrackGroup };
