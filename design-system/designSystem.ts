/**
 * - `designSystem` · every token group of the system, in the order a theme reads it
 * - `isToken` · an entry that is a token, not a heading between tokens
 */
import type { Token, TokenEntry, TokenGroup } from './designTypes.ts';
import { elevation } from './tokens/elevation.ts';
import { glyphs } from './tokens/glyphs.ts';
import { hover } from './tokens/hover.ts';
import { inks } from './tokens/inks.ts';
import { layers } from './tokens/layers.ts';
import { motion } from './tokens/motion.ts';
import { outlines } from './tokens/outlines.ts';
import { palette } from './tokens/palette.ts';
import { radii } from './tokens/radii.ts';
import { roles } from './tokens/roles.ts';
import { sizes } from './tokens/sizes.ts';
import { spacing } from './tokens/spacing.ts';
import { states } from './tokens/states.ts';
import { surfaces } from './tokens/surfaces.ts';
import { typography } from './tokens/typography.ts';

const designSystem: readonly TokenGroup[] = [
  ...palette,
  ...roles,
  ...typography,
  ...spacing,
  ...radii,
  ...elevation,
  ...outlines,
  ...states,
  ...inks,
  ...glyphs,
  ...hover,
  ...sizes,
  ...surfaces,
  ...layers,
  ...motion,
];

const isToken = (entry: TokenEntry): entry is Token => 'name' in entry;

export { designSystem, isToken };
