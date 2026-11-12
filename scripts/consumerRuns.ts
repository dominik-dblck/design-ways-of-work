/**
 * - `ranIn` · a clone's package scripts in order: each exit, output, what it left
 * - `settled` · an output with its root and its timings out: two clones print alike
 */
import { spawn } from 'node:child_process';
import type { Run } from './consumerDiff.ts';
import { childEnv } from './scratch.ts';

// a time where a tool prints one, never a number a check states: a tier's line, vitest's head, its tests, its isolate hint
const TIMING: readonly (readonly [RegExp, string])[] = [
  [/ · \d+(?:\.\d+)? s$/gm, ''],
  [/^[ \t]*(?:Start at|Duration) .*$/gm, ''],
  [/^([ \t]*[✓❯×↓].*) \d+(?:\.\d+)?m?s$/gm, '$1'],
  [/^[ \t]*Isolate\s+\d+ workers spawned.*$/gm, ''],
  [/^[ \t]*(?:at least )?~\S+ faster with isolate: false.*$/gm, ''],
  // the hint is printed when a run was slow enough: the blank lines a cut leaves are one
  [/\n(?:[ \t]*\n){2,}/g, '\n\n'],
];

const settled = (root: string, text: string): string =>
  TIMING.reduce(
    (out, [pattern, kept]) => out.replace(pattern, kept),
    text.replaceAll(root, '<root>'),
  );

// what it printed, then what it printed as errors: the order two streams arrive in is no fact
const ran = (root: string, command: readonly string[]): Promise<Run> =>
  new Promise((resolve) => {
    const child = spawn('yarn', ['-s', ...command], {
      cwd: root,
      env: childEnv(),
    });
    const printed: Buffer[] = [];
    const failed: Buffer[] = [];
    child.stdout.on('data', (chunk: Buffer) => printed.push(chunk));
    child.stderr.on('data', (chunk: Buffer) => failed.push(chunk));
    child.on('error', (error) => {
      resolve({
        command: command.join(' '),
        status: null,
        output: error.message,
      });
    });
    child.on('close', (status) => {
      const output = Buffer.concat([...printed, ...failed]).toString('utf8');
      resolve({
        command: command.join(' '),
        status,
        output: settled(root, output),
      });
    });
  });

// one after another: a script reads what the one before it built; `after` reads what each left
const ranIn = ({
  root,
  commands,
  after,
}: {
  readonly root: string;
  readonly commands: readonly (readonly string[])[];
  readonly after?: () => ReadonlySet<string>;
}): Promise<readonly Run[]> =>
  commands.reduce<Promise<readonly Run[]>>(async (before, command) => {
    const done = await before;
    const run = await ran(root, command);
    return [...done, after === undefined ? run : { ...run, standing: after() }];
  }, Promise.resolve([]));

export { ranIn, settled };
