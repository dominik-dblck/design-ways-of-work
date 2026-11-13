/**
 * - `Crumb` · an ancestor with its link, a switcher with its menu, or the page
 */
import type { GlyphName } from '../../../atoms/Glyph/index.ts';

/** The page and a switcher may be muted · drawn in the secondary ink, a document in the trash. */
export type Crumb =
  | {
      readonly label: string;
      readonly href: string;
      readonly onSwitch?: never;
      readonly glyph?: GlyphName;
      readonly testId?: string;
    }
  | {
      readonly label: string;
      readonly onSwitch: (anchor: HTMLElement) => void;
      readonly expanded: boolean;
      readonly muted?: boolean;
      readonly href?: never;
      readonly glyph?: GlyphName;
      readonly testId?: string;
    }
  | {
      readonly label: string;
      readonly href?: never;
      readonly onSwitch?: never;
      readonly muted?: boolean;
      readonly glyph?: GlyphName;
      readonly testId?: string;
    };
