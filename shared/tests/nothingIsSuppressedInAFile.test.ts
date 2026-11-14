/**
 * - `eslint-suppressions.json`, where a repository holds one, lets no file past a rule
 * - an exception is a directive in the line it lets through, its reason after it
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';

const SUPPRESSIONS = path.join(scope.root, 'eslint-suppressions.json');

// the files the suppressions file lets past a rule: none where it does not stand
const suppressedFiles = (text: string | null): readonly string[] =>
  text === null
    ? []
    : Object.keys(JSON.parse(text) as Readonly<Record<string, unknown>>);

describe('nothing is suppressed in a file', () => {
  it('reads each file the suppressions file holds, and none where it holds nothing', () => {
    expect(suppressedFiles(null)).toEqual([]);
    expect(suppressedFiles('{}')).toEqual([]);
    expect(suppressedFiles('{"app/a.ts":{"id-length":{"count":1}}}')).toEqual([
      'app/a.ts',
    ]);
  });

  it('eslint-suppressions.json lets no file past a rule', () => {
    const text = fs.existsSync(SUPPRESSIONS)
      ? fs.readFileSync(SUPPRESSIONS, 'utf8')
      : null;
    expect(
      suppressedFiles(text),
      'meet the rule, or let its one line through with a directive and its reason (docs/rules/checks.md)',
    ).toEqual([]);
  });
});
