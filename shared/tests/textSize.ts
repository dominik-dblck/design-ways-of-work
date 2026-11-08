/**
 * - `wordsIn`, `linesIn` · a text's size as the size rules count it
 */

const wordsIn = (text: string): number =>
  text.split(/\s+/).filter(Boolean).length;

// a closing newline ends the last line, never opens another
const linesIn = (text: string): number =>
  text.split('\n').length - (text.endsWith('\n') ? 1 : 0);

export { linesIn, wordsIn };
