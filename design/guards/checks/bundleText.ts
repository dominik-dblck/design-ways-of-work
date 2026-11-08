/**
 * - `ownText` · a bundle as its own modules; an entry it imports reads as its global
 */
import { ownModulesText } from '../source-check.ts';
import { entryOfModule, importsOfEntry } from '../../tools/layout.ts';

function ownText<T extends string | null>(file: string, text: T): T | string {
  if (text === null || !file.endsWith('.js')) return text;
  return ownModulesText(text, {
    name: file.slice(0, -'.js'.length),
    entryOf: entryOfModule,
    importsOf: importsOfEntry,
  });
}

export { ownText };
