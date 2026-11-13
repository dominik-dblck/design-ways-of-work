/**
 * - `markOverridesWith` · chips, badges, avatars, type: what labels, takes no press
 * - `ChipVariants` · Chip's variants as the theme takes them, an app's too
 */
import type { Components, Theme, ThemeOptions } from '@mui/material/styles';
import {
  chipVariantsOf,
  sharedChipVariants,
  type ChipFamily,
} from './chipFamilies.ts';
import { colour, length, text } from '../tokenReads.ts';

const AVATAR_SIZE = { width: length('uiHSm'), height: length('uiHSm') };

const CHIP_EDGE = `1px solid color-mix(in srgb, currentColor ${text('uiChipEdge')}, transparent)`;

/** Chip's variants as the theme takes them · an app hands in its own beside its families. */
export type ChipVariants = NonNullable<
  NonNullable<Components<Theme>['MuiChip']>['variants']
>;

// a state chip reads in sentence case · its words keep the specification's capitals
const CHIP_VARIANTS: ChipVariants = [
  {
    props: { variant: 'state' },
    style: ({ theme }) => ({
      fontSize: theme.typography.caption.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      lineHeight: length('lhTight'),
      // its edge is its own ink, faint · the wash keeps its colour and gains a rim on a white row
      border: CHIP_EDGE,
      '& .MuiChip-label': {
        display: 'inline-block',
        textTransform: 'lowercase',
      },
      '& .MuiChip-label::first-letter': { textTransform: 'uppercase' },
      // a state's glyph sits close in, its word a step after it
      '& > svg': {
        marginLeft: theme.spacing(0.875),
        flexShrink: 0,
        color: 'inherit',
      },
      '& > svg + .MuiChip-label': {
        paddingLeft: theme.spacing(0.625),
      },
      // a mark after the word, a tool's: a space before it, centred on the word
      '& .MuiChip-label > svg': {
        marginLeft: theme.spacing(0.75),
        verticalAlign: 'middle',
      },
    }),
  },
  // a state standing on its own · the control's height, the pill's corner
  {
    props: { variant: 'state', size: 'medium' },
    style: ({ theme }) => ({
      height: theme.mixins.control.medium,
      borderRadius: length('uiRPill'),
      fontSize: theme.typography.body2.fontSize,
      '& .MuiChip-label': { paddingInline: theme.spacing(1.5) },
      '& > svg': { marginLeft: theme.spacing(1.5) },
    }),
  },
];

const NON_CHIP_MARKS: ThemeOptions['components'] = {
  MuiBadge: {
    styleOverrides: {
      badge: { fontSize: length('uiCaption'), borderRadius: length('uiRTag') },
    },
    // a count says how many; the dot's face is BadgeDot's, drawn by the Badge atom
    variants: [
      {
        props: { variant: 'count' },
        style: {
          '& .MuiBadge-badge': {
            backgroundColor: colour('bgPrimary'),
            color: colour('fgSecondary'),
            borderRadius: length('uiRPill'),
            minWidth: length('uiMarkBadge'),
            height: length('uiMarkBadge'),
            padding: '0 4px',
          },
        },
      },
    ],
  },
  MuiAvatar: {
    styleOverrides: {
      root: { ...AVATAR_SIZE, fontSize: length('uiCaption') },
      // initials on n-600 read 5.96 in both modes · the grey MUI picks reads 3.21 – 3.52
      colorDefault: {
        backgroundColor: colour('n600'),
        color: colour('dbkWhite'),
      },
    },
  },
  MuiAvatarGroup: {
    defaultProps: { max: 3 },
    styleOverrides: { avatar: AVATAR_SIZE },
  },
  MuiBreadcrumbs: {
    styleOverrides: { li: { fontSize: length('uiDense') } },
  },
  MuiDivider: {
    styleOverrides: { root: { borderColor: colour('bdContainer') } },
  },
  MuiTypography: {
    // a heading level is a document outline, never a size
    defaultProps: {
      variantMapping: { overline: 'span', subtitle2: 'div' },
    },
  },
};

/** The overrides of every mark a screen labels with · an app's chip family becomes chips too. */
export const markOverridesWith = (
  appChips: ChipFamily,
  appVariants: ChipVariants,
): ThemeOptions['components'] => ({
  MuiChip: {
    styleOverrides: { root: { borderRadius: length('uiRTag') } },
    variants: [
      ...CHIP_VARIANTS,
      ...sharedChipVariants(),
      ...chipVariantsOf(appChips),
      ...appVariants,
    ],
  },
  ...NON_CHIP_MARKS,
});

declare module '@mui/material/Badge' {
  interface BadgePropsVariantOverrides {
    count: true;
  }
}
