/**
 * - `ranIn` · a clone's package scripts run in order, each exit and output kept
 * - an output is kept with its root and its timings out: two clones print alike
 */
import { spawn } from 'node:child_process';
import type { Run } from './consumerDiff.ts';

const TIMING = [
  / · \d+ s$/gm,
  /^[ \t]*(?:Start at|Duration) .*$/gm,
  /\b\d+(?:\.\d+)?m?s\b/g,
];

const settled = (root: string, text: string): string =>
  TIMING.reduce(
    (out, pattern) => out.replace(pattern, ''),
    text.replaceAll(root, '<root>'),
  );

// what it printed, then what it printed as errors: the order two streams arrive in is no fact
const ran = (root: string, command: readonly string[]): Promise<Run> =>
  new Promise((resolve) => {
    const child = spawn('yarn', ['-s', ...command], { cwd: root });
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

// one after another: a script reads what the one before it built
const ranIn = ({
  root,
  commands,
}: {
  readonly root: string;
  readonly commands: readonly (readonly string[])[];
}): Promise<readonly Run[]> =>
  commands.reduce<Promise<readonly Run[]>>(
    async (before, command) => [...(await before), await ran(root, command)],
    Promise.resolve([]),
  );

export { ranIn };
