/**
 * - `Pagination` · the pages under a list: MUI picks them, the atoms draw them
 */
import MuiPagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import {
  PAGINATION_INLINE_SX,
  PAGINATION_SX,
} from './constants/paginationConstants.ts';
import { PAGINATION_WORDS } from './constants/paginationWords.ts';
import type { PaginationWords } from './types/paginationTypes.ts';
import { pageItemOf } from './utils/paginationItemUtils.tsx';

export type PaginationProps<Page extends number = number> = {
  readonly page: Page;
  readonly pageCount: Page;
  // the product's own reading of a pick · a pick that is not one of its pages goes nowhere
  readonly pageOf: (next: number | null) => Page | undefined;
  readonly onChange: (page: Page) => void;
  readonly testId?: string;
  readonly pageTestId?: string;
  // inside another line's band, which pads it
  readonly inline?: boolean;
  readonly words?: PaginationWords | undefined;
};

/** A page that is not a page number goes nowhere. */
export function Pagination<Page extends number = number>({
  page,
  pageCount,
  pageOf,
  onChange,
  testId,
  pageTestId,
  inline = false,
  words = PAGINATION_WORDS,
}: PaginationProps<Page>): React.ReactElement {
  const handOn = (next: number | null): void => {
    const at = pageOf(next);
    if (at !== undefined) onChange(at);
  };
  return (
    <Box
      data-testid={testId}
      sx={inline ? PAGINATION_INLINE_SX : PAGINATION_SX}
    >
      <MuiPagination
        page={page}
        count={pageCount}
        onChange={(_event, next) => handOn(next)}
        renderItem={(slot) =>
          pageItemOf(slot, { handOn, testId: pageTestId, words })
        }
      />
    </Box>
  );
}
