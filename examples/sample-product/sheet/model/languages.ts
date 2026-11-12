/**
 * - `name`, `offered`, `LanguageCode` · the languages the product writes in
 */
const NAMES = { EN: 'English' } as const;

type LanguageCode = keyof typeof NAMES;

const name = (code: LanguageCode): string => NAMES[code];

const offered = (): readonly LanguageCode[] => [];

export { name, offered };
export type { LanguageCode };
