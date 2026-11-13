/**
 * - `BoardPagePortsSection` · each port's questions, folded under its head
 */
import type { ReactElement } from 'react';
import { words } from '../../../../workspace/boardView.ts';
import { FoldSection } from '../../../molecules/FoldSection/index.ts';
import { BoardPagePortGrid } from './BoardPagePortGrid.tsx';

function BoardPagePortsSection(): ReactElement {
  return (
    <FoldSection id="ports" label={words.ports.label} note={words.ports.note}>
      <BoardPagePortGrid />
    </FoldSection>
  );
}

export { BoardPagePortsSection };
