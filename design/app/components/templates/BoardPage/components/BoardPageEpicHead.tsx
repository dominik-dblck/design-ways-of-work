/**
 * - `BoardPageEpicHead` · an epic's id, name, line and tags, the way to its feature
 */
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import {
  featureHrefOf,
  pickedEpic,
  words,
} from '../../../../workspace/boardView.ts';
import type { EpicCard } from '../../../../workspace/boardView.ts';

function BoardPageEpicHead({
  epic,
}: {
  readonly epic: EpicCard;
}): ReactElement {
  return (
    <Stack spacing={0.75}>
      <Typography variant="overline">{epic.id}</Typography>
      <Typography variant="h5">{epic.name}</Typography>
      <Typography variant="body2" color="textSecondary">
        {epic.sub}
      </Typography>
      <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
        {epic.tags.map((tag) => (
          <Chip key={tag} size="small" variant="outlined" label={tag} />
        ))}
      </Stack>
      <Button
        variant="contained"
        href={featureHrefOf(epic.id)}
        onClick={() => pickedEpic.remember(epic.id)}
        sx={{ alignSelf: 'flex-start' }}
      >
        {words.openFeature}
      </Button>
    </Stack>
  );
}

export { BoardPageEpicHead };
