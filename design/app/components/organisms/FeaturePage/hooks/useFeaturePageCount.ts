/**
 * - `useFeaturePageCount` · a file's combinations, counted when asked
 */
import { useState } from 'react';
import { featureWords as words } from '../../../../workspace/featureView.ts';
import type { FeatureView } from '../../../../workspace/featureView.ts';

// counting walks every row for seconds, so it runs when asked, after the line has drawn
function useFeaturePageCount(
  file: string,
  countOf: FeatureView['countOf'],
): readonly [string | null, () => void] {
  const [line, setLine] = useState<string | null>(null);
  const count = (): void => {
    setLine(words.combinations.counting);
    setTimeout(() => setLine(countOf(file)), 60);
  };
  return [line, count];
}

export { useFeaturePageCount };
