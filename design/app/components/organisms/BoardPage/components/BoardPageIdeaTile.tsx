/**
 * - `BoardPageIdeaTile` · one idea before it is an epic
 * - its title, status, line; opens it
 */
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { IdeaCard } from '../../../../workspace/boardView.ts';
import { radiusOf } from '../../../../theme/tokenReads.ts';

interface BoardPageIdeaTileProps {
  readonly idea: IdeaCard;
  readonly onOpen: (id: string) => void;
}

function BoardPageIdeaTile({
  idea,
  onOpen,
}: BoardPageIdeaTileProps): ReactElement {
  return (
    <Card variant="outlined" sx={{ borderRadius: radiusOf('uiRContainer') }}>
      <CardActionArea onClick={() => onOpen(idea.id)} sx={{ p: 2 }}>
        <Stack spacing={0.75}>
          <Typography variant="overline" color="textSecondary">
            {`${idea.id} · ${idea.status}`}
          </Typography>
          <Typography variant="subtitle1">{idea.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {idea.line}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}

export { BoardPageIdeaTile };
