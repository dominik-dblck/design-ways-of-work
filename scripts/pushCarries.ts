/**
 * - `carried` · the commits a push carries that its remote lacks
 * - none for a tag on a commit already pushed: such a push has nothing to check
 */
import { execFileSync, spawnSync } from 'node:child_process';

const NO_COMMIT = /^0+$/;

interface Push {
  readonly root: string;
  readonly url: string;
  // what git hands a pre-push hook: a line a ref, `local-ref local-sha remote-ref remote-sha`
  readonly lines: string;
  readonly env: NodeJS.ProcessEnv;
}

// a remote that does not answer holds nothing as far as the push knows: every commit is checked
function heldByRemote({ root, url, env }: Push): readonly string[] {
  const listed = spawnSync('git', ['ls-remote', url], {
    cwd: root,
    encoding: 'utf8',
    env,
  });
  if (listed.status !== 0) return [];
  const isHere = (sha: string): boolean =>
    spawnSync('git', ['cat-file', '-e', `${sha}^{commit}`], { cwd: root, env })
      .status === 0;
  return listed.stdout
    .split('\n')
    .map((line) => line.split('\t')[0] ?? '')
    .filter((sha) => sha !== '' && isHere(sha));
}

function carried(push: Push): readonly string[] {
  const pushed = push.lines
    .split('\n')
    .map((line) => line.split(' ')[1] ?? '')
    .filter((sha) => sha !== '' && !NO_COMMIT.test(sha));
  if (pushed.length === 0) return [];
  return execFileSync(
    'git',
    ['rev-list', ...pushed, '--not', ...heldByRemote(push)],
    { cwd: push.root, encoding: 'utf8', env: push.env },
  )
    .split('\n')
    .filter(Boolean);
}

export { carried };
