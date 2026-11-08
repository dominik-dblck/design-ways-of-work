/**
 * - `quoted` · a string as one single-quoted TypeScript literal on one line
 */
const quoted = (text: string): string =>
  `'${text.replaceAll('\\', '\\\\').replaceAll("'", "\\'").replaceAll('\n', '\\n')}'`;

export { quoted };
