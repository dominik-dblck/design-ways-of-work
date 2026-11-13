/**
 * - `SurfaceVariant` · the five layouts the wireframes draw, as Paper names them
 */
import type { PaperPropsVariantOverrides } from '@mui/material/Paper';

export type SurfaceVariant = Extract<keyof PaperPropsVariantOverrides, string>;
