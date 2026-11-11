import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { hookRepo } from './hookRepo.ts';

const HOOK = 'editCheck.ts';
// the folder as the hook's own process names it: a temp folder is a link on some machines
const base = fs.realpathSync(
  fs.mkdtempSync(path.join(os.tmpdir(), 'wow-edit-')),
);
const CONFIG = `export default [
  { files: ['**/*.ts'], rules: { 'no-var': 'error', 'no-debugger': 'error' } },
];
`;

interface Edit {
  readonly file: string;
  readonly text: string;
  // the spelling tool failing, and what it then prints
  readonly red?: readonly string[];
  readonly out?: string;
  readonly err?: string;
}

interface Edited {
  readonly text: string;
  // what goes back to the agent
  readonly context: string;
  readonly calls: readonly string[];
}

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

const repo = hookRepo({ base, name: 'edited' });
fs.writeFileSync(path.join(repo.root, 'eslint.config.mjs'), CONFIG);
fs.writeFileSync(path.join(repo.root, '.prettierignore'), 'raw.ts\n');

const contextOf = (stdout: string): string => {
  if (stdout === '') return '';
  const said: unknown = JSON.parse(stdout);
  const specific: unknown = Reflect.get(Object(said), 'hookSpecificOutput');
  return String(Reflect.get(Object(specific), 'additionalContext'));
};

// a file written, then the hook told of it as Claude Code tells it
const edited = ({ file, text, ...stub }: Edit): Edited => {
  fs.writeFileSync(file, text);
  const said = repo.ran({
    hook: HOOK,
    input: JSON.stringify({ tool_input: { file_path: file } }),
    ...stub,
  });
  return {
    text: fs.readFileSync(file, 'utf8'),
    context: contextOf(said.stdout),
    calls: said.calls,
  };
};

describe('a file written is formatted and fixed where it stands', () => {
  it('the layout is settled, what a rule can fix is fixed, the rest goes back', () => {
    const { text, context } = edited({
      file: path.join(repo.root, 'edited.ts'),
      text: "var held = 'x'\ndebugger\nexport { held }\n",
    });
    expect(text).toBe('let held = "x";\ndebugger;\nexport { held };\n');
    expect(context).toBe(
      "ESLint, after fixes:\nedited.ts:2 Unexpected 'debugger' statement.",
    );
  });

  it('a file with nothing wrong says nothing', () => {
    const file = path.join(repo.root, 'right.ts');
    const { context, calls } = edited({
      file,
      text: 'export const right = 1;\n',
    });
    expect(context).toBe('');
    expect(calls).toEqual([
      `cspell --no-progress --no-summary --no-must-find-files --file ${file}`,
    ]);
  });

  it('a file prettier is told to leave keeps its layout, and is still linted', () => {
    const { text, context } = edited({
      file: path.join(repo.root, 'raw.ts'),
      text: "debugger\nexport const raw = 'x'\n",
    });
    expect(text).toBe("debugger\nexport const raw = 'x'\n");
    expect(context).toContain("raw.ts:1 Unexpected 'debugger' statement.");
  });

  it('prose is formatted and spelled, never linted', () => {
    const { text, context } = edited({
      file: path.join(repo.root, 'notes.md'),
      text: '#   Notes\nA wrod.\n',
      red: ['cspell'],
      out: 'notes.md:2:3 - Unknown word (wrod)',
    });
    expect(text).toBe('# Notes\n\nA wrod.\n');
    expect(context).toBe('cspell:\nnotes.md:2:3 - Unknown word (wrod)');
  });
});

describe('a spelling run that never ran says why', () => {
  const spelled = {
    file: path.join(repo.root, 'spelled.ts'),
    text: 'export const spelled = 1;\n',
  };

  it('a run that failed with no word found gives its error', () => {
    const { context } = edited({
      ...spelled,
      red: ['cspell'],
      err: 'cspell: no such configuration',
    });
    expect(context).toBe(
      'cspell:\ncspell did not run: cspell: no such configuration',
    );
  });

  it('a tool that is not there gives that', () => {
    const bin = path.join(repo.root, 'node_modules', '.bin');
    fs.renameSync(path.join(bin, 'cspell'), path.join(bin, 'cspell-gone'));
    const { context } = edited(spelled);
    fs.renameSync(path.join(bin, 'cspell-gone'), path.join(bin, 'cspell'));
    expect(context).toContain('cspell did not run:');
    expect(context).toContain('ENOENT');
  });
});

describe('only a file of the repository is touched', () => {
  it('a file beside the repository is left as written, and nothing runs', () => {
    const { text, context, calls } = edited({
      file: path.join(base, 'outside.ts'),
      text: "var outside = 'x'\n",
    });
    expect(text).toBe("var outside = 'x'\n");
    expect(context).toBe('');
    expect(calls).toEqual([]);
  });

  it('a tool that wrote no file says nothing', () => {
    const said = repo.ran({ hook: HOOK, input: '{}' });
    expect(said.stdout).toBe('');
    expect(said.calls).toEqual([]);
  });
});
