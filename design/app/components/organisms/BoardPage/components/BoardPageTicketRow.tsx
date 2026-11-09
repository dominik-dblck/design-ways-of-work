/**
 * - `BoardPageTicketRow` · a ticket in a list
 * - id, title, kind and column; opens on a click
 */
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { TicketLine } from '../../../../workspace/board-view.ts';
import { toneOf } from '../utils/boardPageTonesUtils.ts';
import type { ReactElement } from 'react';
import { radiusOf } from '../../../../theme/tokenReads.ts';

interface BoardPageTicketRowProps {
  readonly ticket: TicketLine;
  readonly onOpen: (id: string) => void;
}

function BoardPageTicketRow({
  ticket,
  onOpen,
}: BoardPageTicketRowProps): ReactElement {
  return (
    <ListItemButton
      onClick={() => onOpen(ticket.id)}
      sx={{
        gap: 1.5,
        alignItems: 'baseline',
        borderRadius: radiusOf('uiRControl'),
      }}
    >
      <Typography variant="overline" sx={{ flex: 'none' }}>
        {ticket.id}
      </Typography>
      <Typography variant="body2" sx={{ flex: 1 }}>
        {ticket.title}
      </Typography>
      <Stack direction="row" spacing={0.5} sx={{ flex: 'none' }}>
        <Chip size="small" variant="outlined" label={ticket.kindLabel} />
        <Chip
          size="small"
          color={toneOf(ticket.column)}
          label={ticket.columnLabel}
        />
      </Stack>
    </ListItemButton>
  );
}

export { BoardPageTicketRow };
