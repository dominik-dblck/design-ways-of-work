/**
 * - `versioned` · the manifest's text, its version moved, or refused
 * - `overHttps` · a remote's address, as HTTPS reaches it
 */

// a text that names no such version is refused: left as it was, a tag would sit on the version before
function versioned(
  manifest: string,
  { from, to }: { readonly from: string; readonly to: string },
): string {
  const moved = manifest.replace(`"version": "${from}"`, `"version": "${to}"`);
  if (moved === manifest)
    throw new Error(`the manifest's text holds no "version": "${from}"`);
  return moved;
}

// git@host:path and ssh://git@host[:port]/path alike; any other address is left as it is
const overHttps = (origin: string): string =>
  origin
    .replace(/^ssh:\/\/(?:[^@/]+@)?([^/:]+)(?::\d+)?\//, 'https://$1/')
    .replace(/^[^@/:]+@([^:/]+):/, 'https://$1/');

export { overHttps, versioned };
