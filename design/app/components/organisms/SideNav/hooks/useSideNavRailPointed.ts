'use client';

/**
 * - `useSideNavRailPointed` · whether the pointer rests on the narrow rail's mark
 */
import { useEffect, useState } from 'react';

export type SideNavRailPointed = {
  readonly pointed: boolean;
  readonly enter: () => void;
  readonly leave: () => void;
};

/** Widened while the pointer was on the mark, the hover has nothing left to be about. */
export function useSideNavRailPointed(collapsed: boolean): SideNavRailPointed {
  const [isPointed, setIsPointed] = useState(false);
  useEffect(() => {
    if (!collapsed) setIsPointed(false);
  }, [collapsed]);
  return {
    pointed: isPointed,
    enter: () => setIsPointed(true),
    leave: () => setIsPointed(false),
  };
}
