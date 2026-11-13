/**
 * - `Tone`, `toneInk` · the tones a line takes, and the ink each reads
 */
export type Tone = 'inherit' | 'primary' | 'secondary' | 'danger' | 'micro';

/** Typography's `color` names a `text.*` ink by its key · `textMicro` is `text.micro`. */
export const toneInk = {
  inherit: 'inherit',
  primary: 'textPrimary',
  secondary: 'textSecondary',
  danger: 'textDanger',
  micro: 'textMicro',
} as const satisfies Record<Tone, string>;
