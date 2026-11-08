/**
 * - `BoardPageBoardColumns` · the ideas, then every epic in the column it stands in
 */
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import { words } from '../../../../workspace/board-view.ts';
import type { Column, IdeaCard } from '../../../../workspace/board-view.ts';
import { BoardPageBoardColumn } from './BoardPageBoardColumn.tsx';
import { BoardPageEpicTile } from './BoardPageEpicTile.tsx';
import { BoardPageIdeaTile } from './BoardPageIdeaTile.tsx';

interface BoardPageBoardColumnsProps {
  readonly ideas: readonly IdeaCard[];
  readonly columns: readonly Column[];
  readonly onEpic: (id: string) => void;
  readonly onIdea: (id: string) => void;
}

function BoardPageBoardColumns({
  ideas,
  columns,
  onEpic,
  onIdea,
}: BoardPageBoardColumnsProps): ReactElement {
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
      <BoardPageBoardColumn {...words.ideas} count={ideas.length}>
        {ideas.map((idea) => (
          <BoardPageIdeaTile key={idea.id} idea={idea} onOpen={onIdea} />
        ))}
      </BoardPageBoardColumn>
      {columns.map((column) => (
        <BoardPageBoardColumn
          key={column.id}
          label={column.label}
          note={column.note}
          count={column.epics.length}
        >
          {column.epics.map((epic) => (
            <BoardPageEpicTile key={epic.id} epic={epic} onOpen={onEpic} />
          ))}
        </BoardPageBoardColumn>
      ))}
    </Box>
  );
}

export { BoardPageBoardColumns };
