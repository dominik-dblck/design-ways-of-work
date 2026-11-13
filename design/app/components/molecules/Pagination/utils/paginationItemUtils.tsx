/**
 * - `pageItemOf` · one item MUI's pager hands out, drawn by the atoms
 * - the two ends are icon buttons, a page a button, a gap MUI's own
 */
import PaginationItem from '@mui/material/PaginationItem';
import type { PaginationRenderItemParams } from '@mui/material/Pagination';
import { PaginationEnd } from '../components/PaginationEnd.tsx';
import { PaginationPage } from '../components/PaginationPage.tsx';

/** MUI decides which pages show and where the gaps fall. */
export const pageItemOf = (
  slot: PaginationRenderItemParams,
  at: {
    readonly handOn: (next: number | null) => void;
    readonly testId: string | undefined;
  },
): React.ReactElement => {
  if (slot.type === 'previous' || slot.type === 'next')
    return (
      <PaginationEnd
        end={slot.type}
        disabled={slot.disabled}
        onPress={() => at.handOn(slot.page)}
      />
    );
  if (slot.type === 'page')
    return (
      <PaginationPage
        page={slot.page}
        selected={slot.selected}
        onPress={() => at.handOn(slot.page)}
        testId={at.testId}
      />
    );
  return <PaginationItem {...slot} />;
};
