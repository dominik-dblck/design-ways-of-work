/**
 * - `Glyph` · one glyph at a theme step, in currentColor
 */
import { useTheme } from '@mui/material/styles';
import { GLYPHS } from './constants/glyphSetConstants.ts';
import type { GlyphName } from './constants/glyphSetConstants.ts';
import type { GlyphSize } from './types/glyphTypes.ts';

export type GlyphProps = {
  readonly name: GlyphName;
  readonly size: GlyphSize;
  // said to a reader where the glyph alone carries the meaning, hidden otherwise
  readonly label?: string;
  readonly testId?: string;
};

export function Glyph({
  name,
  size,
  label,
  testId,
}: GlyphProps): React.ReactElement {
  const { mixins } = useTheme();
  const Icon = GLYPHS[name];
  const px =
    size === 'dot' || size === 'badge' || size === 'inline'
      ? mixins.mark[size]
      : mixins.glyph[size];
  return (
    <Icon
      size={px}
      strokeWidth={mixins.stroke[size]}
      aria-hidden={label === undefined}
      aria-label={label}
      role={label === undefined ? undefined : 'img'}
      data-testid={testId}
      focusable="false"
    />
  );
}
