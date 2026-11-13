/**
 * - `Breadcrumbs` · the trail: ancestors link, a switcher opens its menu, page last
 * - the last crumb is the page and links nowhere, so the trail never decorates
 */
import type { ElementType } from 'react';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import type { Crumb } from './types/breadcrumbsTypes.ts';
import { BreadcrumbsCrumb } from './components/BreadcrumbsCrumb.tsx';

export type BreadcrumbsProps = {
  readonly items: readonly Crumb[];
  readonly linkComponent?: ElementType | undefined;
};

/** Each crumb draws by its kind, between slashes · an ancestor links as a plain anchor unless a router's link is handed in. */
export function Breadcrumbs({
  items,
  linkComponent = 'a',
}: BreadcrumbsProps): React.ReactElement {
  return (
    <MuiBreadcrumbs separator="/">
      {items.map((crumb) => (
        <BreadcrumbsCrumb
          key={crumb.label}
          crumb={crumb}
          linkComponent={linkComponent}
        />
      ))}
    </MuiBreadcrumbs>
  );
}
