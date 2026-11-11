import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { hookRepo } from './hookRepo.ts';

const HOOK = 'chunkCheck.ts';
const CHECK = ['yarn -s check:chunk'];
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-chunk-'));

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

const decided = (stdout: string): Readonly<Record<string, unknown>> =>
  Object(JSON.parse(stdout));

describe('a chunk ends on work that was checked', () => {
  const repo = hookRepo({ base, name: 'green' });
  const work = path.join(repo.root, 'work.txt');

  it('nothing uncommitted: nothing runs', () => {
    const said = repo.ran({ hook: HOOK, input: '{}' });
    expect(said.calls).toEqual([]);
    expect(said.stdout).toBe('');
  });

  it('uncommitted work is checked once: the same work again runs nothing', () => {
    fs.writeFileSync(work, 'one');
    expect(repo.ran({ hook: HOOK, input: '{}' }).calls).toEqual(CHECK);
    expect(repo.ran({ hook: HOOK, input: '{}' }).calls).toEqual([]);
  });

  it("a new file's bytes are the work: changed, it is checked again", () => {
    fs.writeFileSync(work, 'two');
    expect(repo.ran({ hook: HOOK, input: '{}' }).calls).toEqual(CHECK);
  });

  it('a tracked file changed is the work too', () => {
    fs.appendFileSync(path.join(repo.root, 'scope.ts'), '// more\n');
    expect(repo.ran({ hook: HOOK, input: '{}' }).calls).toEqual(CHECK);
    expect(repo.ran({ hook: HOOK, input: '{}' }).calls).toEqual([]);
  });
});

describe('a chunk that ends red is held once', () => {
  const repo = hookRepo({ base, name: 'red' });
  const lines = Array.from({ length: 50 }, (_, at) => `line ${String(at + 1)}`);
  const red = { red: ['check:chunk'], out: lines.join('\n') };
  fs.writeFileSync(path.join(repo.root, 'work.txt'), 'one');

  it('the turn is blocked, with the end of what the checks said', () => {
    const said = repo.ran({ hook: HOOK, input: '{}', ...red });
    const { decision, reason } = decided(said.stdout);
    expect(said.status).toBe(0);
    expect(decision).toBe('block');
    expect(reason).toContain(
      'check:chunk is red: fix it before the turn ends.',
    );
    expect(String(reason).split('\n').slice(1)).toEqual(lines.slice(-40));
  });

  it('a stop that says nothing of itself is read as the first', () => {
    const said = repo.ran({ hook: HOOK, ...red });
    expect(decided(said.stdout).decision).toBe('block');
  });

  it('red a second time in a row, it only says so: the turn is not held', () => {
    const said = repo.ran({
      hook: HOOK,
      input: '{"stop_hook_active":true}',
      ...red,
    });
    const { decision, systemMessage } = decided(said.stdout);
    expect(decision).toBe(undefined);
    expect(systemMessage).toContain('check:chunk is still red:');
  });

  it('red work is never remembered green: it is checked again', () => {
    expect(repo.ran({ hook: HOOK, input: '{}' }).calls).toEqual(CHECK);
    expect(repo.ran({ hook: HOOK, input: '{}' }).calls).toEqual([]);
  });
});
