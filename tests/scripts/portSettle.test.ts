import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { gitAt, ruledOn, unmerged } from '../../scripts/portSettle.ts';
import { scratchRepo } from './scratchRepo.ts';

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-settle-'));

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

const moves = [
  { from: 'sheet/gate-rules.ts', to: 'sheet/gateRules.ts' },
  { from: 'sheet/send-epics.ts', to: 'sheet/sendEpics.ts' },
  { from: 'sheet/the-spec.ts', to: 'sheet/theSpec.ts' },
];
const port = {
  trunk: 'main',
  base: '',
  moves: '',
  carried: [],
  kept: ['legacy/'],
  rewritten: [],
  names: [],
};
const lines = (count: number, word: string): string =>
  Array.from({ length: count }, (_, at) => `${word} ${String(at)}\n`).join('');

describe('a port takes its trunk: each conflict by the port’s rules', () => {
  const product = scratchRepo({ base, name: 'product' });
  const at = (file: string): string => path.join(product.root, file);
  const read = (file: string): string => fs.readFileSync(at(file), 'utf8');
  product.committed('tools/check.ts', 'a check\n');
  product.committed('legacy/data.json', '{ "as": "it was" }\n');
  product.committed('sheet/gate-rules.ts', 'rows\n');
  product.committed(
    'sheet/send-epics.ts',
    `\nreads: 'gate-rules.ts · the send row'\n${lines(6, 'epic')}\n\n`,
  );
  product.committed(
    'sheet/the-spec.ts',
    `import './gate-rules.ts';\n${lines(6, 'part')}`,
  );
  product.committed('sheet/ownRows.ts', `a row\n${lines(3, 'row')}`);
  fs.mkdirSync(at('public'));
  fs.writeFileSync(at('public/mark.png'), Buffer.from([137, 80, 78, 71, 0, 0]));
  product.git(['add', '--', 'public/mark.png']);
  product.git(['commit', '-q', '-m', 'a mark']);
  product.git(['checkout', '-q', '-b', 'port']);
  // the port: a file a home takes, a legacy copy changed, names moved, a module moved and rewritten
  product.git(['rm', '-q', 'tools/check.ts']);
  product.committed('legacy/data.json', '{ "as": "the port left it" }\n');
  product.git(['mv', 'sheet/gate-rules.ts', 'sheet/gateRules.ts']);
  product.git(['mv', 'sheet/send-epics.ts', 'sheet/sendEpics.ts']);
  product.committed(
    'sheet/sendEpics.ts',
    `\nreads: 'gateRules.ts · the send row'\n${lines(6, 'epic')}\n\n`,
  );
  product.committed(
    'sheet/ownRows.ts',
    `a row of the port’s own\n${lines(3, 'row')}`,
  );
  fs.writeFileSync(
    at('public/mark.png'),
    Buffer.from([137, 80, 78, 71, 0, 1, 1]),
  );
  product.git(['add', '--', 'public/mark.png']);
  product.git(['commit', '-q', '-m', 'the port’s mark']);
  product.git(['rm', '-q', 'sheet/the-spec.ts']);
  product.committed(
    'sheet/theSpec.ts',
    `// the parts in key order\nimport './gateRules.ts';\n${lines(6, 'part')}`,
  );
  product.git(['checkout', '-q', 'main']);
  // the trunk meanwhile: each of them changed
  product.committed('tools/check.ts', 'a check, mended\n');
  product.committed('legacy/data.json', '{ "as": "the trunk moved it" }\n');
  product.committed(
    'sheet/send-epics.ts',
    `\nreads: 'gate-rules.ts · RIGHTS'\n${lines(6, 'epic')}\n\n`,
  );
  product.committed(
    'sheet/ownRows.ts',
    `a row of the trunk’s\n${lines(3, 'row')}`,
  );
  fs.writeFileSync(
    at('public/mark.png'),
    Buffer.from([137, 80, 78, 71, 0, 2, 2, 2]),
  );
  product.git(['add', '--', 'public/mark.png']);
  product.git(['commit', '-q', '-m', 'the trunk’s mark']);
  product.committed(
    'sheet/the-spec.ts',
    `import './gate-rules.ts';\n${lines(6, 'part')}part 6\n`,
  );
  product.git(['checkout', '-q', 'port']);
  const git = gitAt(product.root);
  git(['merge', '--no-commit', '--no-ff', 'main'], { mayFail: true });
  const ruled = unmerged(git).map((conflict) =>
    ruledOn({ conflict, git, root: product.root, port, moves }),
  );
  const said = ruled.map(({ says }) => says);

  it('every conflict is settled: none is left unmerged; held for a person, the two where the port’s own is left out', () => {
    expect(unmerged(git)).toEqual([]);
    expect(said.length).toBe(6);
    expect(
      ruled
        .filter(({ isHeld }) => isHeld)
        .map(({ says }) => says.split(' · ')[1])
        .sort(),
    ).toEqual(['public/mark.png', 'sheet/ownRows.ts']);
  });

  it('where the trunk’s side is taken over a change of the port’s own, that change is printed', () => {
    const held = said.find((one) => one.startsWith('READ · sheet/ownRows.ts'));
    expect(held).toContain('+a row of the port’s own');
    expect(read('sheet/ownRows.ts')).toContain('a row of the trunk’s');
  });

  it('a file that is no text takes the trunk’s bytes, never laid as text', () => {
    expect(fs.readFileSync(at('public/mark.png'))).toEqual(
      Buffer.from([137, 80, 78, 71, 0, 2, 2, 2]),
    );
  });

  it('a blob is laid byte for byte: its leading blank line and its last lines stay', () => {
    expect(read('sheet/sendEpics.ts').startsWith('\nreads: ')).toBe(true);
    expect(read('sheet/sendEpics.ts').endsWith('epic 5\n\n\n')).toBe(true);
  });

  it('a file a home holds stays out, and its row for ports/ is named with the trunk’s blob', () => {
    expect(fs.existsSync(at('tools/check.ts'))).toBe(false);
    expect(said).toContainEqual(
      expect.stringMatching(/^CARRY · tools\/check\.ts · blob [0-9a-f]{40} · /),
    );
  });

  it('a folder the port keeps stays as the port left it', () => {
    expect(read('legacy/data.json')).toBe('{ "as": "the port left it" }\n');
  });

  it('a row both changed takes the trunk’s meaning and the port’s name', () => {
    expect(read('sheet/sendEpics.ts')).toContain("'gateRules.ts · RIGHTS'");
  });

  it('the trunk’s change to a module the port moved and rewrote lands on it, the port’s own change kept', () => {
    const spec = read('sheet/theSpec.ts');
    expect(spec).toContain('// the parts in key order');
    expect(spec).toContain("import './gateRules.ts';");
    expect(spec).toContain('part 6');
    expect(fs.existsSync(at('sheet/the-spec.ts'))).toBe(false);
  });
});
