/**
 * - `MAP`, `SCOPE` · the product’s map and the files its guard reads, handed on
 * - `homesOfRow`, `mapRowOf` · a row’s homes, a file’s row
 * - `isCode` · a line that is code, not a comment
 */
import { MAP, SCOPE } from './sourceMap.ts';

function homesOfRow(row: string): readonly string[] {
  return MAP.find((one) => one.row === row)?.home ?? [];
}

function mapRowOf(file: string): string {
  return (
    MAP.find((one) => one.home.includes(file))?.row ?? 'sentences a person sees'
  );
}

function isCode(line: string): boolean {
  return !/^\s*(\/\/|\*|<!--)/.test(line);
}

export { homesOfRow, isCode, MAP, mapRowOf, SCOPE };
