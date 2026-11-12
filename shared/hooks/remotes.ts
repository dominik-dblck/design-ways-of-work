/**
 * - `sameRepository` · two remotes read as host/owner/repo: ssh, https, a path
 * - `repositoryName` · a remote's last segment: the repository's name
 */

// a remote as host/owner/repo: no scheme, no user, `host:` as `host/`, no `.git` and no `/` at its end
const keyOf = (remote: string): string =>
  remote
    .trim()
    .replace(/^[a-z][a-z0-9+.-]*:\/\//i, '')
    .replace(/^[^@/]+@/, '')
    .replace(/^([^/:]+):/, '$1/')
    .replace(/\/$/, '')
    .replace(/\.git$/, '')
    .replace(/\/$/, '');

// a clone's local path never reads as a host's repository
const sameRepository = (one: string, other: string): boolean =>
  keyOf(one).toLowerCase() === keyOf(other).toLowerCase();

const repositoryName = (remote: string): string =>
  keyOf(remote).split('/').at(-1) ?? '';

export { repositoryName, sameRepository };
