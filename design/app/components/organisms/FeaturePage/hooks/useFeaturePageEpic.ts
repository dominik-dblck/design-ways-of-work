/**
 * - `useFeaturePageEpic` · the epic open, and the way to open another
 */
import { useEffect, useState } from 'react';
import { pickedEpic } from '../../../../workspace/boardView.ts';
import { firstOpened, isEpic } from '../utils/featurePageOpenedUtils.ts';

// a tab picked stays in the address and in the browser; a pick on the board, open already, follows
function useFeaturePageEpic(): readonly [string, (epic: string) => void] {
  const [epic, setEpic] = useState(firstOpened);
  useEffect(
    () => pickedEpic.onRemembered((next) => isEpic(next) && setEpic(next)),
    [],
  );
  const open = (next: string): void => {
    const url = new URL(window.location.href);
    url.searchParams.set('epic', next);
    window.history.replaceState(null, '', url);
    pickedEpic.remember(next);
    setEpic(next);
  };
  return [epic, open];
}

export { useFeaturePageEpic };
