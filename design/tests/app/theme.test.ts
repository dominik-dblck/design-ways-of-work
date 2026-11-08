/**
 * - `app/theme/theme.ts` (D22): every value the theme holds is a token's, both modes
 * - a MUI component renders under it, so the pages can start from it
 */
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { tokens } from '../../app/styles/tokens.ts';
import { theme } from '../../app/theme/theme.ts';

describe('the theme reads the tokens', () => {
  it('the light palette, the type and the shape are the tokens’', () => {
    const light = theme.colorSchemes.light?.palette;
    expect(light?.primary.main).toBe(tokens.light.bgPrimary);
    expect(light?.text.primary).toBe(tokens.light.fgPrimary);
    expect(theme.typography.fontFamily).toBe(tokens.light.fontSans);
    expect(theme.shape.borderRadius).toBe(tokens.light.uiRControl);
  });

  it('the dark palette takes what the dark block flips', () => {
    const dark = theme.colorSchemes.dark?.palette;
    expect(dark?.text.primary).toBe(tokens.dark.fgPrimary);
  });

  it('a MUI button renders under the theme', () => {
    const html = renderToString(
      createElement(
        ThemeProvider,
        { theme },
        createElement(Button, null, 'Go'),
      ),
    );
    expect(html).toContain('Go');
  });
});
