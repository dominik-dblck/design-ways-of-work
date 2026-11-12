/**
 * - `FeaturePageFieldKindTable` · each field kind
 * - value, editor, what it always does, checks
 */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { FieldKindView } from '../../../../workspace/featureFieldTypes.ts';

function FeaturePageFieldKindTable({
  kinds,
}: {
  readonly kinds: readonly FieldKindView[];
}): ReactElement {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableBody>
          {kinds.map((kind) => (
            <TableRow key={kind.kind}>
              <TableCell>
                <Typography variant="code">{kind.kind}</Typography>
              </TableCell>
              <TableCell>{kind.value}</TableCell>
              <TableCell>{kind.component}</TableCell>
              <TableCell>{kind.always}</TableCell>
              <TableCell>
                {kind.validators.map((line) => (
                  <Typography key={line} variant="body2">
                    {line}
                  </Typography>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { FeaturePageFieldKindTable };
