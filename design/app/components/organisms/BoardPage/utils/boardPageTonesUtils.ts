/**
 * - `toneOf`, `badgeToneOf` · the palette role of a column's chip, an epic's badge
 * - `barColourOf` · a column's colour in a bar, a shade over the track for none
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

export { badgeToneOf, barColourOf, toneOf };
