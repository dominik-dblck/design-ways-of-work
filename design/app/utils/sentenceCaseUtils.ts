/**
 * - `sentenceCaseOf` · a word written in capitals, read in sentence case
 */

/** The specification's capitals stay the words · only the reading of them changes. */
export const sentenceCaseOf = (words: string): string =>
  words.charAt(0).toUpperCase() + words.slice(1).toLowerCase();
