import { describe, expect, it } from 'vitest';
import { moduleValue, snapshotTaken } from '../../scripts/portSnapshots.ts';

const named = (taken: unknown): unknown =>
  JSON.parse(JSON.stringify(taken).replaceAll('gate-rules', 'gateRules'));

describe('a snapshot as a port takes its trunk, three ways', () => {
  it('a key the trunk left as the base keeps the port’s value; one it moved takes the trunk’s, named as after the port', () => {
    expect(
      snapshotTaken({
        was: { files: ['gate-rules.js'], matrix: 1 },
        trunk: { files: ['gate-rules.js'], matrix: ['gate-rules.js', 2] },
        ours: { files: ['gateRules.js', 'blockModel.ts'], matrix: 1 },
        named,
      }),
    ).toEqual({
      files: ['gateRules.js', 'blockModel.ts'],
      matrix: ['gateRules.js', 2],
    });
  });

  it('a key the trunk adds comes with its names; one it drops is gone', () => {
    expect(
      snapshotTaken({
        was: { old: 1 },
        trunk: { added: 'gate-rules.js' },
        ours: { old: 1 },
        named,
      }),
    ).toEqual({ added: 'gateRules.js' });
  });

  it('a snapshot of one text is taken whole: the port’s while the trunk left it, else the trunk’s', () => {
    const was = 'gate-rules · 96 steps';
    expect(
      snapshotTaken({ was, trunk: was, ours: 'gateRules · 96 steps', named }),
    ).toBe('gateRules · 96 steps');
    expect(
      snapshotTaken({
        was,
        trunk: 'gate-rules · 97 steps',
        ours: 'gateRules · 96 steps',
        named,
      }),
    ).toBe('gateRules · 97 steps');
  });

  it('a module’s value is read back: a text that holds `= ` and `;` as well', () => {
    const module =
      '// GENERATED\nexport const measure: unknown = "a = b; c";\n';
    expect(moduleValue(module)).toBe('a = b; c');
  });
});
