/**
 * - `railMotion` · the rail's one transition, the reduced-motion guard attached
 * - one duration and one easing for both · 220ms, the band's top
 * - `railFadeIn` · a thing that arrives, fading in on its own frame
 */
import type { Theme } from '@mui/material/styles';

const RAIL_TRANSITION_DURATION = 220;
const RAIL_TRANSITION_EASING = 'cubic-bezier(0.25, 0.1, 0.25, 1)';

/** A union, not a string · a misspelt property would compile and animate nothing. */
export type RailProperty =
  | 'width'
  | 'max-width'
  | 'opacity'
  | 'background-color'
  | 'border-color'
  | 'color';

/** What `sx` is handed · a transition, and the media query that turns it off. */
export type RailMotion = {
  readonly transition: (theme: Theme) => string;
  readonly '@media (prefers-reduced-motion: reduce)': {
    readonly transition: 'none';
  };
};

/** The transition every moving part of the rail shares, with the reduced-motion guard attached. */
export function railMotion(...properties: readonly RailProperty[]): RailMotion {
  return {
    transition: (theme: Theme) =>
      theme.transitions.create([...properties], {
        duration: RAIL_TRANSITION_DURATION,
        easing: RAIL_TRANSITION_EASING,
      }),
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  } as const;
}

/** A thing that arrives rather than moves · mounted on hover, so it fades in on its own frame. */
export const railFadeIn = {
  animation: `railFadeIn ${RAIL_TRANSITION_DURATION}ms ${RAIL_TRANSITION_EASING}`,
  '@keyframes railFadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
} as const;
