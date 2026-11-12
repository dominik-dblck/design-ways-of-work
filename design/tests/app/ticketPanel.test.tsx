/**
 * - `app/pages/board/TicketPanel.tsx`: a ticket opened draws its pack, each read resolved
 */
import { ThemeProvider } from '@mui/material/styles';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { BoardPageTicketPanel } from '../../app/components/organisms/BoardPage/components/BoardPageTicketPanel.tsx';
import { theme } from '../../app/theme/theme.ts';
import { ticketDetailOf, words } from '../../app/workspace/boardView.ts';
import { all as allTickets } from '../../roadmaps/tickets.ts';

describe('the ticket panel', () => {
  it('draws a command ticket’s command, its refusals and what it reads', () => {
    // the first command ticket, where the product holds one
    const first = allTickets()
      .filter((one) => one.command !== null)
      .slice(0, 1);
    for (const { id } of first) {
      const ticket = ticketDetailOf(id);
      if (!ticket) throw new Error(`${id} did not open`);
      const html = renderToString(
        <ThemeProvider theme={theme}>
          <BoardPageTicketPanel ticket={ticket} onBack={() => undefined} />
        </ThemeProvider>,
      );
      expect(html).toContain(words.ticket.command);
      expect(html).toContain(words.ticket.read);
      expect(ticket.reading.length).toBeGreaterThan(0);
    }
  });
});
