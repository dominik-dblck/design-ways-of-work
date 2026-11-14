/**
 * - `app/theme/pagesTheme.ts` (W26): the shared theme, code's type and inks the tokens'
 * - code inks step per mode; a dark OS gets MUI's dark beside the tokens
 * - a MUI component renders under it, so the pages can start from it
 * - a page with no font loader reads the token stack; a plain chip is never ink on ink
 */
import { Button, Chip } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { muiDarkOf, tokenSheetOf } from '../../app/styles/theme.ts';
import { colour } from '../../app/styles/tokenReads.ts';
import { tokens } from '../../app/styles/tokens.ts';
import { pagesTheme } from '../../app/theme/pagesTheme.ts';

describe('the pages wear the shared theme', () => {
  it('code is drawn in the mono face, its keywords in their ink', () => {
    expect(pagesTheme.typography.code.fontFamily).toBe(tokens.light.fontMono);
    expect(pagesTheme.palette.code.keyword).toBe(tokens.light.inkCodeKeyword);
  });

  it('a dark OS with no mode chosen gets the dark tokens and MUI’s dark palette', () => {
    const sheet = tokenSheetOf({
      light: tokens.light,
      dark: tokens.dark,
      muiDark: muiDarkOf(pagesTheme),
    });
    const ground = pagesTheme.colorSchemes.dark?.palette.background.default;
    expect(ground).toBeDefined();
    expect(sheet).toMatchObject({
      '@media (prefers-color-scheme: dark)': {
        ':root:not([data-theme="light"])': {
          '--mui-palette-background-default': ground,
          '--bg-display': tokens.dark.bgDisplay,
        },
      },
    });
  });

  it('a code ink takes its own step in dark', () => {
    const dark = pagesTheme.colorSchemes.dark?.palette.code.keyword;
    expect(dark).toBe(tokens.dark.inkCodeKeyword);
    expect(dark).not.toBe(tokens.light.inkCodeKeyword);
  });

  it('both colour schemes stand under the one attribute', () => {
    expect(Object.keys(pagesTheme.colorSchemes)).toEqual(['light', 'dark']);
  });

  it('the type falls back to the token stack when no font loader sets the basis face', () => {
    expect(pagesTheme.typography.fontFamily).toBe(
      'var(--font-basis, var(--font-sans))',
    );
  });

  it('a chip with no colour sits on the subtle wash, its ink apart from its ground', () => {
    const html = renderToString(
      createElement(
        ThemeProvider,
        { theme: pagesTheme },
        createElement(Chip, { label: 'Blocked' }),
      ),
    );
    expect(html).toContain(`background-color:${colour('bgSubtle')}`);
    expect(colour('bgSubtle')).not.toBe(colour('fgPrimary'));
  });

  it('a MUI button renders under the theme', () => {
    const html = renderToString(
      createElement(
        ThemeProvider,
        { theme: pagesTheme },
        createElement(Button, null, 'Go'),
      ),
    );
    expect(html).toContain('Go');
  });
});
