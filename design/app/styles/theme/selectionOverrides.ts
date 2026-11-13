/**
 * - `SELECTION_OVERRIDES` · the boxes a person ticks: checkbox, radio, switch
 * - a 16px box hovers with a 28px halo behind it, and a list row turns it off
 */
import type { ThemeOptions } from '@mui/material/styles';
import { colour, length } from '../tokenReads.ts';

// a pseudo-element and not padding · a box grown to carry its hover would move its neighbours
const HALO = {
  padding: 0,
  position: 'relative' as const,
  '&:hover': { backgroundColor: 'transparent' },
  '&:hover::before': {
    content: '""',
    position: 'absolute' as const,
    width: length('uiHSm'),
    height: length('uiHSm'),
    borderRadius: length('uiRPill'),
    backgroundColor: colour('uiHoverFill'),
    zIndex: -1,
  },
  '.MuiListItemButton-root &:hover::before': {
    backgroundColor: 'transparent',
  },
};

// a track as wide as a medium control, a thumb a small glyph wide, the rest shared around it
const SWITCH = (() => {
  const width = length('uiHMd');
  const thumb = length('uiGlyphSm');
  const pad = (width - thumb * 2) / 2;
  return {
    width,
    thumb,
    pad,
    height: thumb + pad * 2,
    travel: width - thumb - pad * 2,
    opaque: 1,
  };
})();

/** The overrides of the checkbox, the radio and the switch. */
export const SELECTION_OVERRIDES: ThemeOptions['components'] = {
  MuiCheckbox: { styleOverrides: { root: HALO } },
  MuiRadio: { styleOverrides: { root: HALO } },
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: SWITCH.width,
        height: SWITCH.height,
        padding: 0,
        overflow: 'visible',
        '&:hover .MuiSwitch-track': { backgroundColor: colour('fgTertiary') },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: colour('bgSuccess'),
          opacity: SWITCH.opaque,
        },
        '&:hover .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: colour('g500'),
        },
      },
      switchBase: {
        padding: SWITCH.pad,
        '&:hover, &.Mui-checked:hover': { backgroundColor: 'transparent' },
        '&.Mui-checked': { transform: `translateX(${SWITCH.travel}px)` },
      },
      thumb: {
        width: SWITCH.thumb,
        height: SWITCH.thumb,
        boxShadow: 'none',
        backgroundColor: colour('bgSecondary'),
      },
      track: {
        borderRadius: length('uiRPill'),
        backgroundColor: colour('bgDivider'),
        opacity: SWITCH.opaque,
      },
    },
  },
};
