'use client';

/**
 * - `SideNavLinks` · the rail's routes, one link each, in the order handed
 */
import type {
  SideNavItem,
  SideNavLinkComponent,
} from '../types/sideNavTypes.ts';
import { SideNavLink } from './SideNavLink.tsx';

type SideNavLinksProps = {
  readonly items: readonly SideNavItem[];
  readonly collapsed: boolean;
  readonly linkComponent: SideNavLinkComponent;
  readonly testId?: string | undefined;
};

/** Each route keyed by its own key · the order is the caller's. */
export function SideNavLinks({
  items,
  collapsed,
  linkComponent,
  testId,
}: SideNavLinksProps): React.ReactElement {
  return (
    <>
      {items.map((route) => (
        <SideNavLink
          key={route.key}
          item={route}
          collapsed={collapsed}
          linkComponent={linkComponent}
          testId={testId}
        />
      ))}
    </>
  );
}
