/**
 * - `mapRows` · a map's rows, each a list of its tab-separated cells
 * - a blank line and a `#` line are no rows
 */
import fs from 'node:fs';

const mapRows = (file: string): readonly (readonly string[])[] =>
  fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .filter((line) => line.trim() !== '' && !line.startsWith('#'))
    .map((line) => line.split('\t'));

export { mapRows };
