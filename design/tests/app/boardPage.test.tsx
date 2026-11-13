/**
 * - `app/pages/board/BoardPage.tsx`: the page draws every epic and its numbers
 */
import { ThemeProvider } from '@mui/material/styles';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { BoardPage } from '../../app/components/templates/BoardPage/index.ts';
import { pagesTheme } from '../../app/theme/pagesTheme.ts';
import {
  columns,
  stats,
  velocity,
  words,
} from '../../app/workspace/boardView.ts';

describe('the Board page', () => {
  const html = renderToString(
    <ThemeProvider theme={pagesTheme}>
      <BoardPage />
    </ThemeProvider>,
  );

  it('draws its title, every column and every epic', () => {
    expect(html).toContain(words.title);
    for (const column of columns()) {
      expect(html).toContain(column.label);
      for (const epic of column.epics) expect(html).toContain(epic.name);
    }
  });

  it('draws the board’s numbers and its pace', () => {
    for (const stat of stats()) expect(html).toContain(stat.value);
    expect(html).toContain(words.velocity.tickets);
    expect(html).toContain(words.kinds.label);
    expect(html).toContain(velocity().days[0]?.day ?? words.velocity.none);
  });
});
