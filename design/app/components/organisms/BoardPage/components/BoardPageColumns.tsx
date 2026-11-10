/**
 * - `BoardPageColumns` · the ideas, then every epic in the column it stands in
 */
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import { words } from '../../../../workspace/boardView.ts';
import type { Column, IdeaCard } from '../../../../workspace/boardView.ts';
import { BoardPageColumn } from './BoardPageColumn.tsx';
import { BoardPageEpicTile } from './BoardPageEpicTile.tsx';
import { BoardPageIdeaTile } from './BoardPageIdeaTile.tsx';

interface BoardPageColumnsProps {
  readonly ideas: readonly IdeaCard[];
  readonly columns: readonly Column[];
  readonly onEpic: (id: string) => void;
  readonly onIdea: (id: string) => void;
}

function BoardPageColumns({
  ideas,
  columns,
  onEpic,
  onIdea,
}: BoardPageColumnsProps): ReactElement {
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
      <BoardPageColumn {...words.ideas} count={ideas.length}>
        {ideas.map((idea) => (
          <BoardPageIdeaTile key={idea.id} idea={idea} onOpen={onIdea} />
        ))}
      </BoardPageColumn>
      {columns.map((column) => (
        <BoardPageColumn
          key={column.id}
          label={column.label}
          note={column.note}
          count={column.epics.length}
        >
          {column.epics.map((epic) => (
            <BoardPageEpicTile key={epic.id} epic={epic} onOpen={onEpic} />
          ))}
        </BoardPageColumn>
      ))}
    </Box>
  );
}

export { BoardPageColumns };
