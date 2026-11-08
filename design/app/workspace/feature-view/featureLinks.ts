/**
 * - `readOf`, `pagesOf` · a ticket's read list, and the screens and drawings named
 */
import { componentsSpec } from '../../styles/components.spec.ts';
import type * as TICKETS from '../../../roadmaps/tickets.ts';
import type { LinkRow } from './featureTypes.ts';

type Ticket = ReturnType<typeof TICKETS.all>[number];

// a read list names a page as `Name.dc.html` or `Name.dc.html — what it is for`
const A_PAGE = /^\s*([A-Za-z0-9][\w -]*?)\.dc\.html(?:\s+—\s+(.+))?/;
const A_SCREEN = /UI spec|Wireframe/;
const TIERS = ['atoms', 'molecules', 'organisms'] as const;

const readOf = (ticket: Ticket | undefined): readonly string[] =>
  ticket?.read ?? [];

const kebab = (name: string): string =>
  name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

function specLine(name: string): string {
  const id = kebab(name);
  for (const tier of TIERS) {
    const row = componentsSpec[tier].find((one) => one.id === id);
    if (row) return `${tier.replace(/s$/, '')} · ${row.shape}`;
  }
  return 'no spec row';
}

function namedPages(
  read: readonly string[],
): readonly { readonly name: string; readonly note: string }[] {
  const seen = new Map<string, string>();
  for (const entry of read)
    for (const part of entry.split(' · ')) {
      const found = A_PAGE.exec(part);
      if (found?.[1] && !seen.has(found[1])) seen.set(found[1], found[2] ?? '');
    }
  return [...seen].map(([name, note]) => ({ name, note }));
}

function pagesOf(read: readonly string[]): {
  readonly screens: readonly LinkRow[];
  readonly components: readonly LinkRow[];
} {
  const pages = namedPages(read);
  const link = (name: string, note: string): LinkRow => ({
    label: name,
    href: `${name}.dc.html`,
    note,
  });
  return {
    screens: pages
      .filter((one) => A_SCREEN.test(one.name))
      .map((one) => link(one.name, one.note)),
    components: pages
      .filter((one) => !A_SCREEN.test(one.name))
      .map((one) =>
        link(
          one.name,
          [specLine(one.name), one.note].filter(Boolean).join(' · '),
        ),
      ),
  };
}

export { pagesOf, readOf };
