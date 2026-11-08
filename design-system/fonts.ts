/**
 * - `fonts`, `fontsNote` · the faces of the families, each a file in `fonts/`
 */
import type { FontFace } from './designTypes.ts';

const fontsNote =
  'Basis Grotesque Pro — primary brand family.\nUploaded as .ttf into /fonts.';

// prettier-ignore
const fonts: readonly FontFace[] = [
  { family: 'Basis Grotesque Pro', file: 'fonts/BasisGrotesquePro-Light.ttf', format: 'truetype', weight: 300, style: 'normal', display: 'swap' },
  { family: 'Basis Grotesque Pro', file: 'fonts/BasisGrotesquePro-LightItalic.ttf', format: 'truetype', weight: 300, style: 'italic', display: 'swap' },
  { family: 'Basis Grotesque Pro', file: 'fonts/BasisGrotesquePro-Regular.ttf', format: 'truetype', weight: 400, style: 'normal', display: 'swap' },
  { family: 'Basis Grotesque Pro', file: 'fonts/BasisGrotesquePro-Italic.ttf', format: 'truetype', weight: 400, style: 'italic', display: 'swap' },
  { family: 'Basis Grotesque Pro', file: 'fonts/BasisGrotesquePro-Medium.ttf', format: 'truetype', weight: 500, style: 'normal', display: 'swap' },
  { family: 'Basis Grotesque Pro', file: 'fonts/BasisGrotesquePro-MediumItalic.ttf', format: 'truetype', weight: 500, style: 'italic', display: 'swap' },
  { family: 'Basis Grotesque Pro', file: 'fonts/BasisGrotesquePro-Bold.ttf', format: 'truetype', weight: 700, style: 'normal', display: 'swap' },
  { family: 'Basis Grotesque Pro', file: 'fonts/BasisGrotesquePro-BoldItalic.ttf', format: 'truetype', weight: 700, style: 'italic', display: 'swap' },
  { family: 'Basis Grotesque Pro', file: 'fonts/BasisGrotesquePro-Black.ttf', format: 'truetype', weight: 900, style: 'normal', display: 'swap' },
  { family: 'Basis Grotesque Pro', file: 'fonts/BasisGrotesquePro-BlackItalic.ttf', format: 'truetype', weight: 900, style: 'italic', display: 'swap' },
];

export { fonts, fontsNote };
