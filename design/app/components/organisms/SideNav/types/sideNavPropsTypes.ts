/**
 * - `SideNavProps` · the rail's routes, person, fold, brand, words and ids
 */
import type {
  SideNavAppearance,
  SideNavBrand,
  SideNavItem,
  SideNavLinkComponent,
  SideNavPerson,
  SideNavTestIds,
  SideNavWords,
} from './sideNavTypes.ts';

/** `onSignOut` answers the sentence that says why it did not go through, or null. */
export type SideNavProps = {
  readonly items: readonly SideNavItem[];
  readonly linkComponent?: SideNavLinkComponent | undefined;
  readonly person?: SideNavPerson | null | undefined;
  readonly appearance?: SideNavAppearance | undefined;
  readonly onSignOut?: (() => Promise<string | null>) | undefined;
  readonly collapsed: boolean;
  readonly onToggle: (next: boolean) => void;
  readonly brand?: SideNavBrand | undefined;
  readonly words?: SideNavWords | undefined;
  readonly testIds?: SideNavTestIds | undefined;
};
