/**
 * - `useFoldListOpened` · the folds open, a way to open only some, one's toggle
 */
import { useState } from 'react';

function useFoldListOpened(): readonly [
  ReadonlySet<string>,
  (ids: readonly string[]) => void,
  (id: string, isOpen: boolean) => void,
] {
  const [opened, setOpened] = useState<ReadonlySet<string>>(() => new Set());
  const toggle = (id: string, isOpen: boolean): void =>
    setOpened((was) => {
      const now = new Set(was);
      if (isOpen) now.add(id);
      else now.delete(id);
      return now;
    });
  return [opened, (ids) => setOpened(new Set(ids)), toggle];
}

export { useFoldListOpened };
