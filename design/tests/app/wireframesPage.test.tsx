/**
 * - `app/pages/wireframes/WireframesPage.tsx`: every screen the sheet draws, each held for its drawing
 */
import { ThemeProvider } from '@mui/material/styles';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { WireframesPage } from '../../app/components/organisms/WireframesPage/index.ts';
import { theme } from '../../app/theme/theme.ts';
import {
  wireframesOf,
  wireframesWords as words,
} from '../../app/workspace/wireframesView.ts';

describe('the Wireframes page', () => {
  it('draws every screen of every track, each beside its placeholder', () => {
    const html = renderToString(
      <ThemeProvider theme={theme}>
        <WireframesPage />
      </ThemeProvider>,
    );
    const screens = wireframesOf().flatMap((group) => group.screens);
    expect(screens.length).toBeGreaterThan(0);
    for (const screen of screens)
      expect(html).toContain(`id="w-${screen.num}"`);
    expect(html.split(words.placeholder).length - 1).toBe(screens.length);
  });
});
