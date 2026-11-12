import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { HERE } from '../../scripts/repos.ts';

const HOOKS = path.join(HERE, 'shared', 'user-hooks');
const base = fs.realpathSync(
  fs.mkdtempSync(path.join(os.tmpdir(), 'wow-user-hooks-')),
);
// a home of the test's own: the machine's hooks and its mode's flag are never read or written
const home = path.join(base, 'home');
const installed = path.join(home, '.claude', 'hooks');

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

interface Ran {
  readonly status: number | null;
  readonly out: string;
}

// a command and its arguments, run in the test's home
const ran = (
  [command = '', ...args]: readonly string[],
  {
    input = '',
    cwd = base,
  }: { readonly input?: string; readonly cwd?: string } = {},
): Ran => {
  const done = spawnSync(command, args, {
    cwd,
    input,
    encoding: 'utf8',
    env: { PATH: process.env.PATH ?? '', HOME: home },
  });
  return { status: done.status, out: `${done.stdout}${done.stderr}` };
};

const workMode = (args: readonly string[], input = ''): Ran =>
  ran(['python3', '-I', path.join(HOOKS, 'workMode.py'), ...args], { input });

describe('the installer writes a hook absent, keeps one equal, never overwrites one that differs', () => {
  const install = (): Ran =>
    ran([process.execPath, path.join(HOOKS, 'installUserHooks.ts')]);

  it('a machine with none: each written, byte for byte', () => {
    expect(install().out).toContain('workMode.py · written');
    expect(
      fs
        .readFileSync(path.join(installed, 'runBars.py'))
        .equals(fs.readFileSync(path.join(HOOKS, 'runBars.py'))),
    ).toBe(true);
  });

  it('a second run: each as installed', () => {
    const said = install();
    expect(said.out).toContain('workMode.py · as installed');
    expect(said.status).toBe(0);
  });

  it('one changed on the machine: left as it is, and the run fails', () => {
    const changed = path.join(installed, 'workMode.py');
    fs.appendFileSync(changed, '# changed by hand\n');
    const said = install();
    expect(said.out).toContain('workMode.py · DIFFERS, left as installed');
    expect(said.status).toBe(1);
    expect(fs.readFileSync(changed, 'utf8')).toContain('# changed by hand');
  });
});

describe('the work mode: read by all, set by the PM alone', () => {
  it('no flag: cowork', () => {
    expect(workMode([]).out).toContain(
      'WORK MODE: cowork (no flag set: cowork)',
    );
  });

  it('every turn carries the mode and its rules', () => {
    const said = JSON.parse(
      workMode(['hook-turn'], '{"hook_event_name":"SessionStart"}').out,
    ) as {
      hookSpecificOutput: { hookEventName: string; additionalContext: string };
    };
    expect(said.hookSpecificOutput.hookEventName).toBe('SessionStart');
    expect(said.hookSpecificOutput.additionalContext).toContain(
      'WORK MODE: cowork',
    );
  });

  it("an agent's write to the flag, or its command, is refused", () => {
    const write = {
      tool_name: 'Write',
      tool_input: { file_path: '/anywhere/work-mode.json' },
    };
    const command = {
      tool_name: 'Bash',
      tool_input: { command: 'work-mode autonomy' },
    };
    for (const event of [write, command])
      expect(workMode(['hook-guard'], JSON.stringify(event)).out).toContain(
        '"permissionDecision": "deny"',
      );
  });

  it('any other tool call passes untouched', () => {
    const read = {
      tool_name: 'Read',
      tool_input: { file_path: '/a/notes.md' },
    };
    expect(workMode(['hook-guard'], JSON.stringify(read)).out).toBe('');
  });
});

describe("the run's bars, printed from its notes' table", () => {
  const repo = path.join(base, 'repo');
  fs.mkdirSync(path.join(repo, '.claude'), { recursive: true });
  const notes = path.join(repo, 'notes.md');
  fs.writeFileSync(
    notes,
    '| stage | what | done | of |\n| 1 | First | 2 | 2 |\n| 2 | Second | 1 | 4 |\n',
  );
  fs.writeFileSync(
    path.join(repo, '.claude', 'run.json'),
    JSON.stringify({ run: 'Sample · a run', notes }),
  );

  it('the run whole, then the stage in hand and its task', () => {
    const said = ran(
      ['python3', '-I', path.join(HOOKS, 'runBars.py'), 'show'],
      {
        cwd: repo,
      },
    ).out;
    expect(said).toContain('Sample · krok 2 z 2');
    expect(said).toContain('etap 2 Second · zadanie 2 z 4');
  });
});
