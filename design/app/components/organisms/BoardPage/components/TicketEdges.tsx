/**
 * - `TicketEdges` · a ticket's edges: the question deciding each, then the edge
 */
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { TicketDetail } from '../../../../workspace/board-view.ts';
import { TitledList } from '../../../atoms/TitledList/index.ts';

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
