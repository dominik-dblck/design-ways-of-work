/**
 * - `Token`, `TokenNote`, `TokenEntry`, `TokenGroup` · a token, a heading, a group
 * - `FontFace`, `ElementStyle` · a font face; the style an element or class takes
 * - `Guide`, `GuideSection` · the guide: its title, its opening, its sections
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

// a line names a token as `{--x}` or `{--x:dark}`; `{why:--a,--b}` alone lists those tokens and their use
interface GuideSection {
  readonly heading: string;
  readonly level: 2 | 3;
  readonly lines: readonly string[];
}

interface Guide {
  readonly title: string;
  readonly intro: readonly string[];
  readonly sections: readonly GuideSection[];
}

export type {
  ElementStyle,
  FontFace,
  Guide,
  GuideSection,
  Token,
  TokenEntry,
  TokenGroup,
  TokenNote,
};
