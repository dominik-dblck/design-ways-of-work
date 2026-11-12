/**
 * - `BoardPageTicketPanel` · one ticket opened
 * - its criteria, what to read, edges, flags
 */
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { words } from '../../../../workspace/boardView.ts';
import type { TicketDetail } from '../../../../workspace/boardView.ts';
import { BoardPageTicketEdges } from './BoardPageTicketEdges.tsx';
import { TitledList } from '../../../atoms/TitledList/index.ts';
import { toneOf } from '../../../../theme/tones.ts';

interface BoardPageTicketPanelProps {
  readonly ticket: TicketDetail;
  readonly onBack: () => void;
}

function BoardPageTicketPanel({
  ticket,
  onBack,
}: BoardPageTicketPanelProps): ReactElement {
  const read = (reading: TicketDetail['reading']): readonly string[] =>
    reading.map((one) => `${one.title} — ${one.body}`);
  return (
    <Stack spacing={2.5}>
      <Button onClick={onBack} sx={{ alignSelf: 'flex-start' }}>
        {words.back}
      </Button>
      <Stack spacing={0.75}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography variant="overline">{ticket.id}</Typography>
          <Chip size="small" variant="outlined" label={ticket.kindLabel} />
          <Chip
            size="small"
            color={toneOf(ticket.column)}
            label={ticket.columnLabel}
          />
        </Stack>
        <Typography variant="h6">{ticket.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {ticket.description}
        </Typography>
      </Stack>
      <TitledList label={words.ticket.waits} lines={ticket.waitingOn} />
      <TitledList label={words.ticket.flags} lines={ticket.receiptFlags} />
      <TitledList label={words.ticket.story} lines={[ticket.story]} />
      <TitledList label={words.ticket.criteria} lines={ticket.acceptance} />
      <TitledList label={words.ticket.command} lines={[ticket.command]} />
      <TitledList label={words.ticket.refusals} lines={read(ticket.refusals)} />
      <TitledList label={words.ticket.read} lines={read(ticket.reading)} />
      <TitledList label={words.ticket.why} lines={ticket.why} />
      <BoardPageTicketEdges ticket={ticket} />
      <TitledList label={words.ticket.caveats} lines={ticket.caveats} />
      <TitledList label={words.ticket.siblings} lines={ticket.siblings} />
    </Stack>
  );
}

export { BoardPageTicketPanel };
