/**
 * - `PageHeader` · a page's top row: the trail, what follows, what stands at the end
 * - a menu the trail opens is handed in whole, drawn after the row's parts
 */
import type { ElementType, ReactNode } from 'react';
import Box from '@mui/material/Box';
import { Breadcrumbs } from '../../molecules/Breadcrumbs/index.ts';
import type { Crumb } from '../../molecules/Breadcrumbs/index.ts';
import {
  PAGE_HEADER_END_SX,
  PAGE_HEADER_SX,
} from './constants/pageHeaderConstants.ts';

export type PageHeaderProps = {
  readonly crumbs: readonly Crumb[];
  readonly linkComponent?: ElementType | undefined;
  readonly after?: ReactNode;
  readonly end?: ReactNode;
  readonly menu?: ReactNode;
  readonly testId?: string | undefined;
};

/** No end, no far box · the trail keeps its place either way. */
export function PageHeader({
  crumbs,
  linkComponent,
  after,
  end,
  menu,
  testId,
}: PageHeaderProps): React.ReactElement {
  return (
    <Box data-testid={testId} sx={PAGE_HEADER_SX}>
      <Breadcrumbs items={crumbs} linkComponent={linkComponent} />
      {after}
      {end === undefined ? null : <Box sx={PAGE_HEADER_END_SX}>{end}</Box>}
      {menu}
    </Box>
  );
}
