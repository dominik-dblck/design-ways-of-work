/**
 * - `BoardPageNextUp` · the tickets ready to start, the top one first
 * - or a line saying none
 */
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { words } from '../../../../workspace/boardView.ts';
import type { TicketLine } from '../../../../workspace/boardView.ts';
import { Heading } from '../../../atoms/Heading/index.ts';
import { BoardPageTicketRow } from './BoardPageTicketRow.tsx';
import { radiusOf } from '../../../../styles/scales.ts';

interface BoardPageNextUpProps {
  readonly tickets: readonly TicketLine[];
  readonly onTicket: (id: string) => void;
}

function BoardPageNextUp({
  tickets,
  onTicket,
}: BoardPageNextUpProps): ReactElement {
  return (
    <Stack spacing={1.5}>
      <Heading level={2} quiet note={words.nextUp.note}>
        {words.nextUp.label}
      </Heading>
      <Paper
        variant="outlined"
        sx={{ borderRadius: radiusOf('uiRContainer'), p: 1 }}
      >
        {tickets.length ? (
          <List dense disablePadding>
            {tickets.map((ticket) => (
              <BoardPageTicketRow
                key={ticket.id}
                ticket={ticket}
                onOpen={onTicket}
              />
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary" sx={{ p: 1 }}>
            {words.nothingReady}
          </Typography>
        )}
      </Paper>
    </Stack>
  );
}

export { BoardPageNextUp };
