/**
 * - `BoardPageStatTile` · one number: its label in capitals, its value
 * - `BoardPageStatTileProps` · its line on hover; a page of its own opens on a click
 */
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';

interface BoardPageStatTileProps {
  readonly label: string;
  readonly value: string;
  readonly note?: string;
  // a count with a page of its own opens it
  readonly href?: string | null;
}

function BoardPageStatTile({
  label,
  value,
  note,
  href,
}: BoardPageStatTileProps): ReactElement {
  const tile = (
    <Stack direction="row" spacing={0.75} sx={{ alignItems: 'baseline' }}>
      <Typography variant="overline" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="subtitle2">{value}</Typography>
    </Stack>
  );
  const shown = href ? (
    <Link href={href} underline="hover" color="inherit">
      {tile}
    </Link>
  ) : (
    tile
  );
  return note ? <Tooltip title={note}>{shown}</Tooltip> : shown;
}

export { BoardPageStatTile };
export type { BoardPageStatTileProps };
