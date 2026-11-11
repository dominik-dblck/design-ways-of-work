import { describe, expect, it } from 'vitest';
import { rowsSince } from '../../scripts/releasedRows.ts';
import type { Released } from '../../scripts/releasedRows.ts';

const RELEASED: readonly Released[] = [
  { version: '0.3.0', rows: { 'output · yarn build': 'a page more' } },
  {
    version: '0.2.0',
    rows: {
      'output · yarn build': 'a page less',
      'output · yarn test': 'a test more',
    },
  },
  { version: '0.1.0', rows: { 'output · yarn lint': 'a rule more' } },
];

describe('the rows a repository meets: each release put out since the one it pins', () => {
  it('a repository on the newest release meets none', () => {
    expect(rowsSince(RELEASED, '0.3.0')).toEqual({});
  });

  it('one a release behind meets that release’s rows, each under its version', () => {
    expect(rowsSince(RELEASED, '0.2.0')).toEqual({
      'output · yarn build': 'v0.3.0 · a page more',
    });
  });

  it('one further behind meets each since, the newer release’s word for a difference two name', () => {
    expect(rowsSince(RELEASED, '0.1.0')).toEqual({
      'output · yarn build': 'v0.3.0 · a page more',
      'output · yarn test': 'v0.2.0 · a test more',
    });
  });

  it('one that pins a tag older than every release written meets them all', () => {
    expect(Object.keys(rowsSince(RELEASED, '0.0.9')).sort()).toEqual([
      'output · yarn build',
      'output · yarn lint',
      'output · yarn test',
    ]);
  });
});
