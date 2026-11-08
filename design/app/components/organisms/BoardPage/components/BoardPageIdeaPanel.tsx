/**
 * - `BoardPageIdeaPanel` · one idea opened
 * - its line, its points, the example, what it leaves
 */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { IdeaCard } from '../../../../workspace/board-view.ts';
import { TitledList } from '../../../atoms/TitledList/index.ts';

interface BoardPageIdeaPanelProps {
  readonly idea: IdeaCard;
}

function BoardPageIdeaPanel({ idea }: BoardPageIdeaPanelProps): ReactElement {
  return (
    <Stack spacing={2.5}>
      <Stack spacing={0.75}>
        <Typography variant="overline">
          {`${idea.id} · ${idea.status} · ${idea.raised}`}
        </Typography>
        <Typography variant="h5">{idea.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {idea.line}
        </Typography>
      </Stack>
      {idea.sections.map((section) => (
        <TitledList key={section.label} {...section} />
      ))}
    </Stack>
  );
}

export { BoardPageIdeaPanel };
