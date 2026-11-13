/**
 * - `useLoginFormEntrance` · false for a frame, then true: the entrance runs once
 */
import { useEffect, useState } from 'react';

/** A hidden page (a background tab, a capture) gets the final state at once; a timer stands beside the frames. */
export function useLoginFormEntrance(): boolean {
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    const show = (): void => setIsShown(true);
    if (document.hidden) {
      const now = setTimeout(show, 0);
      return () => clearTimeout(now);
    }
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(show);
    });
    const timer = setTimeout(show, 60);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);
  return isShown;
}
