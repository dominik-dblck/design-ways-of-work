'use client';

/**
 * - `SearchListRowText` · a row's name over its line, each on one line
 */
import Box from '@mui/material/Box';
import { Text } from '../../../atoms/Text/index.ts';
import { META_SX, ROW_TEXT_SX } from '../constants/searchListConstants.ts';
import type {
  SearchListItem,
  SearchListMeta,
} from '../types/searchListTypes.ts';

type SearchListRowTextProps = {
  readonly item: SearchListItem;
  readonly meta: SearchListMeta;
  readonly picked: boolean;
};

/** The picked one's name is set heavier. */
export function SearchListRowText({
  item,
  meta,
  picked,
}: SearchListRowTextProps): React.ReactElement {
  const look = META_SX[meta];
  return (
    <Box sx={ROW_TEXT_SX}>
      <Text line block strong={picked}>
        {item.name}
      </Text>
      <Text variant={look.variant} tone="micro" line block sx={look.sx}>
        {item.meta}
      </Text>
    </Box>
  );
}
