/**
 * - `initialsOf` · a person's initials
 */
/** A person's initials · Jo Bramble is JB, a single word its first two letters. */
export const initialsOf = (name: string): string => {
  const words = name
    .trim()
    .split(/\s+/)
    .filter((word) => word !== '');
  const first = words[0] ?? '';
  const last = words.length > 1 ? (words[words.length - 1] ?? '') : '';
  return (
    last === '' ? first.slice(0, 2) : `${first[0]}${last[0]}`
  ).toUpperCase();
};
