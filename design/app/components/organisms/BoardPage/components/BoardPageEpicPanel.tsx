/**
 * - `BoardPageEpicPanel` · one epic opened
 * - what it is, its acceptance, stories and tickets
 */
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { words } from '../../../../workspace/board-view.ts';
import type { EpicCard } from '../../../../workspace/board-view.ts';
import { BoardPageEpicHead } from './BoardPageEpicHead.tsx';
import { BoardPageTicketRow } from './BoardPageTicketRow.tsx';
import { TitledList } from '../../../atoms/TitledList/index.ts';

interface BoardPageEpicPanelProps {
  readonly epic: EpicCard;
  readonly onTicket: (id: string) => void;
}

function BoardPageEpicPanel({
  epic,
  onTicket,
}: BoardPageEpicPanelProps): ReactElement {
  const stories = epic.stories.map(
    (story) => `${story.id} · ${story.title} — ${story.criterion}`,
  );
  return (
    <Stack spacing={2.5}>
      <BoardPageEpicHead epic={epic} />
      <TitledList label={words.epic.acceptance} lines={[epic.done]} />
      <Stack spacing={0.5}>
        <Typography variant="overline" color="textSecondary" component="h3">
          {words.epic.tickets}
        </Typography>
        <List dense disablePadding>
          {epic.tickets.map((ticket) => (
            <BoardPageTicketRow
              key={ticket.id}
              ticket={ticket}
              onOpen={onTicket}
            />
          ))}
        </List>
      </Stack>
      <TitledList label={words.epic.waits} lines={epic.waiting} />
      <TitledList label={words.epic.stories} lines={stories} />
      {epic.prototype.map((section) => (
        <TitledList key={section.label} {...section} />
      ))}
    </Stack>
  );
}

export { BoardPageEpicPanel };
