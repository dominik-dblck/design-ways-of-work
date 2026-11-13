/**
 * - `single` · a handler for one thumb, handed the value MUI reports
 */

export const single =
  (to: ((picked: number) => void) | undefined) =>
  (
    _: Event | React.SyntheticEvent,
    reported: number | readonly number[],
  ): void => {
    if (typeof reported === 'number') to?.(reported);
  };
