/**
 * - `MenuEntry`, `MenuGroup` · a row: label, glyph, tone, count; and a group of rows
 * - `MenuPlacement`, `MenuWidth` · below or above its anchor; narrow, medium or wide
 */
import type { ListItemTone } from '../../../atoms/ListItem/index.ts';

export type MenuEntry = {
  readonly label: string;
  readonly icon?: React.ReactNode;
  readonly tone?: ListItemTone;
  readonly badge?: number;
  readonly onSelect?: () => void;
  readonly testId?: string;
};

export type MenuGroup = readonly MenuEntry[];

export type MenuPlacement = 'below' | 'above';

export type MenuWidth = 'narrow' | 'medium' | 'wide';
