'use client';

/**
 * - `SearchListRow` · one row to pick: its icon, its name and line, what trails it
 * - its card, when it has one, beside it on a hover
 */
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import { Hint } from '../../../atoms/Hint/index.ts';
import { ICON_SX, ROW_SX } from '../constants/searchListConstants.ts';
import type {
  SearchListItem,
  SearchListMeta,
} from '../types/searchListTypes.ts';
import { SearchListRowText } from './SearchListRowText.tsx';

type SearchListRowProps<Id extends string> = {
  readonly item: SearchListItem<Id>;
  readonly meta: SearchListMeta;
  readonly picked: boolean;
  readonly icon?: React.ReactNode;
  readonly onPick: (id: Id) => void;
  readonly onHover?: ((id: Id | null) => void) | undefined;
  readonly testId?: string | undefined;
};

/** The picked one is filled · a hover or a focus names it to the parent. */
export function SearchListRow<Id extends string>({
  item,
  meta,
  picked,
  icon,
  onPick,
  onHover,
  testId,
}: SearchListRowProps<Id>): React.ReactElement {
  return (
    <Hint bare placement="right" title={item.card ?? null}>
      <ListItemButton
        role="option"
        aria-selected={picked}
        selected={picked}
        data-testid={testId}
        onClick={() => onPick(item.id)}
        onMouseEnter={() => onHover?.(item.id)}
        onFocus={() => onHover?.(item.id)}
        sx={ROW_SX}
      >
        {icon === undefined ? null : (
          <Box component="span" sx={ICON_SX}>
            {icon}
          </Box>
        )}
        <SearchListRowText item={item} meta={meta} picked={picked} />
        {item.trailing}
      </ListItemButton>
    </Hint>
  );
}
