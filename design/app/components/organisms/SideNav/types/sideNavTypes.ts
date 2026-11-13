/**
 * - `SideNavItem`, `SideNavPerson`, `SideNavBrand` · a route, a person, a mark
 * - `SideNavAppearance`, `SideNavMode` · the three modes, the pick and its call
 * - `SideNavWords`, `SideNavTestIds` · the rail's words, the ids it writes
 */
import type { ElementType, ReactNode } from 'react';
import type { GlyphName } from '../../../atoms/Glyph/index.ts';

export type SideNavItem = {
  readonly key: string;
  readonly label: string;
  readonly icon: GlyphName;
  readonly href: string;
  readonly active: boolean;
};

/** `initials` is what the face draws its letters from when there is no picture. */
export type SideNavPerson = {
  readonly name: string;
  readonly email: string | null;
  readonly image: string | null;
  readonly initials: string;
};

export type SideNavBrandSize = 'sm' | 'md';

/** Narrow, the mark sits over the word, both small; wide, side by side, both medium. */
export type SideNavBrand = {
  readonly mark: (size: SideNavBrandSize) => ReactNode;
  readonly word: (size: SideNavBrandSize) => ReactNode;
};

export type SideNavMode = 'light' | 'dark' | 'system';

export type SideNavAppearance = {
  readonly value: SideNavMode;
  readonly onPick: (next: SideNavMode) => void;
};

/** A plain anchor unless a router's link is handed in. */
export type SideNavLinkComponent = ElementType;

export type SideNavWords = {
  readonly expand: string;
  readonly collapse: string;
  readonly appearance: string;
  readonly modes: Readonly<Record<SideNavMode, string>>;
  readonly signOut: string;
  readonly signingOut: string;
  readonly signOutFailed: string;
};

export type SideNavTestIds = {
  readonly sideNav: string;
  readonly navItem: string;
  readonly collapse: string;
  readonly expand: string;
  readonly trigger: string;
  readonly railName: string;
  readonly railEmail: string;
  readonly menuName: string;
  readonly signOut: string;
};
