/**
 * - `remember`, `remembered`, `onRemembered` · the epic last picked, in the browser
 */

// the artifact switches pages without their address, so the pick travels in the browser
const KEY = 'design-feature-epic';

function remember(epic: string): void {
  try {
    window.localStorage.setItem(KEY, epic);
  } catch {
    // a browser that keeps nothing opens the page on its first epic
  }
}

function remembered(): string | null {
  try {
    return typeof window === 'undefined'
      ? null
      : window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

// a page already open hears the board's pick, and the cleanup stops it hearing
function onRemembered(open: (epic: string) => void): () => void {
  const heard = (event: StorageEvent): void => {
    if (event.key === KEY && event.newValue) open(event.newValue);
  };
  window.addEventListener('storage', heard);
  return () => window.removeEventListener('storage', heard);
}

export { onRemembered, remember, remembered };
