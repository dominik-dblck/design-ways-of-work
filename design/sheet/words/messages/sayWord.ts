/**
 * - `sayWord` · a word of the screen by its key: a label, else a screen line
 * - what a journey's {say:key} reads, so a step names a word and never copies it
 */
import { SCREEN } from './messageRows.ts';
import { LABEL } from './words.ts';

const isGroup = (at: unknown): at is Readonly<Record<string, unknown>> =>
  at !== null && typeof at === 'object';

// a dotted key walks into a screen line's group: group.key
function screenLine(key: string): string | undefined {
  const found = key
    .split('.')
    .reduce<unknown>(
      (at, part) => (isGroup(at) ? at[part] : undefined),
      SCREEN,
    );
  return typeof found === 'string' ? found : undefined;
}

function sayWord(key: string): string | undefined {
  return LABEL[key] ?? screenLine(key);
}

export { sayWord };
