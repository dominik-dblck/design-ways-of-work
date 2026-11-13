/**
 * - `BoardPageStatTile` · one number: its value large, the words beside it, its bar
 * - its line on hover; a page of its own opens on a click
 */
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { Stat } from '../../../../workspace/boardView.ts';
import { Label } from '../../../atoms/Label/index.ts';
import { VALUE } from '../constants/boardPageStatTileConstants.ts';
import { BoardPageShareBar } from './BoardPageShareBar.tsx';

interface BoardPageStatTileProps {
  readonly stat: Stat;
}

function BoardPageStatTile({ stat }: BoardPageStatTileProps): ReactElement {
  const { label, value, sub, share, note, href } = stat;
  const tile = (
    <Stack spacing={0.5} sx={{ minWidth: 0 }}>
      <Label tone="secondary" line>
        {label}
      </Label>
      <Stack direction="row" spacing={0.75} sx={{ alignItems: 'baseline' }}>
        <Typography variant="h5" component="span" sx={VALUE}>
          {value}
        </Typography>
        {sub === null ? null : (
          <Typography variant="caption" color="textSecondary" noWrap>
            {sub}
          </Typography>
        )}
      </Stack>
      {share === null ? null : <BoardPageShareBar share={share} />}
    </Stack>
  );
  const shown =
    href === null ? (
      tile
    ) : (
      <Link href={href} underline="none" color="inherit">
        {tile}
      </Link>
    );
  return <Tooltip title={note ?? ''}>{shown}</Tooltip>;
}

export { BoardPageStatTile };
