/**
 * - `TicketEdges` · a ticket's edges: the question each is decided by, then each edge
 */
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { TicketDetail } from '../../workspace/board-view.ts';
import { TitledList } from '../common/TitledList.tsx';

interface TicketEdgesProps {
  readonly ticket: TicketDetail;
}

function TicketEdges({ ticket }: TicketEdgesProps): ReactElement | null {
  if (ticket.edgeSections.length === 0) return null;
  return (
    <>
      <Typography variant="caption" color="textSecondary">
        {ticket.edgeQuestion}
      </Typography>
      {ticket.edgeSections.map((section) => (
        <TitledList key={section.label} {...section} />
      ))}
    </>
  );
}

export { TicketEdges };
