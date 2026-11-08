/**
 * - `toneOf`, `badgeToneOf` · the palette role of a column's chip, an epic's badge
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

export { badgeToneOf, toneOf };
