/**
 * - `app/theme/pagesTheme.ts` (W26): the shared theme, code's type and inks the tokens'
 * - a MUI component renders under it, so the pages can start from it
 */
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { tokens } from '../../app/styles/tokens.ts';
import { pagesTheme } from '../../app/theme/pagesTheme.ts';

describe('the pages wear the shared theme', () => {
  it('code is drawn in the mono face, its keywords in their ink', () => {
    expect(pagesTheme.typography.code.fontFamily).toBe(tokens.light.fontMono);
    expect(pagesTheme.palette.code.keyword).toBe(tokens.light.b300);
  });

  it('both colour schemes stand under the one attribute', () => {
    expect(Object.keys(pagesTheme.colorSchemes)).toEqual(['light', 'dark']);
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
