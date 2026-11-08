/**
 * - `BoardPageEpicTile` · one epic: its name, badge, tickets done, what it waits on
 */
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { EpicCard } from '../../../../workspace/board-view.ts';
import { badgeToneOf } from '../utils/boardPageTonesUtils.ts';
import { radiusOf } from '../../../../theme/tokenReads.ts';

interface BoardPageEpicTileProps {
  readonly epic: EpicCard;
  readonly onOpen: (id: string) => void;
}

function BoardPageEpicTile({ epic, onOpen }: BoardPageEpicTileProps): ReactElement {
  const total = epic.tickets.length;
  const part = total ? (100 * epic.doneCount) / total : 0;
  return (
    <Card variant="outlined" sx={{ borderRadius: radiusOf('uiRContainer') }}>
      <CardActionArea onClick={() => onOpen(epic.id)} sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography variant="overline">{epic.id}</Typography>
            <Chip
              size="small"
              variant="outlined"
              color={badgeToneOf(epic.badge.tone)}
              label={epic.badge.label}
            />
          </Stack>
          <Typography variant="subtitle1">{epic.name}</Typography>
          <LinearProgress variant="determinate" value={part} />
          <Typography variant="caption" color="textSecondary">
            {`${epic.doneCount} / ${total}`}
            {epic.column === 'blocked' ? ` · ${epic.waiting.join(', ')}` : ''}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}

export { BoardPageEpicTile };
