/**
 * - `SheetToken`, `SheetPart`, `SheetGroup`, `Sheet` · a stylesheet's tokens as read, before they are split
 * - `Source` · which stylesheet: the company's design system, or the product's layer over it
 */
import type {
  ElementStyle,
  FontFace,
} from '../../../design-system/designTypes.ts';

type Source = 'ds' | 'product';

interface SheetToken {
  readonly name: string;
  light: string;
  dark?: string;
  reducedMotion?: string;
  why?: string;
  whyDark?: string;
}

// a run of tokens under one heading: a group's own first run has no heading
interface SheetPart {
  readonly note: string | null;
  readonly tokens: SheetToken[];
}

interface SheetGroup {
  readonly source: Source;
  readonly title: string;
  readonly intro: string;
  readonly darkNotes: string[];
  readonly parts: SheetPart[];
}

interface Sheet {
  readonly groups: SheetGroup[];
  readonly fonts: FontFace[];
  readonly elements: ElementStyle[];
  readonly notes: string[];
}

export type {
  ElementStyle,
  FontFace,
  Sheet,
  SheetGroup,
  SheetPart,
  SheetToken,
  Source,
};
