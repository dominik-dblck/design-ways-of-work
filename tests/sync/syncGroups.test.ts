import { describe, expect, it } from 'vitest';
import { digestOf, formOf } from '../../shared/sync/normalForms.ts';
import { movedGroups } from '../../shared/sync/syncReport.ts';

const AGREED = {
  tokens: { primary: '#1cd0ba', gap: 8 },
  words: { soon: 'Coming soon' },
};

describe('a group in one form, both sides alike', () => {
  it("sorts a shape's keys at every depth: one digest whatever the order", () => {
    const one = formOf('shape', { b: { y: 1, x: 2 }, a: [{ d: 1, c: 2 }] });
    const other = formOf('shape', { a: [{ c: 2, d: 1 }], b: { x: 2, y: 1 } });
    expect(JSON.stringify(one)).toBe('{"a":[{"c":2,"d":1}],"b":{"x":2,"y":1}}');
    expect(digestOf(one)).toBe(digestOf(other));
  });

  it('writes a colour lowercased in six digits and a px length as a number', () => {
    expect(
      formOf('tokens', { a: '#ABC', b: '#1CD0BA', c: '12px', d: '1.5rem' }),
    ).toEqual({
      a: '#aabbcc',
      b: '#1cd0ba',
      c: 12,
      d: '1.5rem',
    });
  });

  it('writes an rgb colour without spaces, each number its shortest', () => {
    expect(
      formOf('tokens', { a: 'rgba(0, 0, 0, 0.80)', b: 'RGB( 28 ,208, 186 )' }),
    ).toEqual({ a: 'rgba(0,0,0,0.8)', b: 'rgb(28,208,186)' });
  });

  it('digests a group one side lacks apart from a group written null', () => {
    expect(digestOf(undefined)).not.toBe(digestOf(null));
  });

  it("writes a word's whitespace one space, its quotes kept", () => {
    expect(formOf('words', { a: '  Coming \n soon ', b: '“Draft”' })).toEqual({
      a: 'Coming soon',
      b: '“Draft”',
    });
  });
});

describe('a group moved since the agreed form', () => {
  it('lists none when the three forms are one', () => {
    expect(
      movedGroups({ agreed: AGREED, release: AGREED, ours: AGREED }),
    ).toEqual([]);
  });

  it('names the side that moved each leaf: the design side, the build side, both', () => {
    const release = { ...AGREED, tokens: { primary: '#000000', gap: 12 } };
    const ours = { ...AGREED, tokens: { primary: '#1cd0ba', gap: 10 } };
    expect(movedGroups({ agreed: AGREED, release, ours })).toEqual([
      {
        group: 'tokens',
        rows: [
          { path: ['gap'], agreed: 8, release: 12, ours: 10, moved: 'both' },
          {
            path: ['primary'],
            agreed: '#1cd0ba',
            release: '#000000',
            ours: '#1cd0ba',
            moved: 'design',
          },
        ],
      },
    ]);
  });

  it('reads a group one side lacks as moved by the other', () => {
    expect(
      movedGroups({
        agreed: AGREED,
        release: AGREED,
        ours: { ...AGREED, payloads: { a: 1 } },
      }),
    ).toEqual([
      {
        group: 'payloads',
        rows: [
          {
            path: ['a'],
            agreed: undefined,
            release: undefined,
            ours: 1,
            moved: 'build',
          },
        ],
      },
    ]);
  });
  it('keeps a key holding a dot one key: `kind.unknown` apart from `kind` › `unknown`', () => {
    const agreed = {
      refusals: { 'kind.unknown': 'a', kind: { unknown: 'b' } },
    };
    const ours = {
      refusals: { 'kind.unknown': 'a', kind: { unknown: 'c' } },
    };
    expect(movedGroups({ agreed, release: agreed, ours })).toEqual([
      {
        group: 'refusals',
        rows: [
          {
            path: ['kind', 'unknown'],
            agreed: 'b',
            release: 'b',
            ours: 'c',
            moved: 'build',
          },
        ],
      },
    ]);
  });

  it('reads an empty object or list as a leaf: a group written empty is a row', () => {
    expect(
      movedGroups({
        agreed: AGREED,
        release: { ...AGREED, payloads: {} },
        ours: { ...AGREED, payloads: [] },
      }),
    ).toEqual([
      {
        group: 'payloads',
        rows: [
          {
            path: [],
            agreed: undefined,
            release: {},
            ours: [],
            moved: 'both',
          },
        ],
      },
    ]);
  });
});
