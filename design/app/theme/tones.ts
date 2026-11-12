/**
 * - `toneOf`, `badgeToneOf` · the palette role of a column's chip, an epic's badge
 * - `barColourOf` · a column's colour in a bar, a shade over the track for none
 * - `reachToneOf`, `caseKindToneOf` · a test case's reach and kind, as a chip's role
 */
type Tone = 'success' | 'info' | 'primary' | 'warning' | 'default';

const COLUMN_TONES: Readonly<Record<string, Tone | undefined>> = {
  done: 'success',
  doing: 'info',
  ready: 'primary',
};

const BADGE_TONES: Readonly<Record<string, Tone | undefined>> = {
  mvp: 'success',
  deferred: 'warning',
};

const toneOf = (column: string): Tone => COLUMN_TONES[column] ?? 'default';

const badgeToneOf = (badge: string): Tone => BADGE_TONES[badge] ?? 'default';

// a column with no palette role is drawn a shade darker than the bar's track
const barColourOf = (column: string): string => {
  const tone = toneOf(column);
  return tone === 'default' ? 'action.disabledBackground' : `${tone}.main`;
};

// shown and guarded need a person's walk, api a call alone
const REACH_TONES: Readonly<Record<string, Tone | undefined>> = {
  shown: 'info',
  guarded: 'warning',
};

// a refusal and a check say no, a shared case every endpoint answers
const CASE_KIND_TONES: Readonly<Record<string, Tone | undefined>> = {
  refusal: 'warning',
  check: 'warning',
  shared: 'info',
  case: 'success',
};

const reachToneOf = (reach: string): Tone => REACH_TONES[reach] ?? 'default';

const caseKindToneOf = (kind: string): Tone =>
  CASE_KIND_TONES[kind] ?? 'default';

export { badgeToneOf, barColourOf, caseKindToneOf, reachToneOf, toneOf };
