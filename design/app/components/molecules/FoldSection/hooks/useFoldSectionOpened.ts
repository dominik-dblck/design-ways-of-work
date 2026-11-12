/**
 * - `useFoldSectionOpened` · whether a fold is open, and the way to open or shut it
 */
import { useEffect, useState } from 'react';

// a jump to #id opens the section; folding it drops the jump, so the next one opens it again
function useFoldSectionOpened(
  id: string,
): readonly [boolean, (isOpen: boolean) => void] {
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    const follow = (): void => {
      if (window.location.hash === `#${id}`) setOpen(true);
    };
    follow();
    window.addEventListener('hashchange', follow);
    return () => window.removeEventListener('hashchange', follow);
  }, [id]);
  const toggle = (isNext: boolean): void => {
    if (!isNext && window.location.hash === `#${id}`) {
      const url = new URL(window.location.href);
      url.hash = '';
      window.history.replaceState(null, '', url);
    }
    setOpen(isNext);
  };
  return [isOpen, toggle];
}

export { useFoldSectionOpened };
