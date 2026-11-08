/**
 * - `EpicPanel` · one epic opened: what it is, its acceptance, stories and tickets
 */
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { words } from '../../../../workspace/board-view.ts';
import type { EpicCard } from '../../../../workspace/board-view.ts';
import { TicketRow } from './TicketRow.tsx';
import { TitledList } from '../../../atoms/TitledList/index.ts';

interface EpicPanelProps {
  readonly epic: EpicCard;
  readonly onTicket: (id: string) => void;
}

function EpicPanel({ epic, onTicket }: EpicPanelProps): ReactElement {
  const stories = epic.stories.map(
    (story) => `${story.id} · ${story.title} — ${story.criterion}`,
  );
  return (
    <Stack spacing={2.5}>
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
      </Stack>
      <TitledList label={words.epic.acceptance} lines={[epic.done]} />
      <Stack spacing={0.5}>
        <Typography variant="overline" color="textSecondary" component="h3">
          {words.epic.tickets}
        </Typography>
        <List dense disablePadding>
          {epic.tickets.map((ticket) => (
            <TicketRow key={ticket.id} ticket={ticket} onOpen={onTicket} />
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

export { EpicPanel };
