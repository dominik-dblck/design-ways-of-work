/**
 * - `BoardColumns` · the ideas, then every epic in the column it stands in
 */
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import { words } from '../../../../workspace/board-view.ts';
import type { Column, IdeaCard } from '../../../../workspace/board-view.ts';
import { BoardColumn } from './BoardColumn.tsx';
import { EpicTile } from './EpicTile.tsx';
import { IdeaTile } from './IdeaTile.tsx';

interface BoardColumnsProps {
  readonly ideas: readonly IdeaCard[];
  readonly columns: readonly Column[];
  readonly onEpic: (id: string) => void;
  readonly onIdea: (id: string) => void;
}

function BoardColumns({
  ideas,
  columns,
  onEpic,
  onIdea,
}: BoardColumnsProps): ReactElement {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2.5,
        alignItems: 'start',
        gridTemplateColumns: {
          xs: '1fr',
          md: `repeat(${columns.length + 1}, minmax(0, 1fr))`,
        },
      }}
    >
      <BoardColumn {...words.ideas} count={ideas.length}>
        {ideas.map((idea) => (
          <IdeaTile key={idea.id} idea={idea} onOpen={onIdea} />
        ))}
      </BoardColumn>
      {columns.map((column) => (
        <BoardColumn
          key={column.id}
          label={column.label}
          note={column.note}
          count={column.epics.length}
        >
          {column.epics.map((epic) => (
            <EpicTile key={epic.id} epic={epic} onOpen={onEpic} />
          ))}
        </BoardColumn>
      ))}
    </Box>
  );
}

export { BoardColumns };
