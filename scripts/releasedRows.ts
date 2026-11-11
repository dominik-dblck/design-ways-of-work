/**
 * - `rowsSince` · the rows of each release newer than the one a repository pins
 * - `Released` · a release put out: its version, its rows for one repository
 */

interface Released {
  readonly version: string;
  readonly rows: Readonly<Record<string, string>>;
}

// the releases stand the newest first; a newer release's row for one difference is the one read
function rowsSince(
  released: readonly Released[],
  pinned: string,
): Readonly<Record<string, string>> {
  const at = released.findIndex(({ version }) => version === pinned);
  const newer = at === -1 ? released : released.slice(0, at);
  return Object.fromEntries(
    [...newer]
      .reverse()
      .flatMap(({ version, rows }) =>
        Object.entries(rows).map(
          ([row, why]) => [row, `v${version} · ${why}`] as const,
        ),
      ),
  );
}

export { rowsSince };
export type { Released };
