/**
 * - `BoardPageVelocityTable` · the pace as numbers
 * - each working day, tickets, criteria
 */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { ReactElement } from 'react';
import { words } from '../../../../workspace/board-view.ts';
import type { VelocityDay } from '../../../../workspace/board-view.ts';

interface BoardPageVelocityTableProps {
  readonly days: readonly VelocityDay[];
}

function BoardPageVelocityTable({ days }: BoardPageVelocityTableProps): ReactElement {
  const { velocity } = words;
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>{velocity.day}</TableCell>
          <TableCell align="right">{velocity.tickets}</TableCell>
          <TableCell align="right">{velocity.criteria}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {days.map((one) => (
          <TableRow key={one.day}>
            <TableCell>{one.day}</TableCell>
            <TableCell align="right">{one.tickets.toFixed(1)}</TableCell>
            <TableCell align="right">{one.criteria.toFixed(1)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { BoardPageVelocityTable };
