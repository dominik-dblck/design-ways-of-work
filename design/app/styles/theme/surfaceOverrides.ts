/**
 * - `SURFACE_OVERRIDES` · menus, popovers, dialogs, tooltips and papers
 * - each surface sits on its layer and carries its own radius, padding and shadow
 */
import type { PaperPropsVariantOverrides } from '@mui/material/Paper';
import type { ThemeOptions } from '@mui/material/styles';
import type { LightToken } from '../tokens.ts';
import { colour, length, text } from '../tokenReads.ts';

// the five layouts the wireframes draw a paper in · named once, on Paper's variant overrides
type PaperLayout = Extract<keyof PaperPropsVariantOverrides, string>;

// not on MuiPaper itself · every card and outlined surface is a Paper too
const floatingPaper = {
  backgroundColor: colour('uiPaperBg'),
  border: text('uiPaperBorder'),
  borderRadius: length('uiRPopover'),
  boxShadow: text('uiShadowPopover'),
};

const paperVariant = (
  variant: PaperLayout,
  at: {
    readonly ground: LightToken;
    readonly radius: LightToken;
    readonly shadow?: LightToken;
    readonly padding: string | number;
  },
) => ({
  props: { variant },
  style: {
    backgroundColor: colour(at.ground),
    border: `1px solid ${colour('bdContainer')}`,
    borderRadius: length(at.radius),
    ...(at.shadow === undefined ? {} : { boxShadow: colour(at.shadow) }),
    padding: at.padding,
    backgroundImage: 'none',
  },
});

/** The overrides of every surface that floats over the page or holds a part of it. */
export const SURFACE_OVERRIDES: ThemeOptions['components'] = {
  MuiMenu: {
    styleOverrides: {
      paper: { ...floatingPaper, padding: length('uiPaperPadMenu') },
      root: { zIndex: length('uiZMenu') },
    },
  },
  MuiPopover: {
    styleOverrides: {
      paper: { ...floatingPaper, padding: text('uiPaperPadPopover') },
      // raised to the dialog's layer inside one, when it is not portalled out
      root: {
        zIndex: length('uiZMenu'),
        '.MuiDialog-root &': { zIndex: length('uiZDialog') },
      },
    },
  },
  MuiDialog: {
    defaultProps: {
      slotProps: { backdrop: { sx: { zIndex: length('uiZOverlay') } } },
    },
    styleOverrides: {
      paper: { ...floatingPaper, padding: 0 },
      root: {
        zIndex: length('uiZDialog'),
        // the container fades as its own stack, so it takes the layer and not the paper
        '& > .MuiDialog-container': {
          position: 'relative',
          zIndex: length('uiZDialog'),
        },
      },
    },
  },
  MuiTooltip: {
    defaultProps: { arrow: false, enterDelay: 300, placement: 'top' },
    styleOverrides: {
      tooltip: {
        // the ink's inverse, never the accent · black in light, white in dark, where primary is cyan
        backgroundColor: colour('fgPrimary'),
        color: colour('bgSecondary'),
        borderRadius: length('uiRControl'),
        fontSize: length('uiDense'),
        // tokens.css has no slot for either, so they stay the CSS they are
        padding: '6px 8px',
        maxWidth: '260px',
      },
    },
  },
  MuiPaper: {
    styleOverrides: { outlined: { borderRadius: length('uiRControl') } },
    variants: [
      paperVariant('menu', {
        ground: 'bgSecondary',
        radius: 'uiRPopover',
        shadow: 'uiShadowPopover',
        padding: length('uiPaperPadMenu'),
      }),
      paperVariant('popover', {
        ground: 'bgSecondary',
        radius: 'uiRPopover',
        shadow: 'uiShadowPopover',
        padding: text('uiPaperPadPopover'),
      }),
      paperVariant('dialog', {
        ground: 'bgDisplay',
        radius: 'uiRPopover',
        shadow: 'uiShadowDialog',
        padding: 0,
      }),
      paperVariant('container', {
        ground: 'bgSecondary',
        radius: 'uiRControl',
        padding: length('sp4'),
      }),
      paperVariant('card', {
        ground: 'bgSecondary',
        radius: 'uiRControl',
        padding: length('sp5'),
      }),
    ],
  },
  MuiCard: {
    styleOverrides: { root: { borderRadius: length('uiRControl') } },
  },
};

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    menu: true;
    popover: true;
    dialog: true;
    container: true;
    card: true;
  }
}
