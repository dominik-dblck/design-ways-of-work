/**
 * - `BoardPageEpicPanel` · one epic opened
 * - what it is, its acceptance, stories and tickets
 */
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import type { ReactElement } from 'react';
import { words } from '../../../../workspace/boardView.ts';
import type { EpicCard } from '../../../../workspace/boardView.ts';
import { BoardPageEpicHead } from './BoardPageEpicHead.tsx';
import { BoardPageTicketRow } from './BoardPageTicketRow.tsx';
import { TitledList } from '../../../molecules/TitledList/index.ts';
import { Heading } from '../../../atoms/Heading/index.ts';

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
        <Heading level={3} quiet tone="secondary">
          {words.epic.tickets}
        </Heading>
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
    </Stack>
  );
}

export { BoardPageEpicPanel };
