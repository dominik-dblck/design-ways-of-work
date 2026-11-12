/**
 * - `FeaturePageCaseTable` · one endpoint's test cases
 * - id, its kind and reach as chips, when, then
 */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { CaseGroup } from '../../../../workspace/featureView.ts';
import { FeaturePageCaseChips } from './FeaturePageCaseChips.tsx';

function FeaturePageCaseTable({
  group,
}: {
  readonly group: CaseGroup;
}): ReactElement {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableBody>
          {group.cases.map((one) => (
            <TableRow key={one.id}>
              <TableCell>
                <Typography variant="code">{one.id}</Typography>
              </TableCell>
              <TableCell>
                <FeaturePageCaseChips one={one} />
              </TableCell>
              <TableCell>{one.when}</TableCell>
              <TableCell>{one.then}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { FeaturePageCaseTable };
