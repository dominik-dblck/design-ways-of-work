/**
 * - `app/pages/board/TicketPanel.tsx`: a ticket opened draws its pack, each read resolved
 */
import { ThemeProvider } from '@mui/material/styles';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { TicketPanel } from '../../app/components/organisms/BoardPage/components/TicketPanel.tsx';
import { theme } from '../../app/theme/theme.ts';
import { ticketOf, words } from '../../app/workspace/board-view.ts';
import { all as allTickets } from '../../roadmaps/tickets.ts';

describe('the ticket panel', () => {
  it('draws a command ticket’s command, its refusals and what it reads', () => {
    const id = allTickets().find((one) => one.command !== null)?.id ?? '';
    const ticket = ticketOf(id);
    if (!ticket) throw new Error(`${id} did not open`);
    const html = renderToString(
      <ThemeProvider theme={theme}>
        <TicketPanel ticket={ticket} onBack={() => undefined} />
      </ThemeProvider>,
    );
    expect(html).toContain(words.ticket.command);
    expect(html).toContain(words.ticket.read);
    expect(ticket.reading.length).toBeGreaterThan(0);
  });
});
