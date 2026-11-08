/**
 * - `useStanding` · the source's standing, scanned once mounted
 */
import { useEffect, useState } from 'react';
import { scanAll, standingOf } from '../../../../workspace/source-view.ts';
import type { SourceStanding } from '../../../../workspace/source-view.ts';

function useStanding(): SourceStanding | null {
  const [standing, setStanding] = useState<SourceStanding | null>(null);
  useEffect(() => {
    let isLive = true;
    void scanAll().then((found) => {
      if (isLive) setStanding(standingOf(found));
    });
    return () => {
      isLive = false;
    };
  }, []);
  return standing;
}

export { useStanding };
