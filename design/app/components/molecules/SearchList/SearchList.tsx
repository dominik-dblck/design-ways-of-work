'use client';

/**
 * - `SearchList` · a search over named rows, one picked, an empty or failed line
 */
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { SearchBox } from '../SearchBox/index.ts';
import { SearchListFoot } from './components/SearchListFoot.tsx';
import { SearchListRow } from './components/SearchListRow.tsx';
import {
  LIST_BOX_SX,
  SEARCH_LIST_SX,
} from './constants/searchListConstants.ts';
import type { SearchListProps } from './types/searchListTypes.ts';

/** The parent filters the rows by the query · leaving the list tells it nothing is hovered. */
export function SearchList<Id extends string>(
  props: SearchListProps<Id>,
): React.ReactElement {
  const { onHover, testId } = props;
  const rows = props.failed === undefined ? props.items : [];
  return (
    <Box data-testid={testId} sx={SEARCH_LIST_SX}>
      <SearchBox
        value={props.query}
        placeholder={props.placeholder}
        pending={props.pending ?? false}
        onQuery={props.onQuery}
        testId={props.searchTestId}
      />
      <Box onMouseLeave={() => onHover?.(null)} sx={LIST_BOX_SX}>
        <List
          component="div"
          role="listbox"
          aria-label={props.placeholder}
          disablePadding
        >
          {rows.map((row) => (
            <SearchListRow
              key={row.id}
              item={row}
              meta={props.meta ?? 'label'}
              picked={row.id === props.value}
              icon={props.icon}
              onPick={props.onPick}
              onHover={onHover}
              testId={props.rowTestId}
            />
          ))}
        </List>
        <SearchListFoot list={props} />
      </Box>
    </Box>
  );
}
