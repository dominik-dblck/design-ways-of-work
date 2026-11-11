/**
 * - `carried` · by ref a push sends, the commits its remote lacks under that ref
 * - `misread` · why the checks would read another tree than the one pushed
 * - none for a tag on a commit the remote's main holds: nothing to check
 */
import { execFileSync, spawnSync } from 'node:child_process';

const NO_COMMIT = /^0+$/;
// a ref new to the remote is measured against its main, never against every ref it holds
const TRUNK = 'refs/heads/main';

interface Push {
  readonly root: string;
  readonly url: string;
  // what git hands a pre-push hook: a line a ref, `local-ref local-sha remote-ref remote-sha`
  readonly lines: string;
  readonly env: NodeJS.ProcessEnv;
}

interface Sent {
  // the commit the ref points at
  readonly tip: string;
  readonly commits: readonly string[];
}

type Checkout = Pick<Push, 'root' | 'env'>;

const told = ({ root, env }: Checkout, args: readonly string[]): string =>
  execFileSync('git', args, { cwd: root, encoding: 'utf8', env }).trim();

// a remote that does not answer holds nothing as far as the push knows: every commit is checked
function trunkOf({ root, url, env }: Push): string {
  const listed = spawnSync('git', ['ls-remote', url, TRUNK], {
    cwd: root,
    encoding: 'utf8',
    env,
  });
  return listed.status === 0 ? (listed.stdout.split('\t')[0] ?? '') : '';
}

// a commit the remote holds and this checkout does not takes nothing away: everything is checked
const isHere = ({ root, env }: Checkout, sha: string): boolean =>
  sha !== '' &&
  spawnSync('git', ['cat-file', '-e', `${sha}^{commit}`], { cwd: root, env })
    .status === 0;

// a ref the remote has is measured against what it holds there, so a commit that reached another ref unchecked is still carried
function carried(push: Push): readonly Sent[] {
  const refs = push.lines
    .split('\n')
    .map((line) => line.split(' '))
    .map(([, sha = '', , held = '']) => ({ sha, held }))
    .filter(({ sha }) => sha !== '' && !NO_COMMIT.test(sha));
  const trunk = refs.some(({ held }) => NO_COMMIT.test(held))
    ? trunkOf(push)
    : '';
  return refs
    .map(({ sha, held }) => {
      const base = NO_COMMIT.test(held) ? trunk : held;
      const past = isHere(push, base) ? ['--not', base] : [];
      return {
        tip: told(push, ['rev-parse', `${sha}^{commit}`]),
        commits: told(push, ['rev-list', sha, ...past])
          .split('\n')
          .filter(Boolean),
      };
    })
    .filter(({ commits }) => commits.length > 0);
}

// the checks read this checkout: they speak for a push only when it stands, clean, on the commit pushed
function misread(
  checkout: Checkout,
  tips: readonly string[],
): string | undefined {
  const head = told(checkout, ['rev-parse', 'HEAD']);
  const other = tips.find((tip) => tip !== head);
  if (other !== undefined)
    return `the checks read this checkout, on ${head.slice(0, 7)}, not the pushed ${other.slice(0, 7)}: check it out, push again`;
  if (told(checkout, ['status', '--porcelain']) !== '')
    return 'the tree holds uncommitted work the push does not carry, and the checks would read it: commit it or put it aside';
  return undefined;
}

export { carried, misread };
