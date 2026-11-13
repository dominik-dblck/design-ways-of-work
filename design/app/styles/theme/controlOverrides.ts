/**
 * - `CONTROL_OVERRIDES` · what a person presses or types in: buttons, fields, rows
 * - sizes read the one height scale; the press and focus ring are written once
 */
import type { ThemeOptions } from '@mui/material/styles';
import { controlGlyph, controlHeight } from '../scales.ts';
import { colour, length } from '../tokenReads.ts';

const FOCUS_RING = `2px solid ${colour('bdFocused')}`;
const NEUTRAL_BORDER = `1px solid ${colour('bdNeutral')}`;
const STRONG_BORDER = `1px solid ${colour('bdStrong')}`;

const ROUNDED = { root: { borderRadius: length('uiRControl') } };

const SIZED = {
  sizeSmall: { height: controlHeight.small },
  sizeMedium: { height: controlHeight.medium },
  sizeLarge: { height: controlHeight.large },
};

const squareOf = (size: keyof typeof controlHeight) => ({
  height: controlHeight[size],
  width: controlHeight[size],
  fontSize: controlGlyph[size],
});

/** The overrides of every control a person presses or types in. */
export const CONTROL_OVERRIDES: ThemeOptions['components'] = {
  MuiButtonBase: {
    defaultProps: { disableRipple: true },
    styleOverrides: {
      root: {
        transition: 'transform 100ms cubic-bezier(0.25, 0.1, 0.25, 1)',
        // the duration rides the press too · MUI's Button transition wins the root declaration
        '&:active': { transform: 'scale(0.98)', transitionDuration: '100ms' },
        '&:focus-visible': { outline: FOCUS_RING, outlineOffset: '2px' },
      },
    },
  },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: {
        // its words and its padding are its width · MUI's 64 widens a two-letter one past its height
        minWidth: 0,
        textTransform: 'none',
        boxShadow: 'none',
        backgroundImage: 'none',
        borderRadius: length('uiRControl'),
        '&.Mui-focusVisible': { outline: FOCUS_RING, outlineOffset: 2 },
        '&.Mui-disabled': {
          color: colour('fgDisabled'),
          backgroundColor: colour('bgSubtle'),
          border: 'none',
        },
      },
      ...SIZED,
      contained: {
        backgroundColor: colour('bgPrimary'),
        color: colour('fgSecondary'),
        backgroundImage: 'none',
        boxShadow: 'none',
        border: 'none',
        '&:hover': {
          backgroundColor: colour('bgPrimaryPressed'),
          boxShadow: 'none',
        },
        '&:active': { backgroundColor: colour('bgPrimaryPressed') },
      },
      outlined: {
        // MUI 9 leaves `outlined` transparent behind a variable this side never declares
        backgroundColor: colour('bgSecondary'),
        border: NEUTRAL_BORDER,
        color: colour('fgPrimary'),
        '&:hover': {
          backgroundColor: colour('uiHoverFill'),
          border: NEUTRAL_BORDER,
        },
        // a toggle on, hovered or not: its own fill, the strong border
        '&[aria-pressed="true"], &[aria-pressed="true"]:hover': {
          backgroundColor: colour('uiSelectedFill'),
          border: STRONG_BORDER,
        },
      },
      text: {
        color: colour('fgPrimary'),
        '&:hover': { backgroundColor: colour('uiHoverFill') },
      },
    },
  },
  MuiIconButton: {
    variants: [
      {
        props: { variant: 'outlined' },
        style: {
          backgroundColor: colour('bgSecondary'),
          color: colour('fgTertiary'),
          border: NEUTRAL_BORDER,
        },
      },
      { props: { variant: 'ghost' }, style: { color: colour('fgTertiary') } },
      {
        props: { variant: 'filled' },
        style: {
          backgroundColor: colour('bgPrimary'),
          color: colour('fgSecondary'),
        },
      },
    ],
    styleOverrides: {
      root: {
        borderRadius: length('uiRControl'),
        '&:hover:not([aria-disabled="true"])': {
          backgroundColor: colour('uiHoverFill'),
        },
      },
      sizeSmall: squareOf('small'),
      sizeMedium: squareOf('medium'),
      sizeLarge: squareOf('large'),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      // a mark before the value, a step apart, as a segment's glyph is
      adornedStart: ({ theme }) => ({ gap: theme.spacing(1) }),
      root: {
        borderRadius: length('uiRControl'),
        backgroundColor: colour('bgSecondary'),
        // a field's one mark of being there, at 3:1 against its ground (WCAG 1.4.11)
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colour('bdControl'),
        },
        height: controlHeight.medium,
        '&.MuiInputBase-sizeSmall': { height: controlHeight.small },
        '&.MuiInputBase-sizeLarge': { height: controlHeight.large },
        '&.MuiInputBase-multiline': { height: 'auto' },
        // locked reads at the tertiary ink · MUI's own disabled ink is fainter than a placeholder
        '&.Mui-disabled': { backgroundColor: colour('bgContainer') },
        '& .MuiInputBase-input.Mui-disabled': {
          color: colour('fgTertiary'),
          WebkitTextFillColor: colour('fgTertiary'),
        },
      },
    },
  },
  MuiMenuItem: { styleOverrides: ROUNDED },
  MuiListItemButton: { styleOverrides: ROUNDED },
  // a segment's words in their own case, as a button's · a glyph before them, a step apart
  MuiToggleButton: {
    styleOverrides: {
      ...SIZED,
      root: ({ theme }) => ({
        textTransform: 'none',
        gap: theme.spacing(0.75),
      }),
    },
  },
  // a link reads in its own ink · the underline arrives on hover, never at rest
  MuiLink: {
    defaultProps: { underline: 'hover' },
    styleOverrides: {
      root: {
        color: colour('inkLink'),
        '&:hover': { color: colour('inkLinkHover') },
      },
    },
  },
};

declare module '@mui/material/InputBase' {
  interface InputBasePropsSizeOverrides {
    large: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonOwnProps {
    variant?: 'outlined' | 'ghost' | 'filled';
  }
}
