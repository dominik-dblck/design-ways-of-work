'use client';

/**
 * - `SearchListFoot` · under the rows: a failed read, or the empty line
 */
import Box from '@mui/material/Box';
import { Text } from '../../../atoms/Text/index.ts';
import {
  SEARCH_EMPTY_SX,
  FAILED_SX,
} from '../constants/searchListConstants.ts';
import type { SearchListProps } from '../types/searchListTypes.ts';

/** A failed read stands where the rows would, so an empty line never claims there is nothing. */
export function SearchListFoot({
  list,
}: {
  readonly list: Pick<SearchListProps, 'failed' | 'items' | 'empty'>;
}): React.ReactElement | null {
  const { failed } = list;
  if (failed !== undefined) return <Box sx={FAILED_SX}>{failed}</Box>;
  if (list.items.length > 0) return null;
  return (
    <Text tone="micro" block sx={SEARCH_EMPTY_SX}>
      {list.empty}
    </Text>
  );
}
