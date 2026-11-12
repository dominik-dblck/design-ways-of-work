/**
 * - `SCREENS`, `FAMILY` · every wireframe, numbered in its family
 * - `SCREEN_BY_NUM`, `SCREEN_BY_ID`, `SCREEN_BY_KEY` · a screen by number, id, key
 * - `list` · the screens a track view shows: its own, and the shared spine
 */
import type { Screen, Written } from './screenTypes.ts';
import { FAMILY, WRITTEN } from './writtenScreens.ts';

const familyOf = (screen: Written): string => FAMILY[screen.track] ?? '';

// the screens in their families' order, their rows' order within a family
const ORDERED = WRITTEN.map((screen, index) => ({ screen, index }))
  .sort(
    (one, other) =>
      Number(familyOf(one.screen)) - Number(familyOf(other.screen)) ||
      one.index - other.index,
  )
  .map(({ screen }) => screen);

// a number counts within its family: the digit, then a, b, c… · a variant its screen's number, -2, -3…
function numbered(screens: readonly Written[]): readonly Screen[] {
  const counts = new Map<string, number>();
  const variants = new Map<string, number>();
  const byKey = new Map<string, Screen>();
  return screens.map((screen) => {
    const parent = screen.variantOf ? byKey.get(screen.variantOf) : undefined;
    let screenNum: string;
    if (screen.variantOf && parent) {
      const nth = (variants.get(screen.variantOf) ?? 1) + 1;
      variants.set(screen.variantOf, nth);
      screenNum = `${parent.num}-${nth}`;
    } else {
      const family = familyOf(screen);
      const count = counts.get(family) ?? 0;
      screenNum = family + (count ? String.fromCharCode(96 + count) : '');
      counts.set(family, count + 1);
    }
    const done: Screen = {
      ...screen,
      num: screenNum,
      id: `s${screenNum}`,
      see: screen.see ?? [],
    };
    byKey.set(screen.key, done);
    return done;
  });
}

const NUMBERED = numbered(ORDERED);
const KEYED = new Map(NUMBERED.map((screen) => [screen.key, screen]));

// a screen's see names other screens by key, read as their numbers
const SCREENS: readonly Screen[] = NUMBERED.map((screen) => ({
  ...screen,
  see: screen.see.map((key) => KEYED.get(key)?.num ?? key),
}));

const SCREEN_BY_NUM: Readonly<Record<string, Screen | undefined>> =
  Object.fromEntries(SCREENS.map((screen) => [screen.num, screen]));
const SCREEN_BY_ID: Readonly<Record<string, Screen | undefined>> =
  Object.fromEntries(SCREENS.map((screen) => [screen.id, screen]));
const SCREEN_BY_KEY: Readonly<Record<string, Screen | undefined>> =
  Object.fromEntries(SCREENS.map((screen) => [screen.key, screen]));

const inTrack = (screen: Screen, track?: string): boolean =>
  !track ||
  track === 'all' ||
  screen.track === track ||
  screen.track === 'both';

const screensIn = (track?: string): readonly Screen[] =>
  SCREENS.filter((screen) => inTrack(screen, track));

export {
  SCREEN_BY_ID,
  SCREEN_BY_KEY,
  SCREEN_BY_NUM,
  FAMILY,
  SCREENS,
  screensIn as list,
};
