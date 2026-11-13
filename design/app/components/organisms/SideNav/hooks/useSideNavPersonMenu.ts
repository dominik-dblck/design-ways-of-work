'use client';

/**
 * - `useSideNavPersonMenu` · the person menu: open, and Sign out with its wait
 * - a refused or failed sign-out says why, and Sign out can be pressed again
 */
import { useId, useState } from 'react';

export type SideNavPersonMenuState = {
  readonly anchor: HTMLElement | null;
  readonly open: (anchor: HTMLElement) => void;
  readonly close: () => void;
  readonly leaving: boolean;
  readonly refused: string | null;
  readonly leave: () => void;
  readonly appearanceId: string;
};

/** A close while signing out is ignored · the menu stays till the page goes. */
export function useSideNavPersonMenu(
  onSignOut: (() => Promise<string | null>) | undefined,
  failed: string,
): SideNavPersonMenuState {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const [refused, setRefused] = useState<string | null>(null);
  const appearanceId = useId();
  return {
    anchor,
    open: setAnchor,
    close: () => {
      if (isLeaving) return;
      setAnchor(null);
      setRefused(null);
    },
    leaving: isLeaving,
    refused,
    leave: () => {
      if (onSignOut === undefined) return;
      setIsLeaving(true);
      setRefused(null);
      void onSignOut()
        .catch(() => failed)
        .then((why) => {
          if (why === null) return;
          setIsLeaving(false);
          setRefused(why);
        });
    },
    appearanceId,
  };
}
