/**
 * - `focusedElement` · the focused element, or null where it is not an HTML one
 */
export const focusedElement = (): HTMLElement | null => {
  const at = document.activeElement;
  return at instanceof HTMLElement ? at : null;
};
