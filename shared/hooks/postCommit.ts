/**
 * - a git post-commit hook: every ref bundled under ~/backups, the branch pushed
 * - only where origin is the scope's remote: a clone elsewhere does nothing
 * - a failure is printed, never thrown: the commit stands either way
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { repositoryName, sameRepository } from './remotes.ts';
import { scope } from '../../scope.ts';

interface Ran {
  readonly isDone: boolean;
  readonly out: string;
}

const git = (args: readonly string[]): Ran => {
  const ran = spawnSync('git', args, { encoding: 'utf8' });
  return { isDone: ran.status === 0, out: ran.stdout.trim() };
};

// the push signed in by gh, as a release's is
const SIGNED_IN = [
  '-c',
  'credential.helper=',
  '-c',
  'credential.helper=!gh auth git-credential',
];

// the bundle made and verified first; the last one kept as the previous
function bundled(name: string, sha: string): string {
  const dir = path.join(os.homedir(), 'backups', name);
  fs.mkdirSync(dir, { recursive: true });
  const fresh = path.join(dir, `tmp-${sha}.bundle`);
  const isMade =
    git(['bundle', 'create', fresh, '--all']).isDone &&
    git(['bundle', 'verify', '-q', fresh]).isDone;
  if (!isMade) return `bundle FAILED · ${sha}`;
  const kept = path.join(dir, `${name}.bundle`);
  if (fs.existsSync(kept))
    fs.renameSync(kept, path.join(dir, `${name}.prev.bundle`));
  fs.renameSync(fresh, kept);
  return `bundle ok · ${sha}`;
}

function pushed(remote: string, sha: string): string {
  const branch = git(['branch', '--show-current']).out;
  if (branch === '') return `no branch to push · ${sha}`;
  if (!git([...SIGNED_IN, 'push', remote, `HEAD:refs/heads/${branch}`]).isDone)
    return `push FAILED · ${branch} · ${sha}`;
  git(['update-ref', `refs/remotes/origin/${branch}`, 'HEAD']);
  return `push ok · ${branch} · ${sha}`;
}

const { backup } = scope;
const origin = git(['remote', 'get-url', 'origin']);
if (
  'remote' in backup &&
  origin.isDone &&
  sameRepository(origin.out, backup.remote)
) {
  const sha = git(['rev-parse', '--short', 'HEAD']).out;
  console.log(bundled(repositoryName(backup.remote), sha));
  console.log(pushed(backup.remote, sha));
} else console.log("no backup: origin is not the scope's remote");
