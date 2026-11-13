/**
 * - `FeaturePageFieldTable` · a block's or config's fields
 * - name, kind, required, length, rules
 */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { FieldRowView } from '../../../../workspace/featureView.ts';

interface FeaturePageFieldTableProps {
  readonly title: string;
  readonly fields: readonly FieldRowView[];
}

function FeaturePageFieldTable({
  title,
  fields,
}: FeaturePageFieldTableProps): ReactElement {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Typography variant="subtitle2" sx={{ px: 2, pt: 1.5 }}>
        {title}
      </Typography>
      <Table size="small">
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.name}>
              <TableCell>
                <Typography variant="code">{field.name}</Typography>
              </TableCell>
              <TableCell>{field.kind}</TableCell>
              <TableCell>{field.required}</TableCell>
              <TableCell>{field.length}</TableCell>
              <TableCell>{field.rules.join(' · ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { FeaturePageFieldTable };
