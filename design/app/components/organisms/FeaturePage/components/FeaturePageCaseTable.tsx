/**
 * - `FeaturePageCaseTable` · one endpoint's test cases
 * - id, kind, when, then, its reach
 */
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/feature-view.ts';
import type { CaseGroup } from '../../../../workspace/feature-view.ts';

function FeaturePageCaseTable({ group }: { readonly group: CaseGroup }): ReactElement {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Typography variant="subtitle2" sx={{ px: 2, pt: 1.5 }}>{`${group.endpoint} · ${group.route}`}</Typography>
      <Table size="small">
        <TableBody>
          {group.cases.map((one) => (
            <TableRow key={one.id}>
              <TableCell>
                <Typography variant="code">{one.id}</Typography>
              </TableCell>
              <TableCell>{one.kind}</TableCell>
              <TableCell>{one.when}</TableCell>
              <TableCell>{one.then}</TableCell>
              <TableCell>
                {one.reach}
                {one.compound ? <Chip size="small" color="warning" label={words.cases.compound} sx={{ ml: 1 }} /> : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { FeaturePageCaseTable };
