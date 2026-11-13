import { execFileSync, spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { HERE } from '../../scripts/repos.ts';

const LOCKER = path.join(HERE, 'shared', 'user-hooks', 'machineLock.py');
const base = fs.realpathSync(
  fs.mkdtempSync(path.join(os.tmpdir(), 'wow-machine-lock-')),
);
// a home of the test's own: the machine's real lock is never read or written
const home = path.join(base, 'home');
const lock = path.join(home, '.claude', 'locks', 'heavy.json');
const marker = path.join(base, 'ran.txt');
// a pid no process holds
const DEAD = 2 ** 22 + 7;

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

beforeEach(() => {
  fs.rmSync(path.join(home, '.claude'), { recursive: true, force: true });
  fs.rmSync(marker, { force: true });
});

const envOf = (extra: Readonly<Record<string, string>>): NodeJS.ProcessEnv => ({
  PATH: process.env.PATH ?? '',
  HOME: home,
  MACHINE_LOCK_WAIT: '0.1',
  ...extra,
});

// the command a run holds the machine for: it copies the lock to the marker, then exits with the code asked
const marking = (code = 0): readonly string[] => [
  'python3',
  '-c',
  `import shutil, sys; shutil.copy(${JSON.stringify(lock)}, ${JSON.stringify(marker)}); sys.exit(${String(code)})`,
];

const locked = (
  args: readonly string[],
  extra: Readonly<Record<string, string>> = {},
): { readonly status: number | null; readonly out: string } => {
  const done = spawnSync('python3', ['-I', LOCKER, ...args], {
    encoding: 'utf8',
    env: envOf(extra),
  });
  return { status: done.status, out: `${done.stdout}${done.stderr}` };
};

const startOf = (pid: number): string =>
  execFileSync('ps', ['-o', 'lstart=', '-p', String(pid)], {
    encoding: 'utf8',
  }).trim();

const held = (
  processes: readonly { pid: number; started: string | null }[],
): void => {
  fs.mkdirSync(path.dirname(lock), { recursive: true });
  fs.writeFileSync(
    lock,
    JSON.stringify({ label: 'another run', since: 'now', processes }),
  );
};

const LIVE = { pid: process.pid, started: startOf(process.pid) };

describe('one heavy run on the machine at a time', () => {
  it('a free machine: free, then the run runs and leaves no lock', () => {
    expect(locked(['status']).out).toContain('machineLock · free');
    const said = locked(['run', 'mine', '--', ...marking()]);
    expect(said.status).toBe(0);
    expect(fs.existsSync(marker)).toBe(true);
    expect(fs.existsSync(lock)).toBe(false);
  });

  it('the lock names the wrapper and, while it runs, its command', () => {
    // the command copies the lock once it is named there: the wrapper writes it just after it starts
    const named = [
      'python3',
      '-c',
      [
        'import json, shutil, time',
        'for _ in range(500):',
        `    if len(json.load(open(${JSON.stringify(lock)}))["processes"]) == 2: break`,
        '    time.sleep(0.01)',
        `shutil.copy(${JSON.stringify(lock)}, ${JSON.stringify(marker)})`,
      ].join('\n'),
    ];
    expect(locked(['run', 'mine', '--', ...named]).status).toBe(0);
    const record = JSON.parse(fs.readFileSync(marker, 'utf8')) as {
      readonly processes: readonly { readonly pid: number }[];
    };
    expect(record.processes).toHaveLength(2);
  });

  it("the command's exit code is the run's, and the lock still leaves", () => {
    expect(locked(['run', 'mine', '--', ...marking(3)]).status).toBe(3);
    expect(fs.existsSync(lock)).toBe(false);
  });

  it('a live holder: the run waits, says for whom, and runs once it leaves', async () => {
    held([LIVE]);
    expect(locked(['status']).out).toContain('another run holds the machine');
    const waiting = spawn(
      'python3',
      ['-I', LOCKER, 'run', 'mine', '--', ...marking()],
      { env: envOf({}) },
    );
    // the run says it waits: from then on, the holder may leave
    const told = new Promise<string>((resolve) => {
      let out = '';
      waiting.stdout.on('data', (chunk: Buffer) => {
        out += chunk.toString();
        if (out.includes('\n')) resolve(out);
      });
    });
    const done = new Promise<number | null>((resolve) => {
      waiting.on('exit', resolve);
    });
    expect(await told).toContain(
      'machineLock · waiting: another run holds the machine',
    );
    expect(fs.existsSync(marker)).toBe(false);
    fs.unlinkSync(lock);
    expect(await done).toBe(0);
    expect(fs.existsSync(marker)).toBe(true);
  });

  it.each([
    ['a dead holder', [{ pid: DEAD, started: 'then' }]],
    [
      'a holder whose pid another process holds now',
      [{ pid: process.pid, started: 'Mon Jan  1 00:00:00 2001' }],
    ],
  ])('%s: its lock is taken over, and the run runs', (_, processes) => {
    held(processes);
    expect(locked(['status']).out).toContain('left a stale lock');
    const said = locked(['run', 'mine', '--', ...marking()]);
    expect(said.out).toContain('another run left a stale lock: taken over');
    expect(fs.existsSync(marker)).toBe(true);
  });

  it('a live holder whose start was not read: held, its pid alone deciding', () => {
    held([{ pid: process.pid, started: null }]);
    expect(locked(['status']).out).toContain('another run holds the machine');
  });

  it('a killed wrapper whose command still runs: the machine stays held', () => {
    held([{ pid: DEAD, started: 'then' }, LIVE]);
    expect(locked(['status']).out).toContain('another run holds the machine');
  });

  it('a run inside a held run passes at once, the outer lock kept', () => {
    held([LIVE]);
    const said = locked(['run', 'inner', '--', ...marking()], {
      MACHINE_LOCK_HELD: 'outer',
    });
    expect(said.status).toBe(0);
    expect(fs.existsSync(marker)).toBe(true);
    expect(fs.existsSync(lock)).toBe(true);
  });

  it('arguments of no shape it knows: its usage, and a refusal', () => {
    expect(locked(['run', 'mine']).status).toBe(2);
  });
});
