/**
 * - `Token`, `TokenNote`, `TokenEntry`, `TokenGroup` · a token, a heading, a group
 * - `FontFace`, `ElementStyle` · a font face; the style an element or class takes
 */
interface Token {
  readonly name: `--${string}`;
  readonly light: string;
  readonly dark?: string;
  readonly reducedMotion?: string;
  readonly why?: string;
  readonly whyDark?: string;
}

interface TokenNote {
  readonly note: string;
}

type TokenEntry = Token | TokenNote;

interface TokenGroup {
  readonly title: string;
  readonly intro: string;
  readonly darkNote?: string;
  readonly entries: readonly TokenEntry[];
}

interface FontFace {
  readonly family: string;
  readonly file: string;
  readonly format: string;
  readonly weight: number;
  readonly style: string;
  readonly display: string;
}

interface ElementStyle {
  readonly selector: string;
  readonly style: readonly (readonly [string, string])[];
}

export type {
  ElementStyle,
  FontFace,
  Token,
  TokenEntry,
  TokenGroup,
  TokenNote,
};
