/**
 * - `ChipFamily`, `ChipPair`, `pairOf` · chip rows by key, a pair, its pair
 * - `AppStateChips`, `AppStatePairs` · state keys an app augments, its pairs
 * - `chipVariantsOf`, `sharedChipVariants`, `chipPairsWith` · variants, pairs
 */
import type { Palette } from '@mui/material/styles';
import type { LightToken } from '../tokens.ts';
import { colour } from '../tokenReads.ts';

type ChipTokens = readonly [LightToken, LightToken];

/** A family of chips by key, each its wash and ink · an app hands its own to `themeWith`. */
export type ChipFamily = Readonly<Record<string, ChipTokens>>;

/** A chip family's one pair · a wash and the ink that reads on it. */
export interface ChipPair {
  readonly bg: string;
  readonly fg: string;
}

/** The state keys `palette.state` holds · the shared three, and an app's own by augmentation. */
export interface AppStateChips {
  readonly draft: true;
  readonly review: true;
  readonly ready: true;
}

type StateName = Extract<keyof AppStateChips, string>;

// token names written out, not built from the word · a renamed `--st-*` is then a tsc error
const STATE_CHIPS = {
  draft: ['stDraftBg', 'stDraftFg'],
  review: ['stReviewBg', 'stReviewFg'],
  ready: ['stReadyBg', 'stReadyFg'],
} as const satisfies ChipFamily;

// what a version held, on the removed pair, and what replaced it, on ready's
const DIFF_SIDES = {
  then: ['washRemoved', 'inkRemoved'],
  now: ['stReadyBg', 'inkReady'],
} as const satisfies ChipFamily;

type SharedState = keyof typeof STATE_CHIPS;
type DiffSide = keyof typeof DIFF_SIDES;

/** The pairs an app adds to `palette.state` · exactly the states it augmented. */
export type AppStatePairs = Readonly<
  Record<Exclude<StateName, SharedState>, ChipPair>
>;

/** `['stDraftBg', 'stDraftFg']` → `{ bg, fg }` · each a variable with its light value as floor. */
export const pairOf = ([bg, fg]: ChipTokens): ChipPair => ({
  bg: colour(bg),
  fg: colour(fg),
});

interface ChipVariant<K extends string> {
  readonly key: K;
  readonly props: (props: {
    readonly variant?: string | undefined;
    readonly color?: string | undefined;
  }) => boolean;
  readonly style: { readonly backgroundColor: string; readonly color: string };
}

/** A family as `state` variants of Chip, matched on `color` · `for…in` keeps each key the family's. */
export const chipVariantsOf = <F extends ChipFamily>(
  family: F,
): readonly ChipVariant<Extract<keyof F, string>>[] => {
  const variants: ChipVariant<Extract<keyof F, string>>[] = [];
  for (const key in family) {
    const tokens = family[key];
    if (tokens === undefined) continue;
    const [bg, fg] = tokens;
    variants.push({
      key,
      props: (props) => props.variant === 'state' && props.color === key,
      style: { backgroundColor: colour(bg), color: colour(fg) },
    });
  }
  return variants;
};

/** The shared state chips' variants · an app's families follow them. */
export const sharedChipVariants = (): readonly ChipVariant<SharedState>[] =>
  chipVariantsOf(STATE_CHIPS);

/** The pairs a palette carries, an app's states added · fresh per scheme. */
export const chipPairsWith = (
  appStates: AppStatePairs,
): Pick<Palette, 'state' | 'diff'> => ({
  state: {
    draft: pairOf(STATE_CHIPS.draft),
    review: pairOf(STATE_CHIPS.review),
    ready: pairOf(STATE_CHIPS.ready),
    ...appStates,
  },
  diff: { then: pairOf(DIFF_SIDES.then), now: pairOf(DIFF_SIDES.now) },
});

declare module '@mui/material/styles' {
  interface Palette {
    state: Record<StateName, ChipPair>;
    diff: Record<DiffSide, ChipPair>;
  }
  interface PaletteOptions {
    state?: Record<StateName, ChipPair>;
    diff?: Record<DiffSide, ChipPair>;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    state: true;
  }
  interface ChipPropsColorOverrides {
    draft: true;
    review: true;
    ready: true;
  }
}
