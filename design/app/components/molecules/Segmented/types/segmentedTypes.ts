/**
 * - `SegmentedOption`, `SegmentedName` · an option, and the group's name
 */
/** Its words are its name, a glyph beside them aria-hidden · a glyph alone is named, aloud and on hover. */
export type SegmentedOption<T extends string = string> =
  | {
      readonly value: T;
      readonly label: React.ReactNode;
      readonly name?: never;
    }
  | {
      readonly value: T;
      readonly glyph: React.ReactElement;
      readonly name: string;
    };

/** The group's name · the caption drawn above it, or words of its own where none is drawn. */
export type SegmentedName =
  | { readonly labelledBy: string; readonly label?: never }
  | { readonly label: string; readonly labelledBy?: never };
